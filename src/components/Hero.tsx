import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronDown, Instagram, UtensilsCrossed, BookText as TikTok, Youtube, Facebook } from 'lucide-react';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Optimized intersection observer for better performance
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
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden w-full min-h-screen flex items-center"
      style={{
        background: 'linear-gradient(135deg, #800080 0%, #4B0082 25%, #2E0054 50%, #1A001A 75%, #000000 100%)'
      }}
      aria-labelledby="hero-heading"
    >
      {/* Subtle floating elements */}
      <div className="absolute top-[20%] right-[10%] w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-full animate-pulse" 
           style={{ animation: 'float 6s ease-in-out infinite' }}></div>
      <div className="absolute bottom-[25%] left-[8%] w-8 h-8 md:w-12 md:h-12 bg-white/5 rounded-full animate-pulse" 
           style={{ animation: 'float 6s ease-in-out infinite 1s' }}></div>
      <div className="absolute top-[35%] left-[15%] w-6 h-6 md:w-10 md:h-10 bg-white/5 rounded-full animate-pulse" 
           style={{ animation: 'float 6s ease-in-out infinite 2s' }}></div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center relative z-10 w-full max-w-7xl">
        <div className={`w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Badge matching reference image */}
          <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
            <span className="bg-purple-600 w-2 h-2 rounded-full mr-2"></span>
            Assyrisk/syriansk matkonst
          </span>
          
          {/* Main heading matching reference image exactly */}
          <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight font-serif">
            Mat från hjärtat<br />
            <span className="text-white">& själen</span>
          </h1>
          
          {/* Description with highlighted text matching reference */}
          <p className="text-lg md:text-xl lg:text-2xl mb-4 text-white leading-relaxed">
            Upptäck <mark className="bg-purple-600/90 text-white font-semibold px-2 py-1 rounded">enkla och smakrika recept</mark> med autentiska assyriska/syrianska rötter, anpassade för det moderna köket.
          </p>
          
          <p className="mb-8 md:mb-10 text-white/80 text-lg">
            Säsongsbaserad matlagning som skapar glädje runt bordet för hela familjen.
          </p>
          
          {/* Button matching reference image */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-8 md:mb-10">
            <button 
              onClick={scrollToRecipes}
              className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 py-4 px-8 rounded-full font-semibold flex items-center justify-center group text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 will-change-transform"
              aria-label="Utforska recept"
            >
              <UtensilsCrossed size={20} className="mr-3 transform transition-transform group-hover:rotate-12" />
              <span>Utforska recept</span>
            </button>
          </div>

          {/* Social media section matching reference */}
          <div className="mb-8 md:mb-10">
            <h4 className="font-semibold mb-4 text-white text-lg">Följ mig här:</h4>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.instagram.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-4 rounded-full transition-all transform hover:scale-110 shadow-lg border border-white/20" 
                aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="https://www.tiktok.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-4 rounded-full transition-all transform hover:scale-110 shadow-lg border border-white/20" 
                aria-label="TikTok">
                <TikTok size={24} />
              </a>
              <a href="https://www.youtube.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-4 rounded-full transition-all transform hover:scale-110 shadow-lg border border-white/20" 
                aria-label="YouTube">
                <Youtube size={24} />
              </a>
              <a href="https://www.facebook.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 p-4 rounded-full transition-all transform hover:scale-110 shadow-lg border border-white/20" 
                aria-label="Facebook">
                <Facebook size={24} />
              </a>
            </div>
          </div>
          
          {/* Scroll indicator for desktop */}
          <div className="hidden md:flex items-center text-white/70 text-sm">
            <span className="mr-2">Utforska mer</span>
            <button 
              onClick={scrollToRecipes}
              className="animate-bounce bg-white/20 backdrop-blur-sm h-10 w-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent hover:bg-white/30 will-change-transform"
              aria-label="Scrolla ner till recept"
            >
              <ChevronDown size={20} className="text-white" />
            </button>
          </div>
        </div>
        
        {/* Right side image section - simplified for performance */}
        <div className={`w-full lg:w-1/2 flex justify-center transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative max-w-sm lg:max-w-md xl:max-w-lg">
            {/* Main hero image with optimized loading */}
            <div className="rounded-full overflow-hidden h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 border-4 border-white/20 shadow-2xl relative mx-auto backdrop-blur-sm will-change-transform">
              <img 
                src="https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Mayka Gulo i köket med färska råvaror" 
                className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-105 will-change-transform"
                loading="eager"
                width="384"
                height="384"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile scroll indicator */}
      <div className="md:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={scrollToRecipes}
          className="animate-bounce bg-white/20 backdrop-blur-sm h-12 w-12 rounded-full flex items-center justify-center shadow-lg hover:bg-white/30 transition-all will-change-transform"
          aria-label="Scrolla ner för att utforska recept"
        >
          <ChevronDown size={24} className="text-white" />
        </button>
      </div>
    </header>
  );
};