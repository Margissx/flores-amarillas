type CapturedCard = {
  blob: Blob;
  cssWidth: number;
  cssHeight: number;
  pixelWidth: number;
  pixelHeight: number;
};

function copyComputedStyles(
  source: Node,
  target: Node,
  root: HTMLElement,
  cssWidth: number,
  cssHeight: number,
) {
  if (source.nodeType === Node.ELEMENT_NODE && target.nodeType === Node.ELEMENT_NODE) {
    const sourceElement = source as Element;
    const targetElement = target as HTMLElement;
    const computed = window.getComputedStyle(sourceElement);

    for (let index = 0; index < computed.length; index += 1) {
      const property = computed.item(index);
      targetElement.style.setProperty(
        property,
        computed.getPropertyValue(property),
        computed.getPropertyPriority(property),
      );
    }

    targetElement.style.setProperty('animation', 'none', 'important');
    targetElement.style.setProperty('transition', 'none', 'important');
    if (targetElement === root) {
      targetElement.style.setProperty('width', `${cssWidth}px`, 'important');
      targetElement.style.setProperty('height', `${cssHeight}px`, 'important');
      targetElement.style.setProperty('margin', '0', 'important');
      targetElement.style.setProperty('transform', 'none', 'important');
      targetElement.style.setProperty('translate', 'none', 'important');
      targetElement.style.setProperty('opacity', '1', 'important');
    }
  }

  const sourceChildren = Array.from(source.childNodes);
  const targetChildren = Array.from(target.childNodes);
  sourceChildren.forEach((child, index) => {
    const targetChild = targetChildren[index];
    if (targetChild) copyComputedStyles(child, targetChild, root, cssWidth, cssHeight);
  });
}

function canvasBlob(canvas: HTMLCanvasElement, mimeType: string, quality?: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error('No se pudo crear la imagen.')),
      mimeType,
      quality,
    );
  });
}

export async function captureLetterCard(
  element: HTMLElement,
  mimeType: 'image/png' | 'image/jpeg',
): Promise<CapturedCard> {
  await document.fonts.ready;

  const rect = element.getBoundingClientRect();
  const cssWidth = Math.ceil(rect.width);
  const cssHeight = Math.ceil(rect.height);
  const scale = 2;
  const pixelWidth = cssWidth * scale;
  const pixelHeight = cssHeight * scale;
  const clone = element.cloneNode(true) as HTMLElement;

  copyComputedStyles(element, clone, clone, cssWidth, cssHeight);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');

  const markup = new XMLSerializer().serializeToString(clone);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${cssWidth}" height="${cssHeight}" viewBox="0 0 ${cssWidth} ${cssHeight}">
      <foreignObject x="0" y="0" width="100%" height="100%">${markup}</foreignObject>
    </svg>`;
  const image = new Image();
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('El navegador no pudo preparar la carta para exportar.'));
  });

  const canvas = document.createElement('canvas');
  canvas.width = pixelWidth;
  canvas.height = pixelHeight;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('El navegador no permite crear una imagen de la carta.');
  context.scale(scale, scale);
  context.drawImage(image, 0, 0, cssWidth, cssHeight);

  const blob = await canvasBlob(canvas, mimeType, mimeType === 'image/jpeg' ? 0.96 : undefined);
  return { blob, cssWidth, cssHeight, pixelWidth, pixelHeight };
}

export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

export async function makeLetterPdf(
  jpeg: Blob,
  cssWidth: number,
  cssHeight: number,
  pixelWidth: number,
  pixelHeight: number,
) {
  const imageBytes = new Uint8Array(await jpeg.arrayBuffer());
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets = [0];
  let byteLength = 0;
  const append = (chunk: Uint8Array) => {
    chunks.push(chunk);
    byteLength += chunk.byteLength;
  };
  const appendText = (text: string) => append(encoder.encode(text));
  const pageWidth = (cssWidth * 72) / 96;
  const pageHeight = (cssHeight * 72) / 96;

  appendText('%PDF-1.4\n');
  offsets[1] = byteLength;
  appendText('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  offsets[2] = byteLength;
  appendText('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  offsets[3] = byteLength;
  appendText(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] ` +
    `/Resources << /XObject << /Letter 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`,
  );
  offsets[4] = byteLength;
  appendText(
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${pixelWidth} /Height ${pixelHeight} ` +
    `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.byteLength} >>\nstream\n`,
  );
  append(imageBytes);
  appendText('\nendstream\nendobj\n');
  offsets[5] = byteLength;
  const pageContent = `q\n${pageWidth} 0 0 ${pageHeight} 0 0 cm\n/Letter Do\nQ`;
  appendText(`5 0 obj\n<< /Length ${encoder.encode(pageContent).byteLength} >>\nstream\n${pageContent}\nendstream\nendobj\n`);

  const xrefOffset = byteLength;
  appendText(`xref\n0 ${offsets.length}\n0000000000 65535 f \n`);
  offsets.slice(1).forEach((offset) => {
    appendText(`${String(offset).padStart(10, '0')} 00000 n \n`);
  });
  appendText(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

  const pdfParts: BlobPart[] = chunks.map((chunk) => chunk.slice().buffer as ArrayBuffer);
  return new Blob(pdfParts, { type: 'application/pdf' });
}