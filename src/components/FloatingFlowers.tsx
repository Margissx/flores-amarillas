import { useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { FlowerSvg, type FlowerKind } from './FloralGarden';
import './FloatingFlowers.css';

type FloatingFlower = {
  id: string;
  kind: FlowerKind;
  x: number;
  y: number;
  size: number;
  rotation: number;
  delay: number;
};

type DragState = {
  id: string;
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startX: number;
  startY: number;
};

const initialFlowers: FloatingFlower[] = [
  { id: 'sunflower', kind: 'sunflower', x: 29, y: 28, size: 74, rotation: -12, delay: 0 },
  { id: 'daisy', kind: 'daisy', x: 71, y: 30, size: 58, rotation: 10, delay: 0.8 },
  { id: 'rose', kind: 'rose', x: 29, y: 72, size: 70, rotation: -18, delay: 1.5 },
  { id: 'chrysanthemum', kind: 'chrysanthemum', x: 71, y: 72, size: 66, rotation: 14, delay: 0.35 },
  { id: 'ranunculus', kind: 'ranunculus', x: 13, y: 47, size: 52, rotation: 8, delay: 1.1 },
  { id: 'wildflower', kind: 'wildflower', x: 87, y: 49, size: 54, rotation: -7, delay: 1.9 },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function clampFlowerPosition(value: number, size: number, viewportSize: number) {
  const margin = Math.min((size / 2 / viewportSize) * 100, 48);
  return clamp(value, margin, 100 - margin);
}

function FloatingFlowers() {
  const [flowers, setFlowers] = useState(initialFlowers);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragRef = useRef<DragState | null>(null);

  function startDrag(event: ReactPointerEvent<HTMLButtonElement>, flower: FloatingFlower) {
    if (event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      id: flower.id,
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: flower.x,
      startY: flower.y,
    };
    setDraggingId(flower.id);
  }

  function moveFlower(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    if (!viewportWidth || !viewportHeight) return;

    const nextX = drag.startX + ((event.clientX - drag.startClientX) / viewportWidth) * 100;
    const nextY = drag.startY + ((event.clientY - drag.startClientY) / viewportHeight) * 100;

    setFlowers((current) =>
      current.map((flower) =>
        flower.id === drag.id
          ? {
              ...flower,
              x: clampFlowerPosition(nextX, flower.size, viewportWidth),
              y: clampFlowerPosition(nextY, flower.size, viewportHeight),
            }
          : flower,
      ),
    );
  }

  function finishDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDraggingId(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function moveWithKeyboard(event: ReactKeyboardEvent<HTMLButtonElement>, flower: FloatingFlower) {
    const movement = event.shiftKey ? 5 : 2;
    const directions: Record<string, [number, number]> = {
      ArrowUp: [0, -movement],
      ArrowDown: [0, movement],
      ArrowLeft: [-movement, 0],
      ArrowRight: [movement, 0],
    };
    const direction = directions[event.key];
    if (!direction) return;

    event.preventDefault();
    setFlowers((current) =>
      current.map((item) =>
        item.id === flower.id
          ? {
              ...item,
              x: clampFlowerPosition(item.x + direction[0], item.size, window.innerWidth),
              y: clampFlowerPosition(item.y + direction[1], item.size, window.innerHeight),
            }
          : item,
      ),
    );
  }

  return (
    <div className="floating-flowers" aria-label="Flores flotantes movibles">
      {flowers.map((flower, index) => {
        const style = {
          left: `${flower.x}%`,
          top: `${flower.y}%`,
          '--floating-flower-size': `${flower.size}px`,
          '--floating-flower-rotation': `${flower.rotation}deg`,
          '--floating-flower-delay': `${flower.delay}s`,
        } as CSSProperties;

        return (
          <button
            key={flower.id}
            className={`floating-flower${draggingId === flower.id ? ' floating-flower--dragging' : ''}`}
            type="button"
            style={style}
            aria-label={`Flor flotante ${index + 1}. Arrástrala o usa las flechas para moverla`}
            title="Arrastra esta flor para moverla"
            data-testid={`floating-flower-${flower.id}`}
            onPointerDown={(event) => startDrag(event, flower)}
            onPointerMove={moveFlower}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            onLostPointerCapture={() => {
              if (dragRef.current?.id === flower.id) {
                dragRef.current = null;
                setDraggingId(null);
              }
            }}
            onKeyDown={(event) => moveWithKeyboard(event, flower)}
          >
            <span className="floating-flower__motion" aria-hidden="true">
              <FlowerSvg kind={flower.kind} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default FloatingFlowers;