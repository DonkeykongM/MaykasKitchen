import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronDown, Instagram, UtensilsCrossed, BookText as TikTok, Youtube, Facebook } from 'lucide-react';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const scrollToRecipes = useCallback(() => {
    const element = document.getElementById('recept');
    if (element) {
      const headerHeight = 90;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <header 
      ref={heroRef}
      id="hero"
      className="relative py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden w-full min-h-screen flex items-center"
      style={{
        background: isMobile 
          ? 'linear-gradient(135deg, #800080 0%, #4B0082 50%, #2E0054 100%)' 
          : 'linear-gradient(135deg, #800080 0%, #4B0082 25%, #2E0054 50%, #1A001A 75%, #000000 100%)'
      }}
      aria-labelledby="hero-heading"
    >
      {/* Minimala dekorativa element för mobil - ingen animation */}
      {!isMobile && (
        <>
          <div className="absolute top-[20%] right-[10%] w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-white/3 rounded-full"></div>
          <div className="absolute bottom-[25%] left-[8%] w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 bg-white/3 rounded-full"></div>
          <div className="absolute top-[35%] left-[15%] w-4 h-4 md:w-6 md:h-6 lg:w-10 lg:h-10 bg-white/3 rounded-full"></div>
        </>
      )}
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center relative z-10 w-full max-w-7xl">
        {/* OPTIMERAD TEXT-SEKTION FÖR MOBIL */}
        <div className={`w-full lg:w-1/2 lg:pr-8 mb-6 lg:mb-0 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-purple-700 px-3 py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6 lg:mb-8 shadow-lg">
            <span className="bg-purple-600 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mr-2"></span>
            Assyrisk/syriansk matkonst
          </span>
          
          {/* FÖRBÄTTRAD MOBILANPASSAD RUBRIK */}
          <h1 id="hero-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4 lg:mb-6 leading-tight font-serif">
            Mat från hjärtat<br />
            <span className="text-white">& själen</span>
          </h1>
          
          {/* FÖRBÄTTRAD MOBILANPASSAD BESKRIVNING */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-2 md:mb-3 lg:mb-4 text-white leading-relaxed">
            Upptäck <mark className="bg-purple-600/90 text-white font-semibold px-1 md:px-2 py-0.5 md:py-1 rounded text-sm sm:text-base md:text-lg lg:text-xl">enkla och smakrika recept</mark> med autentiska assyriska/syrianska rötter, anpassade för det moderna köket.
          </p>
          
          <p className="mb-4 md:mb-6 lg:mb-8 xl:mb-10 text-white/80 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
            Säsongsbaserad matlagning som skapar glädje runt bordet för hela familjen.
          </p>
          
          {/* FÖRBÄTTRAD MOBILANPASSAD KNAPP */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-4 md:mb-6 lg:mb-8 xl:mb-10">
            <button 
              onClick={scrollToRecipes}
              className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 py-3 md:py-4 px-6 md:px-8 rounded-full font-semibold flex items-center justify-center group text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm md:text-base min-h-[44px] w-full sm:w-auto"
              aria-label="Utforska recept"
            >
              <UtensilsCrossed size={16} className="mr-2 md:mr-3 transform transition-transform group-hover:rotate-12" />
              <span>Utforska recept</span>
            </button>
          </div>

          {/* FÖRBÄTTRADE MOBILANPASSADE SOCIALA MEDIER */}
          <div className="mb-4 md:mb-6 lg:mb-8 xl:mb-10">
            <h4 className="font-semibold mb-3 md:mb-4 text-white text-sm md:text-base lg:text-lg">Följ mig här:</h4>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-3 lg:gap-4">
              <a href="https://www.instagram.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-2 md:p-3 lg:p-4 rounded-full transition-all transform hover:scale-110 shadow-lg border border-white/20 flex items-center justify-center min-h-[44px] min-w-[44px]" 
                aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.tiktok.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-2 md:p-3 lg:p-4 rounded-full transition-all transform hover:scale-110 shadow-lg border border-white/20 flex items-center justify-center min-h-[44px] min-w-[44px]" 
                aria-label="TikTok">
                <TikTok size={18} />
              </a>
              <a href="https://www.youtube.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-2 md:p-3 lg:p-4 rounded-full transition-all transform hover:scale-110 shadow-lg border border-white/20 flex items-center justify-center min-h-[44px] min-w-[44px]" 
                aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href="https://www.facebook.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-2 md:p-3 lg:p-4 rounded-full transition-all transform hover:scale-110 shadow-lg border border-white/20 flex items-center justify-center min-h-[44px] min-w-[44px]" 
                aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          
          {/* DESKTOP SCROLL INDIKATOR */}
          <div className="hidden md:flex items-center text-white/70 text-sm">
            <span className="mr-2">Utforska mer</span>
            <button 
              onClick={scrollToRecipes}
              className="animate-bounce bg-white/20 backdrop-blur-sm h-10 w-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent hover:bg-white/30 min-h-[44px]"
              aria-label="Scrolla ner till recept"
            >
              <ChevronDown size={20} className="text-white" />
            </button>
          </div>
        </div>
        
        {/* FÖRBÄTTRAD MOBILANPASSAD BILD */}
        <div className={`w-full lg:w-1/2 flex justify-center transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <div className="rounded-full overflow-hidden h-48 w-48 sm:h-56 sm:w-56 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96 border-4 border-white/20 shadow-2xl relative mx-auto backdrop-blur-sm">
              <img 
                src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCvA6O3yhwpAvKSmuXsEtqUGlWP80xMr5Ihgb4" 
                alt="Mayka Gulo i köket med färska råvaror" 
                className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-105"
                loading="eager"
                width="384"
                height="384"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* MOBIL SCROLL INDIKATOR */}
      <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={scrollToRecipes}
          className="animate-bounce bg-white/20 backdrop-blur-sm h-12 w-12 rounded-full flex items-center justify-center shadow-lg hover:bg-white/30 transition-all min-h-[44px]"
          aria-label="Scrolla ner för att utforska recept"
        >
          <ChevronDown size={24} className="text-white" />
        </button>
      </div>
    </header>
  );
};