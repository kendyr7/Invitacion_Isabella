'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import MusicPlayer from '@/components/event/MusicPlayer';
import CountdownTimer from '@/components/event/CountdownTimer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionCard from '@/components/event/SectionCard';
import ActivityTimelineItem from '@/components/event/ActivityTimelineItem';
import EventDateDisplay from '../components/event/EventDateDisplay';
import AnimatedName from '@/components/event/AnimatedName';
import { 
  Gift, 
  ListChecks,
  Utensils,
  Sparkles as SparklesIcon, 
  CakeSlice,
  PartyPopper,
  GlassWater,
  Martini, 
  Gem, 
  Camera,
  Disc3, 
  Car,
  Palette,
  Brush,
  Wine,
  Bus,
  Mail,
  ArrowUp,
  Navigation,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Head from 'next/head';

// Hook personalizado para animaciones de scroll
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  
  useEffect(() => {
    // Inicializar todos los elementos como visibles
    const elements = document.querySelectorAll('[data-animate]');
    const initialVisible = new Set();
    elements.forEach(el => {
      if (el.id) {
        initialVisible.add(el.id);
      }
    });
    setVisibleElements(initialVisible);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return visibleElements;
};

export default function HomePage() {
  const [isOpened, setIsOpened] = useState(false);
  const [isEnvelopeAnimating, setIsEnvelopeAnimating] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const audioSrc = "/audio/paradise-coldplay.mp3"; 
  const eventTargetDate = "2025-09-27T19:00:00-05:00"; // Dallas, TX timezone (CDT)
  const visibleElements = useScrollAnimation();

  useEffect(() => {
    if (!isOpened) return;

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpened]);
  
  const handleOpenEnvelope = () => {
    setIsEnvelopeAnimating(true);
    // Después de la animación del sobre, mostrar la invitación
    setTimeout(() => {
      setIsOpened(true);
      setIsEnvelopeAnimating(false);
    }, 800); // 800ms para la animación del sobre
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  if (!isOpened) {
    return (
      <main 
        className="flex min-h-screen flex-col items-center justify-center bg-background p-4 cursor-pointer" 
        onClick={handleOpenEnvelope}
      >
        <div className={`
          text-center transition-all duration-800 ease-in-out
          ${isEnvelopeAnimating 
            ? 'opacity-0 -translate-y-8 scale-95' 
            : 'opacity-100 translate-y-0 scale-100'
          }
        `}>
          <Image 
            src="/envelope.png"
            alt="An envelope, click to open invitation"
            width={400}
            height={300}
            className="mx-auto"
            data-ai-hint="envelope mail"
            priority
          />
        </div>
      </main>
    );
  }

  return (
    <main className={`
      flex flex-col items-center justify-center min-h-screen bg-background text-foreground relative overflow-auto sm:overflow-hidden
      transition-all duration-1000 ease-out
      ${isOpened && !isEnvelopeAnimating ? 'opacity-100' : 'opacity-0'}
    `}>
      <Head>
        <meta property="og:title" content="Cumpleaños Isabella Mariana" />
        <meta property="og:description" content="Te invitamos a celebrar con nosotros el primer año de Isabella" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="invitacion-xv-victoria.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og-image.png" />
      </Head>
      <Image 
        src="/paper-texture1.jpg"
        fill
        alt="Elegant event background" 
        className="absolute inset-0 z-[-1] opacity-20 filter blur-sm object-cover"
        priority
        data-ai-hint="elegant background"
      />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-2xl my-8 animate-in fade-in slide-in-from-bottom-10 duration-700 overflow-hidden border-2 border-[transparent] hover:border-[transparent] transition-colors duration-300">
      
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-8 sm:space-y-10 p-4 sm:p-8 mt-8">
          <div className="mb-6 sm:mb-8">
            <Image
              src="/isabella.jpg"
              alt="Isabella"
              width={200}
              height={200}
              className="rounded-full mx-auto shadow-lg animate-fade-in-up"
              priority
            />
          </div>
          <p className="font-headline text-xl sm:text-2xl text-foreground mb-4 tracking-wide animate-fade-in-up text-visible font-medium sm:font-normal">
            Celebremos el cumpleaños de
          </p>
          <AnimatedName 
            firstName="Isabella"
            lastName="Mariana"
            className="mb-6 sm:mb-8"
          />

          <div 
            id="tiara-section"
            data-animate
            className={`flex flex-row items-center justify-center -space-x-4 mt-8 mb-6 transition-all duration-1000 transform ${
              visibleElements.has('tiara-section') 
                ? 'opacity-100 translate-y-0 rotate-0' 
                : 'opacity-100 translate-y-0 rotate-0'
            }`}
          >
            <Image src="/Plim_pink.png" alt="Plim Pink" width={120} height={120} data-ai-hint="plim pink character" className="drop-shadow-lg animate-bounce-slow z-10"/>
            <Image src="/Plim.png" alt="Plim" width={120} height={120} data-ai-hint="plim character" className="drop-shadow-lg animate-bounce-slow z-20"/>
            <Image src="/Plim_bunny.png" alt="Plim Bunny" width={120} height={120} data-ai-hint="plim bunny character" className="drop-shadow-lg animate-bounce-slow z-10"/>
          </div>
                   
          <EventDateDisplay 
            data-id="date-display"
            data-animate
            monthName="Agosto"
            dayName="Sábado"
            dayNumber="15"
            year="2025"
            time="6:00 PM"
            location="10054 Spice Ln Dallas, TX 75217, EE. UU."
            rsvpInfo="+1(505)8888-9999"
            className={`mb-12 transition-all duration-1000 transform ${
              visibleElements.has('date-display') 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-100 translate-y-0 scale-100'
            }`}
          />
          
          <Card 
            id="countdown-section"
            data-animate
            className={`w-full max-w-md mt-12 mb-4 bg-transparent border-none transition-all duration-1000 transform ${
              visibleElements.has('countdown-section') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-100 translate-y-0'
            }`}
          >
            <CardContent className="flex flex-col items-center mt-12">
              <p className="mb-12 font-headline text-lg sm:text-xl text-foreground mt-2 tracking-widest animate-fade-in-up text-visible">Tan solo faltan</p>
              <CountdownTimer targetDate={eventTargetDate} />
              <p className="font-headline text-lg sm:text-xl text-foreground mt-12 tracking-widest animate-fade-in-up text-visible">para este dia tan especial</p>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-none shadow-none w-full animate-in fade-in duration-1000 delay-600">
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="font-headline text-2xl sm:text-3xl text-foreground flex items-center justify-center text-center">
                ¿Cuándo y dónde?
              </CardTitle>
            </CardHeader>
            <CardContent className="font-body text-lg sm:text-xl text-foreground/80 space-y-1 pt-6">
            <p>A continuacion encontraras el horario y ubicacion de los eventos de mi fiesta, asi como un boton directo a Google Maps para que puedas llegar facilmente.</p>
            </CardContent>
          </Card>
          
          <div className="w-full animate-in fade-in duration-1000 delay-1100">
            <SectionCard 
              title="Recepción"
              locationButtons={[
                { 
                  text: "Waze", 
                  url: "https://waze.com/ul?ll=32.6593,-96.8564&navigate=yes&zoom=17", 
                  icon: <Navigation className="mr-2 h-4 w-4" />
                },
                { 
                  text: "Google Maps", 
                  url: "https://maps.google.com/?q=10054+Spice+Ln,+Dallas,+TX+75217,+USA", 
                  icon: <MapPin className="mr-2 h-4 w-4" />
                }
              ]}
              titleClassName="text-foreground"
            >
              <div className="flex flex-col items-center space-y-2 mb-3">
                <Image src="/champagne.png" alt="champagne Icon" width={40} height={40} className="shrink-0 animate-bounce-slow" data-ai-hint="champagne"/>
              </div>
              <div className="mt-1 space-y-1 text-center">
                <p className="flex items-center justify-center animate-fade-in-up">10054 Spice Ln</p>
                <p className="flex items-center justify-center animate-fade-in-up"><i>Dallas, TX 75217, EE. UU.</i></p>
                <p className="flex items-center justify-center animate-fade-in-up"><i>6:00 PM</i></p>
              </div>
            </SectionCard>
          </div>

          <div className="w-full animate-in fade-in duration-1000 delay-[1500ms]">
            <SectionCard 
              title="Regalos" 
              icon={<Gem size={28} className="text-foreground"/>}
              titleClassName="text-foreground"
            >
              <p className="flex items-center justify-center gap-2 mb-4">
                <span>Agradecemos sus muestras de cariño en sobre</span>
              </p>
              
              {/* Animación del sobre */}
              <div className="flex justify-center">
                <div className="relative group">
                  <Image 
                    src="/envelope.png"
                    alt="An envelope, click to open invitation"
                    width={80}
                    height={60}
                    className="transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-2 animate-pulse-slow"
                  />
                  
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                  
                  {/* Icono de regalo flotante */}
                  <div className="absolute -top-2 -right-2 bg-primary rounded-full p-1 animate-bounce-slow">
                    <Gift className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
        
        <div 
          className="relative w-full bg-[url('/flowers_deco/flowers_deco.png')] bg-contain bg-no-repeat bg-bottom"
        >
          <div className="flex flex-col items-center pt-10 pb-24 px-4">
            <div 
              id="confirmation-section"
              data-animate
              className={`flex flex-col items-center w-full max-w-xs transition-all duration-1000 transform ${
                visibleElements.has('confirmation-section') 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
                        
            <div 
              id="final-message"
              data-animate
              className={`mt-4 transition-all duration-1000 transform ${
                visibleElements.has('final-message') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="font-body text-lg sm:text-xl text-foreground/80 text-center px-4 animate-fade-in-up">¡Te esperamos! </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full text-center py-4 bg-background/80 dark:bg-neutral-900/80 text-foreground/60 text-xs backdrop-blur-md">
          <a 
                href="https://www.instagram.com/invitaciones_digitales_505?igsh=MW9qdXkwNG5qY2k2ZQ==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="italic animate-fade-in-up text-foreground hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Invitaciones Digitales 505
              </a>
        </footer>

      </div>
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-gradient-to-r from-decorative-gradientFrom to-decorative-gradientTo backdrop-blur-sm p-0 text-primary-foreground shadow-lg transition-transform hover:scale-110 hover:bg-primary"
          aria-label="Volver al inicio"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
      </div>
    </main>
  );
}
