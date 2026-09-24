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
  const petals = Array.from({ length: 8 }, (_, index) => {
    const rotation = index * 45;
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

function Bouquet() {
  return (
    <div className="bouquet-shadow animate-float-gently relative mx-auto h-[420px] w-full max-w-[520px]" aria-label="Ilustración animada de un ramo de flores amarillas" role="img">
      <div className="absolute bottom-3 left-1/2 h-8 w-64 -translate-x-1/2 rounded-[50%] bg-[#6b4b2a]/15 blur-md" />
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 520 440" aria-hidden="true">
        <path d="M250 365 C237 278 203 201 181 116" fill="none" stroke="#698450" strokeWidth="7" strokeLinecap="round" />
        <path d="M255 364 C275 266 323 198 343 104" fill="none" stroke="#698450" strokeWidth="7" strokeLinecap="round" />
        <path d="M257 364 C256 255 252 182 255 79" fill="none" stroke="#78945e" strokeWidth="7" strokeLinecap="round" />
        <path d="M242 319 C202 273 163 250 136 232" fill="none" stroke="#76915b" strokeWidth="6" strokeLinecap="round" />
        <path d="M272 331 C316 289 365 267 391 241" fill="none" stroke="#76915b" strokeWidth="6" strokeLinecap="round" />
        <path d="M213 229 C188 209 172 180 167 157 C194 165 215 187 213 229Z" fill="#86a363" />
        <path d="M313 249 C338 210 360 193 383 185 C371 218 347 241 313 249Z" fill="#78975b" />
        <path d="M237 280 C206 265 186 242 174 217 C205 223 226 240 237 280Z" fill="#92aa68" />
        <path d="M283 282 C308 254 332 239 360 235 C342 263 318 279 283 282Z" fill="#88a261" />
        <path d="M256 206 C234 180 227 149 232 125 C254 149 263 174 256 206Z" fill="#8da86a" />
        <path d="M242 362 L215 398 L300 398 L276 362Z" fill="#d99852" />
        <path d="M240 361 L207 393 L299 393 L275 361Z" fill="#edb568" opacity=".74" />
        <path d="M216 397 Q256 418 300 397" fill="none" stroke="#b9753d" strokeWidth="5" />
      </svg>
      <div className="animate-sway absolute left-[20%] top-[11%]"><Flower size={122} delay={0.18} /></div>
      <div className="animate-sway absolute left-[39%] top-[-1%]" style={{ animationDelay: '.6s' }}><Flower size={142} delay={0.35} /></div>
      <div className="animate-sway absolute right-[17%] top-[9%]" style={{ animationDelay: '1s' }}><Flower size={124} delay={0.52} /></div>
      <div className="animate-sway absolute left-[2%] top-[30%]" style={{ animationDelay: '.8s' }}><Flower size={96} delay={0.7} /></div>
      <div className="animate-sway absolute right-[1%] top-[31%]" style={{ animationDelay: '.45s' }}><Flower size={96} delay={0.9} /></div>
      <span className="animate-sparkle absolute left-[27%] top-[8%] h-3 w-3 rounded-full bg-[#f1a92e]" />
      <span className="animate-sparkle absolute right-[17%] top-[24%] h-2 w-2 rounded-full bg-[#e9865c]" style={{ animationDelay: '.8s' }} />
      <span className="animate-sparkle absolute left-[48%] top-[31%] h-2 w-2 rounded-full bg-[#e9865c]" style={{ animationDelay: '1.2s' }} />
    </div>
  );
}

function Seal({ open }: { open: boolean }) {
  return (
    <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#9e5e35] bg-[#d97b56] text-[10px] font-bold uppercase tracking-[.17em] text-[#fff3d3] shadow-md transition-transform duration-500 ${open ? 'rotate-12 scale-90' : 'animate-stamp-pulse -rotate-6'}`}>
      <span>para ti</span>
    </div>
  );
}

function Letter({ onClose }: { onClose: () => void }) {
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    letterRef.current?.focus();
  }, []);

  return (
    <div className="letter-unfold relative z-10 mx-auto max-w-[670px] rounded-[2px] bg-[#fff8e9] px-6 py-8 text-[#4c3928] shadow-[0_22px_55px_rgba(77,54,27,.18)] sm:px-12 sm:py-11" tabIndex={-1} ref={letterRef}>
      <div className="absolute left-5 top-5 h-3 w-3 rounded-full border border-[#d6aa64] sm:left-8 sm:top-8" />
      <div className="absolute right-5 top-5 h-3 w-3 rounded-full border border-[#d6aa64] sm:right-8 sm:top-8" />
      <div className="mb-8 flex items-center justify-between border-b border-[#e5c995] pb-5">
        <span className="font-mono text-[10px] uppercase tracking-[.22em] text-[#9c7147]">Una carta para guardar</span>
        <span className="font-mono text-[10px] text-[#9c7147]">01 / 01</span>
      </div>
      <p className="mb-4 font-serif text-xl text-[#9e5e35] sm:text-2xl">{GIFT.greeting},</p>
      <div className="space-y-4 font-serif text-[17px] leading-[1.75] text-[#5a432e] sm:text-[19px]">
        {GIFT.message.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div className="mt-8 flex items-end justify-between gap-5 border-t border-[#e5c995] pt-6">
        <div>
          <p className="font-serif text-lg italic text-[#9e5e35]">{GIFT.closing}</p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[.18em] text-[#9c7147]">{GIFT.sender}</p>
        </div>
        <div className="hidden h-16 w-16 rotate-[-8deg] items-center justify-center rounded-full border border-[#d6aa64] text-center font-mono text-[8px] uppercase leading-tight tracking-[.12em] text-[#b7793a] sm:flex">
          hecho<br />con<br />cariño
        </div>
      </div>
      <button onClick={onClose} className="mt-8 text-left font-mono text-[10px] uppercase tracking-[.15em] text-[#9e5e35] underline decoration-[#dfb76f] underline-offset-4 transition-colors hover:text-[#5a432e]" data-testid="button-close-letter">
        Guardar la carta
      </button>
    </div>
  );
}

function GiftScene({ opened, setOpened }: { opened: boolean; setOpened: (value: boolean) => void }) {
  return (
    <section className="relative mx-auto mt-8 max-w-[900px] overflow-hidden rounded-[2rem] border border-[#dbc99e] bg-[#f5e8c9]/75 px-4 py-12 shadow-[0_24px_70px_rgba(100,67,29,.09)] sm:px-10 sm:py-16">
      <div className="absolute -right-12 top-10 h-36 w-36 rounded-full border border-[#e1b75d]/50" />
      <div className="absolute -right-5 top-17 h-24 w-24 rounded-full border border-[#e1b75d]/45" />
      <div className="relative min-h-[360px]">
        {!opened ? (
          <div className="animate-rise-in mx-auto max-w-[580px] text-center">
            <div className="relative mx-auto mb-7 h-40 max-w-[330px]">
              <div className="absolute bottom-0 left-1/2 h-24 w-64 -translate-x-1/2 rounded-[4px] bg-[#e9b65b] shadow-[0_13px_20px_rgba(120,77,25,.18)]">
                <div className="absolute inset-x-0 top-0 h-1/2 origin-top border-b border-[#c88b3f]/50 bg-[#f3c875]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><Seal open={false} /></div>
              </div>
              <div className="absolute left-1/2 top-0 h-6 w-1 -translate-x-1/2 bg-[#d97b56]" />
              <div className="absolute left-1/2 top-1 h-16 w-20 -translate-x-1/2 rounded-b-full border-x-4 border-b-4 border-[#d97b56]" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[.25em] text-[#9c7147]">Hay algo aquí dentro</p>
            <h2 className="mt-3 font-serif text-3xl text-[#583d25] sm:text-4xl">Una sorpresa hecha para ti</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#806344]">No hace falta una ocasión especial cuando alguien vuelve especial todos mis días.</p>
            <button onClick={() => setOpened(true)} className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#b9673f] px-6 py-3.5 text-sm font-bold text-[#fff7e5] shadow-[0_10px_22px_rgba(137,72,40,.2)] transition-all hover:-translate-y-1 hover:bg-[#9e5634] active:translate-y-0" data-testid="button-open-gift">
              <span>Abrir mi regalo</span>
              <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        ) : (
          <div className="relative">
            <div className="mb-8 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[.25em] text-[#9c7147]">Para {GIFT.recipient}</span>
              <h2 className="mt-3 font-serif text-3xl text-[#583d25] sm:text-4xl">Lo que quería decirte</h2>
            </div>
            <Letter onClose={() => setOpened(false)} />
          </div>
        )}
      </div>
    </section>
  );
}

function Home() {
  const [opened, setOpened] = useState(false);
  const [shared, setShared] = useState(false);

  const shareGift = async () => {
    const shareText = `Te han preparado una sorpresa: ${GIFT.greeting}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Flores amarillas para ti', text: shareText, url: window.location.href });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        window.setTimeout(() => setShared(false), 2400);
      }
    } catch {
      // Compartir puede cancelarse intencionalmente; la sorpresa sigue intacta.
    }
  };

  return (
    <main className="paper-grain min-h-[100dvh] overflow-hidden bg-[#fbf2dc]">
      <div className="hero-grid relative">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-[#d97b56]" />
            <span className="font-mono text-[10px] uppercase tracking-[.22em] text-[#72583a]">Una pequeña sorpresa</span>
          </div>
          <button onClick={shareGift} className="rounded-full border border-[#d8bd86] px-4 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-[#8c683d] transition-colors hover:border-[#b9673f] hover:text-[#9e5e35]" data-testid="button-share-gift">
            {shared ? 'Enlace copiado' : 'Compartir regalo'}
          </button>
        </header>

        <div className="mx-auto grid max-w-6xl items-center gap-6 px-6 pb-16 pt-12 sm:px-10 sm:pb-24 sm:pt-20 lg:grid-cols-[.9fr_1.1fr] lg:gap-0">
          <div className="relative z-10 max-w-xl animate-rise-in">
            <p className="font-mono text-[11px] uppercase tracking-[.28em] text-[#b9673f]">Esto es para ti</p>
            <h1 className="mt-5 font-serif text-[clamp(3.5rem,8vw,7.8rem)] leading-[.88] tracking-[-.055em] text-[#523b25]">
              Que nunca te falte <em className="text-[#c98a21]">luz.</em>
            </h1>
            <p className="mt-8 max-w-md text-base leading-8 text-[#806344] sm:text-lg">
              Un ramo amarillo para recordarte que hay presencias que hacen que el mundo se sienta un poquito más amable.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="h-px w-12 bg-[#d97b56]" />
              <span className="font-mono text-[10px] uppercase tracking-[.19em] text-[#9c7147]">hecho a mano, pensado en ti</span>
            </div>
          </div>
          <div className="relative -my-2 lg:-my-14">
            <Bouquet />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#fbf2dc] to-transparent" />
      </div>

      <div className="mx-auto px-6 pb-24 sm:px-10 sm:pb-32">
        <GiftScene opened={opened} setOpened={setOpened} />
      </div>

      <section className="border-t border-[#e2cea5] bg-[#f6e8c7] px-6 py-16 sm:px-10 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-[1fr_1.5fr] sm:items-start">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[.25em] text-[#b9673f]">P.D.</span>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-[#583d25]">Guarda este momento.</h2>
          </div>
          <div className="max-w-xl">
            <p className="font-serif text-xl leading-relaxed text-[#725238]">Las flores se marchitan, pero lo que quisimos decir cuando las regalamos puede quedarse mucho más tiempo.</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[.16em] text-[#9c7147]">
              <span>para sonreír hoy</span><span>para volver cuando quieras</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#f6e8c7] px-6 pb-10 text-center sm:px-10">
        <div className="mx-auto h-px max-w-5xl bg-[#dfc590]" />
        <p className="pt-8 font-mono text-[10px] uppercase tracking-[.22em] text-[#9c7147]">Con cariño, siempre</p>
      </footer>
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