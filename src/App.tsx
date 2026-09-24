import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

// Personaliza solo estas líneas antes de compartir tu sorpresa.
const GIFT = {
  recipient: 'mi persona favorita',
  sender: 'Con todo mi cariño',
  greeting: 'Para ti, que haces bonito cualquier día',
  message: [
    'Hay personas que llegan y cambian el color de los días. Tú eres eso para mí: una pequeña certeza luminosa en medio de todo.',
    'Te regalo estas flores amarillas porque me recuerdan a tu forma de estar en el mundo: cálida, valiente y capaz de hacer que hasta lo cotidiano guarde un poco de magia.',
    'Gracias por existir tan cerca de mi corazón. Ojalá cada vez que mires este ramo recuerdes que hay alguien pensando en ti con una sonrisa enorme.',
  ],
  closing: 'Que nunca te falten motivos para florecer.',
};

function Flower({ className = '', delay = 0, size = 112 }: { className?: string; delay?: number; size?: number }) {
  const petals = Array.from({ length: 12 }, (_, index) => {
    const rotation = index * 30;
    return (
      <ellipse
        key={rotation}
        cx="60"
        cy="44"
        rx="14"
        ry="31"
        transform={`rotate(${rotation} 60 60)`}
        fill={index % 3 === 0 ? '#f8c83e' : '#f4b91e'}
      />
    );
  });

  return (
    <svg
      aria-hidden="true"
      className={`flower ${className}`}
      style={{ width: size, height: size, animationDelay: `${delay}s` }}
      viewBox="0 0 120 120"
    >
      <g style={{ transformOrigin: '60px 60px', animation: `petal-bloom .75s ${delay}s cubic-bezier(.22,.8,.28,1) both` }}>
        {petals}
        <circle cx="60" cy="60" r="18" fill="#8b5a24" />
        <circle cx="60" cy="60" r="10" fill="#c7862d" />
        <circle cx="55" cy="55" r="2.4" fill="#f4d46c" />
        <circle cx="66" cy="63" r="2.2" fill="#f4d46c" />
        <circle cx="62" cy="52" r="1.8" fill="#f4d46c" />
      </g>
    </svg>
  );
}

function YellowBow({ className = '' }: { className?: string }) {
  return (
    <svg className={`yellow-bow ${className}`} viewBox="0 0 48 34" aria-hidden="true">
      <path d="M23 15C16 3 4 4 6 14c1 6 9 8 17 3Zm2 0c7-12 19-11 17-1-1 6-9 8-17 3Z" fill="#f6c934" stroke="#dda816" strokeWidth="1.5" />
      <path d="m20 18-7 13 11-6 1-10m4 3 7 13-11-6-1-10" fill="#f2bf27" stroke="#dda816" strokeWidth="1.5" strokeLinejoin="round" />
      <ellipse cx="24" cy="16" rx="4.5" ry="4" fill="#ffe16a" stroke="#d99c12" strokeWidth="1.5" />
    </svg>
  );
}

function FlowerField({ start, count }: { start: number; count: number }) {
  const flowers = Array.from({ length: count }, (_, offset) => {
    const index = start + offset;
    const delay = (index % 12) * 0.07;
    const size = 70 + ((index * 7) % 5) * 7;
    const lean = ((index * 19) % 13) - 6;

    return (
      <div
        className="meadow-flower"
        key={index}
        style={{
          animationDelay: `${delay}s`,
          transform: `rotate(${lean}deg)`,
        }}
      >
        <svg className="meadow-stem" viewBox="0 0 120 190" aria-hidden="true">
          <path
            d="M60 57 C54 92 69 125 58 187"
            fill="none"
            stroke="#66824a"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path d="M58 127 C38 108 26 106 17 107 C27 124 41 132 59 136Z" fill="#819a5d" />
          <path d="M62 151 C78 133 91 131 102 133 C92 149 78 157 61 160Z" fill="#718c51" />
        </svg>
        {index % 4 === 0 && (
          <svg className="meadow-extra-foliage" viewBox="0 0 90 180" aria-hidden="true">
            <path d="M45 178C39 139 47 108 45 48" fill="none" stroke="#6f9250" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M44 151C28 138 18 140 11 143C19 155 29 159 44 156Z" fill="#789a55" />
            <path d="M45 137C61 123 73 124 81 128C74 141 63 147 46 144Z" fill="#88a760" />
            <path d="M44 119C29 106 20 107 13 110C20 122 29 126 44 124Z" fill="#83a05a" />
            <path d="M46 102C60 89 70 90 77 94C70 106 61 111 46 108Z" fill="#718e4d" />
            <path d="M44 83C31 72 23 72 17 75C23 86 32 90 44 88Z" fill="#88a760" />
            <path d="M46 66C57 56 65 57 71 60C65 70 57 74 46 72Z" fill="#789a55" />
          </svg>
        )}
        <Flower className="meadow-blossom" size={size} delay={delay} />
        {index % 5 === 2 && <YellowBow className="meadow-bow" />}
      </div>
    );
  });

  return (
    <div className="flower-field" role="img" aria-label="Campo de flores amarillas y plantas verdes">
      {flowers}
    </div>
  );
}

function Seal({ open }: { open: boolean }) {
  return (
    <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#9e5e35] bg-[#d97b56] text-[10px] font-bold uppercase tracking-[.17em] text-[#fff3d3] shadow-md transition-transform duration-500 ${open ? 'rotate-12 scale-90' : 'animate-stamp-pulse -rotate-6'}`}>
      <span className="h-3 w-3 rounded-full border border-[#fff3d3] bg-[#f4c83f]" aria-hidden="true" />
    </div>
  );
}

function Letter() {
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    letterRef.current?.focus();
  }, []);

  return (
    <article
      className="letter-unfold relative z-10 mx-auto max-w-[670px] rounded-[2px] bg-[#fff8e9] px-6 py-9 text-[#4c3928] shadow-[0_22px_55px_rgba(77,54,27,.18)] sm:px-12 sm:py-12"
      tabIndex={-1}
      ref={letterRef}
      aria-label="Carta"
      data-testid="letter-content"
    >
      <p className="mb-5 font-serif text-xl text-[#9e5e35] sm:text-2xl">{GIFT.greeting},</p>
      <div className="space-y-5 font-serif text-[17px] leading-[1.8] text-[#5a432e] sm:text-[19px]">
        {GIFT.message.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div className="mt-9 border-t border-[#e5c995] pt-6">
        <p className="font-serif text-lg italic text-[#9e5e35]">{GIFT.closing}</p>
        <p className="mt-4 font-serif text-base text-[#9c7147]">{GIFT.sender}</p>
      </div>
    </article>
  );
}

function GiftScene() {
  const [opened, setOpened] = useState(false);

  return (
    <section className="letter-discovery" aria-label="Carta entre las flores">
      {opened ? (
        <Letter />
      ) : (
        <button
          className="envelope-button"
          onClick={() => setOpened(true)}
          aria-label="Abrir la carta"
          data-testid="button-open-letter"
        >
          <span className="envelope" aria-hidden="true">
            <span className="envelope-flap" />
            <span className="envelope-fold" />
            <span className="envelope-seal"><Seal open={false} /></span>
          </span>
        </button>
      )}
    </section>
  );
}

function Home() {
  return (
    <main className="flower-gift min-h-[100dvh] overflow-hidden">
      <section className="flower-garden" aria-label="Flores amarillas">
        <FlowerField start={0} count={36} />
      </section>
      <GiftScene />
      <section className="flower-garden flower-garden--lower" aria-label="Más flores amarillas">
        <FlowerField start={36} count={36} />
      </section>
      <footer className="gift-footer">Hecho para ti</footer>
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