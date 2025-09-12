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
  MapPin,
  CalendarDays
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
  const musicSrc = "/El%20leon%20rey%20duerme%20ya%20Dormido%20esta%20el%20leon.mp3";
  const eventTargetDate = "2025-10-10T15:00:00-05:00"; // Dallas, TX timezone (CDT)
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
    setTimeout(() => {
      setIsOpened(true);
      setIsEnvelopeAnimating(false);
    }, 800);
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
        <meta property="og:title" content="🦁 Aventura Safari - Primer Año de Isabella Marina 🌿" />
        <meta property="og:description" content="🐘 Únete a la aventura Safari de Isabella Marina el 10 de octubre a las 3:00 PM. Una celebración llena de diversión en la selva 🦒🎉" />
        <meta property="og:image" content="/safari.png" />
        <meta property="og:url" content="invitacion-xv-victoria.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="🦁 Aventura Safari - Primer Año de Isabella Marina 🌿" />
        <meta name="twitter:description" content="🐘 Únete a la aventura Safari de Isabella Marina el 10 de octubre a las 3:00 PM. Una celebración llena de diversión en la selva 🦒🎉" />
        <meta name="twitter:image" content="/safari.png" />
      </Head>
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-2xl my-8 animate-in fade-in slide-in-from-bottom-10 duration-700 overflow-hidden border-2 border-[transparent] hover:border-[transparent] transition-colors duration-300">
        <Image 
          src="/background.png"
          fill
          alt="Elegant event background" 
          className="absolute inset-0 z-[-1] opacity-40 filter object-cover rounded-xl"
          priority
          data-ai-hint="elegant background"
        />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-8 sm:space-y-10 p-4 sm:p-8 mt-8">
          <p className="font-headline text-xl sm:text-2xl text-foreground tracking-wide animate-fade-in-up text-visible font-medium sm:font-normal mt-10">
            Celebremos el primer año de
          </p>
          
          <div className="mb-6 sm:mb-8">
            <Image
              src="/isabella.jpg"
              alt="Isabella"
              width={250}
              height={250}
              className="rounded-full mx-auto shadow-lg animate-fade-in-up"
              priority
            />
          </div>
          
        <div className="text-center mb-4">
          

        {/* Disney effect wrapper */}
          <div className="disney-wrapper h-45 w-auto mx-auto mt-2" style={{width: '97vw', margin: '0 1.5vw'}}>
            <img 
              src="/fonts/Isabella.svg" 
              alt="Isabella" 
              className="disney-logo"
            />
          </div>
        </div>

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

          {/* Music Player Component */}
          <div className="mb-8 flex justify-center">
            <MusicPlayer audioSrc={musicSrc} autoPlay={true} />
          </div>
         
          <Card 
            id="countdown-section"
            data-animate
            className={`w-full max-w-md mt-12 mb-4 bg-transparent border-none transition-all duration-1000 transform ${
              visibleElements.has('countdown-section') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-100 translate-y-0'
            }`}
          >
            <CardContent className="flex flex-col items-center mt-5">
              <p className="mb-12 font-headline text-lg sm:text-xl text-foreground mt-2 tracking-widest animate-fade-in-up text-visible">Tan solo faltan</p>
              <CountdownTimer targetDate={eventTargetDate} />
              <p className="font-headline text-lg sm:text-xl text-foreground mt-12 tracking-widest animate-fade-in-up text-visible">para este dia tan especial</p>
            </CardContent>
          </Card>

          {/* Plim Jirafa Image */}
          <div className="mb-8 flex justify-center">
            <Image src="/Plim_jirafa.png" alt="Plim Jirafa" width={150} height={150} className="drop-shadow-lg animate-bounce-slow" />
          </div>
                   
          <div style={{width: '97vw', margin: '0 1.5vw'}}>
            <EventDateDisplay 
              data-id="date-display"
              data-animate
              monthName="Octubre"
              dayName="Viernes"
              dayNumber="10"
              year="2025"
              time="3:00 PM"
              location="10054 Spice Ln Dallas, TX 75217, EE. UU."
              className={`mb-8 transition-all duration-1000 transform ${
                visibleElements.has('date-display') 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-100 translate-y-0 scale-100'
              }`}
            />
          </div>

          {/* Add to Calendar Button */}
          <div className="mb-12 flex justify-center">
            <Button
              onClick={() => {
                const eventDetails = {
                  title: "Primer Año de Isabella Marina",
                  start: "20251010T150000",
                  end: "20251010T200000",
                  location: "10054 Spice Ln Dallas, TX 75217, EE. UU.",
                  description: "🦁 Aventura Safari - Celebración del primer año de Isabella Marina 🌿"
                };
                
                // Detect platform
                const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
                const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
                const isAndroid = /android/i.test(userAgent);
                
                let calendarUrl = '';
                
                if (isIOS) {
                  // iOS Calendar URL - Create proper .ics content
                  const icsContent = [
                    'BEGIN:VCALENDAR',
                    'VERSION:2.0',
                    'PRODID:-//Safari Event//EN',
                    'BEGIN:VEVENT',
                    `DTSTART:${eventDetails.start}`,
                    `DTEND:${eventDetails.end}`,
                    `SUMMARY:${eventDetails.title}`,
                    `DESCRIPTION:${eventDetails.description}`,
                    `LOCATION:${eventDetails.location}`,
                    'END:VEVENT',
                    'END:VCALENDAR'
                  ].join('\r\n');
                  
                  calendarUrl = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
                } else if (isAndroid) {
                  // Android Calendar Intent
                  const startTime = new Date('2025-10-10T18:00:00').getTime();
                  const endTime = new Date('2025-10-10T23:00:00').getTime();
                  calendarUrl = `content://com.android.calendar/events?title=${encodeURIComponent(eventDetails.title)}&beginTime=${startTime}&endTime=${endTime}&eventLocation=${encodeURIComponent(eventDetails.location)}&description=${encodeURIComponent(eventDetails.description)}`;
                } else {
                  // Default to Google Calendar for desktop/web
                  calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.start}/${eventDetails.end}&location=${encodeURIComponent(eventDetails.location)}&details=${encodeURIComponent(eventDetails.description)}`;
                }
                
                if (isIOS) {
                  // For iOS, create a downloadable .ics file
                  const element = document.createElement('a');
                  element.setAttribute('href', calendarUrl);
                  element.setAttribute('download', 'evento-isabella.ics');
                  element.style.display = 'none';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                } else {
                  window.open(calendarUrl, '_blank', 'noopener,noreferrer');
                }
              }}
              variant="outline"
              className="bg-primary hover:bg-primary/90 text-primary-foreground border-primary hover:border-primary/90 px-6 py-3 text-base font-medium"
            >
              <CalendarDays className="mr-2 h-5 w-5" />
              Agregar al calendario
            </Button>
          </div>

          <div className="w-full animate-in fade-in duration-1000 delay-1100">
            <SectionCard 
              title=""
              locationButtons={[
                { 
                  text: "Waze", 
                  url: "https://waze.com/ul?q=10054%20Spice%20Ln%20Dallas%20TX%2075217&navigate=yes", 
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
              {/* Safari image */}
              <div className="flex flex-col items-center mb-2">
                <Image 
                  src="/safari.png" 
                  alt="Safari" 
                  width={320} 
                  height={150} 
                  className="drop-shadow-lg animate-fade-in-up"
                />
              </div>
              <div className="mt-1 space-y-1 text-center">
                <p className="flex items-center justify-center animate-fade-in-up">10054 Spice Ln</p>
                <p className="flex items-center justify-center animate-fade-in-up"><i>Dallas, TX 75217, EE. UU.</i></p>
                <p className="flex items-center justify-center animate-fade-in-up"><i>3:00 PM</i></p>
              </div>
            </SectionCard>
          </div>

          <div className="w-full animate-in fade-in duration-1000 delay-[1500ms]">
            <SectionCard 
              title="Regalos" 
              titleClassName="text-foreground"
            >
              <div className="text-center space-y-4">
                <p className="text-foreground/90 mb-4">
                  Tu compañía en este día tan especial es el mejor regalo. Pero si deseas darme un obsequio, aquí tienes algunas opciones:
                </p>
                <Button
                  onClick={() => window.open('https://www.amazon.com/hz/wishlist/ls/OYNKD59VAVLT?ref_=wl_share', '_blank')}
                  variant="outline"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground border-primary hover:border-primary/90"
                >
                  <Gem className="mr-2 h-4 w-4" />
                  Ver Lista de Regalos en Amazon
                </Button>
              </div>
            </SectionCard>
          </div>
          
          {/* Confirmation Section */}
          <div className="w-full animate-in fade-in duration-1000 delay-[1800ms]">
            <div className="rounded-lg border text-card-foreground w-full max-w-md bg-transparent border-none shadow-none animate-in fade-in duration-700 mx-auto">
              <div className="flex flex-col space-y-1.5 p-6 pb-3 pt-5">
                <div className="tracking-tight font-headline text-2xl font-semibold sm:text-3xl sm:font-bold flex items-center justify-center text-center text-foreground">
                  <span className="mr-3 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-foreground">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                  </span>
                  Confirmar Asistencia
                </div>
              </div>
              <div className="p-6 pt-0 font-body font-normal sm:text-lg text-white space-y-4 text-center">
                <div className="space-y-6">
                  <div style={{width: '90vw', margin: '0 5vw'}}>
                    <input 
                      type="text" 
                      placeholder="Ingresa tu nombre" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-center font-body text-base"
                      id="attendee-name"
                    />
                  </div>
                  <div style={{width: '90vw', margin: '0 5vw'}}>
                    <button 
                      onClick={() => {
                        const name = (document.getElementById('attendee-name') as HTMLInputElement)?.value || 'Invitado';
                        const message = `🦁 Hola! Soy ${name} y confirmo mi asistencia a la aventura Safari de Isabella Marina el 10 de octubre a las 3:00 PM 🌿🦒 Nos vemos en la selva! 🐘🎉`;
                        const whatsappUrl = `https://wa.me/13057837691?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                      }}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6 py-3"
                    >
                    Confirmar Asistencia
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          className="relative w-full bg-[url('/flowers_deco/flowers_deco.png')] bg-contain bg-no-repeat bg-bottom"
        >
          <div className="flex flex-col items-center pt-4 pb-24 px-4">
            <div className="flex flex-col items-center w-full">
              <Image 
                src="/Plim2.png" 
                alt="Plim" 
                width={400} 
                height={400} 
                className="w-full h-auto drop-shadow-lg animate-fade-in-up"
              />
            </div>
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
              <p className="font-body text-lg sm:text-xl text-foreground/80 text-center animate-fade-in-up">¡Te esperamos! </p>
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
