import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FileImage, FileText, Image as ImageIcon, MailOpen, Pencil, Share2, X } from 'lucide-react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { ErrorBoundary } from '@/components/error-boundary';
import FloralGarden from '@/components/FloralGarden';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { captureLetterCard, downloadBlob, makeLetterPdf } from '@/lib/letter-export';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type LetterFields = {
  name: string;
  title: string;
  message: string;
  signature: string;
};

const DEFAULT_LETTER: LetterFields = {
  name: 'Mi persona favorita',
  title: 'Para ti, que haces bonito cualquier día',
  message: [
    'Hay personas que hacen más luminosos los días con solo estar. Tú eres una de ellas: cálida, valiente y capaz de convertir lo cotidiano en algo bonito.',
    'Te regalo estas flores amarillas para recordarte cuánto agradezco que formes parte de mi vida. Que nunca te falten razones para sonreír y seguir floreciendo.',
  ].join('\n\n'),
  signature: 'Con todo mi cariño',
};

function getInitialLetter() {
  const params = new URLSearchParams(window.location.search);
  return {
    name: (params.get('name') ?? DEFAULT_LETTER.name).slice(0, 80),
    title: (params.get('title') ?? DEFAULT_LETTER.title).slice(0, 90),
    message: (params.get('message') ?? DEFAULT_LETTER.message).slice(0, 2_000),
    signature: (params.get('signature') ?? DEFAULT_LETTER.signature).slice(0, 80),
  };
}

function fileNameFor(title: string) {
  const base = title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  return base || 'carta-para-ti';
}

function sharedLetterUrl(letter: LetterFields) {
  const url = new URL(window.location.href);
  url.searchParams.set('name', letter.name);
  url.searchParams.set('title', letter.title);
  url.searchParams.set('message', letter.message);
  url.searchParams.set('signature', letter.signature);
  return url.toString();
}

function PersonalizePanel({
  open,
  onClose,
  form,
}: {
  open: boolean;
  onClose: () => void;
  form: UseFormReturn<LetterFields>;
}) {
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousFocus = document.activeElement as HTMLElement | null;
    const firstField = panelRef.current?.querySelector<HTMLElement>('input:not(:disabled), textarea:not(:disabled)');
    firstField?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'input:not(:disabled), textarea:not(:disabled), button:not(:disabled)',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="customizer-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      data-testid="letter-customizer-backdrop"
    >
      <aside
        id="letter-customizer"
        className="customizer-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="customizer-title"
        data-testid="letter-customizer"
      >
        <header className="customizer-header">
          <div>
            <p className="customizer-kicker">UN DETALLE TUYO</p>
            <h2 id="customizer-title">Personalizar carta</h2>
          </div>
          <button className="customizer-close" type="button" onClick={onClose} aria-label="Cerrar personalización" data-testid="button-close-customizer">
            <X aria-hidden="true" />
          </button>
        </header>
        <p className="customizer-description">Los cambios aparecen al instante en la carta.</p>

        <Form {...form}>
          <form className="customizer-fields" onSubmit={(event) => event.preventDefault()}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="customizer-field">
                  <FormLabel className="customizer-label">Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} className="customizer-input" maxLength={80} placeholder="A quién va dirigida" data-testid="input-letter-name" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="customizer-field">
                  <FormLabel className="customizer-label">Título</FormLabel>
                  <FormControl>
                    <Input {...field} className="customizer-input" maxLength={90} placeholder="Un título para tu carta" data-testid="input-letter-title" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="customizer-field">
                  <FormLabel className="customizer-label">Mensaje</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="customizer-input customizer-textarea" rows={9} maxLength={2_000} placeholder="Escribe tu mensaje" data-testid="input-letter-message" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="signature"
              render={({ field }) => (
                <FormItem className="customizer-field">
                  <FormLabel className="customizer-label">Firma</FormLabel>
                  <FormControl>
                    <Input {...field} className="customizer-input" maxLength={80} placeholder="Con cariño…" data-testid="input-letter-signature" />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <button className="customizer-done" type="button" onClick={onClose} data-testid="button-finish-customizing">
          Listo
        </button>
      </aside>
    </div>
  );
}

function Home() {
  const form = useForm<LetterFields>({ defaultValues: getInitialLetter() });
  const watchedLetter = form.watch();
  const letter = { ...DEFAULT_LETTER, ...watchedLetter };
  const letterRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(true);
  const [customizing, setCustomizing] = useState(false);
  const [busy, setBusy] = useState<'png' | 'jpg' | 'pdf' | 'share' | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const baseName = fileNameFor(letter.title);
  const closeCustomizer = useCallback(() => setCustomizing(false), []);

  async function downloadImage(format: 'png' | 'jpg') {
    if (!letterRef.current || !opened) return;
    setBusy(format);
    setAnnouncement('');
    try {
      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
      const capture = await captureLetterCard(letterRef.current, mimeType);
      downloadBlob(capture.blob, `${baseName}.${format}`);
      setAnnouncement(`La carta se descargó como ${format.toUpperCase()}.`);
    } catch (error) {
      setAnnouncement(error instanceof Error ? error.message : 'No se pudo descargar la carta.');
    } finally {
      setBusy(null);
    }
  }

  async function downloadPdf() {
    if (!letterRef.current || !opened) return;
    setBusy('pdf');
    setAnnouncement('');
    try {
      const capture = await captureLetterCard(letterRef.current, 'image/jpeg');
      const pdf = await makeLetterPdf(
        capture.blob,
        capture.cssWidth,
        capture.cssHeight,
        capture.pixelWidth,
        capture.pixelHeight,
      );
      downloadBlob(pdf, `${baseName}.pdf`);
      setAnnouncement('La carta se descargó como PDF.');
    } catch (error) {
      setAnnouncement(error instanceof Error ? error.message : 'No se pudo crear el PDF.');
    } finally {
      setBusy(null);
    }
  }

  async function shareLetter() {
    if (!letterRef.current || !opened) return;
    setBusy('share');
    setAnnouncement('');
    const url = sharedLetterUrl(letter);
    try {
      const capture = await captureLetterCard(letterRef.current, 'image/png');
      const file = new File([capture.blob], `${baseName}.png`, { type: 'image/png' });

      if (navigator.share) {
        try {
          const canShareFile = navigator.canShare?.({ files: [file] }) ?? false;
          await navigator.share({
            title: letter.title || 'Una carta para ti',
            text: letter.signature ? `Con cariño, ${letter.signature}` : 'Una carta para ti',
            url,
            ...(canShareFile ? { files: [file] } : {}),
          });
          setAnnouncement('La carta está lista para compartir.');
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') return;
        }
      }

      downloadBlob(capture.blob, `${baseName}.png`);
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(url);
          setAnnouncement('La imagen se descargó y el enlace personalizado se copió.');
        } catch {
          setAnnouncement(`La imagen se descargó. Enlace para compartir: ${url}`);
        }
      } else {
        setAnnouncement(`La imagen se descargó. Enlace para compartir: ${url}`);
      }
    } catch (error) {
      setAnnouncement(error instanceof Error ? error.message : 'No se pudo preparar la carta para compartir.');
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="romantic-experience" data-open={opened ? 'true' : 'false'}>
      <FloralGarden open={opened} />
      <section className="letter-stage" aria-label="Carta romántica rodeada de flores">
        <div className="letter-composition">
          <div
            className={`letter-paper${opened ? ' letter-paper--open' : ' letter-paper--closed'}`}
            ref={letterRef}
            aria-label={opened ? 'Carta personalizada' : 'Carta cerrada'}
            data-testid="letter-card"
          >
            {opened ? (
              <article className="letter-copy">
                {letter.name.trim() && (
                  <p className="letter-recipient" data-testid="text-letter-name">
                    Para {letter.name.trim()}
                  </p>
                )}
                {letter.title.trim() && (
                  <h1 className="letter-title" data-testid="text-letter-title">
                    {letter.title.trim()}
                  </h1>
                )}
                {letter.message.trim() && (
                  <p className="letter-message" data-testid="text-letter-message">
                    {letter.message.trim()}
                  </p>
                )}
                {letter.signature.trim() && (
                  <p className="letter-signature" data-testid="text-letter-signature">
                    {letter.signature.trim()}
                  </p>
                )}
              </article>
            ) : (
              <div className="letter-cover">
                <svg className="cover-flower" viewBox="0 0 100 100" aria-hidden="true">
                  <g fill="#e9b83b">
                    <ellipse cx="50" cy="25" rx="8" ry="19" />
                    <ellipse cx="50" cy="25" rx="8" ry="19" transform="rotate(45 50 50)" fill="#f4cd57" />
                    <ellipse cx="50" cy="25" rx="8" ry="19" transform="rotate(90 50 50)" />
                    <ellipse cx="50" cy="25" rx="8" ry="19" transform="rotate(135 50 50)" fill="#f4cd57" />
                    <ellipse cx="50" cy="25" rx="8" ry="19" transform="rotate(180 50 50)" />
                    <ellipse cx="50" cy="25" rx="8" ry="19" transform="rotate(225 50 50)" fill="#f4cd57" />
                    <ellipse cx="50" cy="25" rx="8" ry="19" transform="rotate(270 50 50)" />
                    <ellipse cx="50" cy="25" rx="8" ry="19" transform="rotate(315 50 50)" fill="#f4cd57" />
                  </g>
                  <circle cx="50" cy="50" r="10" fill="#af782d" />
                  <path d="M50 60v24m0-12c-8-8-15-8-21-7 4 8 11 12 21 13m0-10c8-8 14-8 21-7-4 8-11 12-21 13" fill="none" stroke="#6b8b50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <button className="letter-cover-open" type="button" onClick={() => setOpened(true)} data-testid="button-open-letter">
                  Abrir carta
                </button>
              </div>
            )}
          </div>

          <nav className="letter-actions" aria-label="Acciones de la carta">
            <button className="letter-action letter-action--customize" type="button" onClick={() => setCustomizing(true)} aria-expanded={customizing} aria-controls="letter-customizer" data-testid="button-customize-letter">
              <Pencil aria-hidden="true" />
              <span>Personalizar</span>
            </button>
            <span className="letter-actions-divider" aria-hidden="true" />
            <button className="letter-action" type="button" onClick={() => void downloadImage('png')} disabled={!opened || busy !== null} data-testid="button-download-png">
              <FileImage aria-hidden="true" />
              <span>{busy === 'png' ? 'Preparando…' : 'PNG'}</span>
            </button>
            <button className="letter-action" type="button" onClick={() => void downloadImage('jpg')} disabled={!opened || busy !== null} data-testid="button-download-jpg">
              <ImageIcon aria-hidden="true" />
              <span>{busy === 'jpg' ? 'Preparando…' : 'JPG'}</span>
            </button>
            <button className="letter-action" type="button" onClick={() => void downloadPdf()} disabled={!opened || busy !== null} data-testid="button-download-pdf">
              <FileText aria-hidden="true" />
              <span>{busy === 'pdf' ? 'Preparando…' : 'PDF'}</span>
            </button>
            <button className="letter-action letter-action--share" type="button" onClick={() => void shareLetter()} disabled={!opened || busy !== null} data-testid="button-share-letter">
              <Share2 aria-hidden="true" />
              <span>{busy === 'share' ? 'Preparando…' : 'Compartir'}</span>
            </button>
            <span className="letter-actions-divider letter-actions-divider--end" aria-hidden="true" />
            <button className="letter-action letter-action--toggle" type="button" onClick={() => setOpened((current) => !current)} aria-label={opened ? 'Cerrar carta' : 'Abrir carta'} data-testid="button-toggle-letter">
              <MailOpen aria-hidden="true" />
              <span>{opened ? 'Cerrar' : 'Abrir'}</span>
            </button>
          </nav>
          <p className="letter-notice" aria-live="polite" role="status" data-testid="status-letter-action">
            {announcement}
          </p>
        </div>
      </section>

      <footer className="gift-footer">Hecho para ti</footer>
      <PersonalizePanel open={customizing} onClose={closeCustomizer} form={form} />
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;