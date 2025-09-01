import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronDown, Instagram, UtensilsCrossed, BookText as TikTok, Youtube, Facebook, Sparkles, Heart } from 'lucide-react';

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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header 
      ref={heroRef}
      id="hero"
      className="relative py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden w-full min-h-screen flex items-center"
      style={{
        background: isMobile 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)' 
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)'
      }}
      aria-labelledby="hero-heading"
    >
      {/* Beautiful floating elements */}
      {!isMobile && (
        <>
          <div className="absolute top-[20%] right-[10%] w-16 h-16 bg-white/10 rounded-full animate-gentle-pulse"></div>
          <div className="absolute bottom-[25%] left-[8%] w-12 h-12 bg-white/15 rounded-full animate-gentle-bounce"></div>
          <div className="absolute top-[35%] left-[15%] w-10 h-10 bg-white/10 rounded-full animate-gentle-pulse"></div>
          <div className="absolute top-[60%] right-[20%] w-8 h-8 bg-white/20 rounded-full animate-gentle-bounce"></div>
        </>
      )}
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center relative z-10 w-full max-w-7xl">
        {/* Beautiful text section */}
        <div className={`w-full lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center bg-white/95 backdrop-blur-md text-purple-700 px-4 py-3 rounded-full text-sm font-semibold mb-6 md:mb-8 shadow-lg hover-scale cursor-default">
            <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
            Assyrisk/syriansk matkonst
          </span>
          
          {/* Beautiful hero title */}
          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight font-serif">
            Mat från hjärtat<br />
            <span className="bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">& själen</span>
          </h1>
          
          {/* Beautiful description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 text-white/95 leading-relaxed">
            Upptäck <mark className="bg-white/20 backdrop-blur-sm text-white font-semibold px-3 py-1 rounded-lg border border-white/20">enkla och smakrika recept</mark> med autentiska assyriska/syrianska rötter, anpassade för det moderna köket.
          </p>
          
          <p className="mb-6 md:mb-8 lg:mb-10 text-white/85 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
            Säsongsbaserad matlagning som skapar glädje runt bordet för hela familjen.
          </p>
          
          {/* Beautiful CTA buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6 md:mb-8 lg:mb-10">
            <button 
              onClick={scrollToRecipes}
              className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-400 py-4 px-8 rounded-2xl font-semibold flex items-center justify-center group text-center shadow-xl hover:shadow-2xl hover-lift text-base min-h-[56px] w-full sm:w-auto border border-white/20"
              aria-label="Utforska recept"
            >
              <UtensilsCrossed size={20} className="mr-3 transform transition-transform group-hover:rotate-12" />
              <span>Utforska recept</span>
              <Sparkles size={16} className="ml-2 animate-gentle-pulse" />
            </button>
          </div>

          {/* Beautiful social media */}
          <div className="mb-6 md:mb-8 lg:mb-10">
            <h4 className="font-semibold mb-4 text-white text-base md:text-lg flex items-center">
              <Heart size={18} className="mr-2 text-pink-300" />
              Följ mig här:
            </h4>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <a href="https://www.instagram.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                className="bg-white/15 backdrop-blur-md text-white hover:bg-white/25 p-4 rounded-2xl transition-all shadow-lg border border-white/20 flex items-center justify-center min-h-[52px] min-w-[52px] hover-scale" 
                aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                className="bg-white/15 backdrop-blur-md text-white hover:bg-white/25 p-4 rounded-2xl transition-all shadow-lg border border-white/20 flex items-center justify-center min-h-[52px] min-w-[52px] hover-scale" 
                aria-label="TikTok">
                <TikTok size={20} />
              </a>
              <a href="https://www.youtube.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                className="bg-white/15 backdrop-blur-md text-white hover:bg-white/25 p-4 rounded-2xl transition-all shadow-lg border border-white/20 flex items-center justify-center min-h-[52px] min-w-[52px] hover-scale" 
                aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href="https://www.facebook.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                className="bg-white/15 backdrop-blur-md text-white hover:bg-white/25 p-4 rounded-2xl transition-all shadow-lg border border-white/20 flex items-center justify-center min-h-[52px] min-w-[52px] hover-scale" 
                aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Beautiful scroll indicator */}
          <div className="hidden md:flex items-center text-white/80 text-base">
            <span className="mr-3 font-medium">Utforska mer</span>
            <button 
              onClick={scrollToRecipes}
              className="animate-gentle-bounce bg-white/20 backdrop-blur-md h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent hover:bg-white/30 min-h-[48px] border border-white/20"
              aria-label="Scrolla ner till recept"
            >
              <ChevronDown size={22} className="text-white" />
            </button>
          </div>
        </div>
        
        {/* Beautiful hero image */}
        <div className={`w-full lg:w-1/2 flex justify-center transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            <div className="rounded-3xl h-60 w-60 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 xl:h-[28rem] xl:w-[28rem] border-4 border-white/30 shadow-2xl relative mx-auto backdrop-blur-md hover-scale">
              <img 
                src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCvA6O3yhwpAvKSmuXsEtqUGlWP80xMr5Ihgb4" 
                alt="Mayka Gulo i köket med färska råvaror" 
                className="object-cover w-full h-full rounded-3xl transition-transform duration-700"
                loading="eager"
                width="448"
                height="448"
                decoding="async"
              />
              {/* Beautiful overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-pink-500/20 rounded-3xl"></div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/30 hidden lg:block">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">200k+</div>
                <div className="text-xs text-gray-600 font-medium">Följare</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile scroll indicator */}
      <div className="md:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={scrollToRecipes}
          className="animate-gentle-bounce bg-white/25 backdrop-blur-md h-14 w-14 rounded-2xl flex items-center justify-center shadow-xl hover:bg-white/35 transition-all min-h-[48px] border border-white/30"
          aria-label="Scrolla ner för att utforska recept"
        >
          <ChevronDown size={26} className="text-white" />
        </button>
      </div>
    </header>
  );
};