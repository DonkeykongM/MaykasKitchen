import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Instagram, UtensilsCrossed, ArrowRight, Heart, Star, ChefHat, BookText as TikTok, Youtube, Facebook } from 'lucide-react';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Set up intersection observer for animation optimization
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
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

  const scrollToRecipes = () => {
    document.getElementById('recept')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header 
      ref={heroRef}
      id="hero"
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden w-full min-h-screen flex items-center hero-section"
      aria-labelledby="hero-heading"
    >
      {/* Enhanced Animated background with sparkle effects */}
      <div className="hero-animated-background"></div>
      
      {/* Enhanced floating elements with better positioning */}
      <div className="absolute top-[15%] right-[8%] w-12 h-12 md:w-16 md:h-16 bg-white/30 rounded-full animate-float z-10 backdrop-blur-sm shadow-lg"></div>
      <div className="absolute bottom-[20%] left-[5%] w-8 h-8 md:w-12 md:h-12 bg-white/25 rounded-full animate-float z-10 backdrop-blur-sm shadow-lg" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[30%] left-[12%] w-6 h-6 md:w-10 md:h-10 bg-white/35 rounded-full animate-float z-10 backdrop-blur-sm shadow-lg" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[35%] right-[15%] w-10 h-10 md:w-14 md:h-14 bg-white/20 rounded-full animate-float z-10 backdrop-blur-sm shadow-lg" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-[50%] right-[25%] w-4 h-4 md:w-8 md:h-8 bg-white/40 rounded-full animate-float z-10 backdrop-blur-sm shadow-lg" style={{ animationDelay: '4s' }}></div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center relative z-20 w-full max-w-7xl">
        <div className={`w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center bg-white/95 backdrop-blur-sm text-purple-700 px-3 md:px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-xl border border-white/30">
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 w-3 h-3 rounded-full mr-2 animate-pulse shadow-sm"></span>
            Assyrisk/syriansk matkonst
          </span>
          
          <h1 id="hero-heading" className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight break-words hero-text">
            Mat från hjärtat <span className="block text-yellow-200 text-shadow-lg">& själen</span>
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl mb-6 hero-text-secondary leading-relaxed break-words">
            Upptäck <mark className="bg-yellow-200/95 text-purple-900 font-bold px-2 py-1 rounded">enkla och smakrika recept</mark> med autentiska assyriska/syrianska rötter, anpassade för det moderna köket.
          </p>
          
          <p className="mb-8 md:mb-10 hero-text-muted break-words text-lg">Säsongsbaserad matlagning som skapar glädje runt bordet för hela familjen.</p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-8 md:mb-10">
            <a 
              href="#recept" 
              onClick={(e) => {
                e.preventDefault();
                scrollToRecipes();
              }}
              className="bg-white/95 backdrop-blur-sm text-purple-700 hover:bg-white hover:text-purple-800 transition-all duration-300 py-4 px-8 rounded-full font-bold flex items-center justify-center group text-center shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 border border-white/50"
              aria-label="Utforska recept"
            >
              <UtensilsCrossed size={20} className="mr-3 transform transition-transform group-hover:rotate-12" />
              <span>Utforska recept</span>
            </a>
          </div>

          <div className="mb-8 md:mb-10">
            <h4 className="font-semibold mb-4 hero-text-secondary text-lg">Följ mig här:</h4>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <a href="https://www.instagram.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                className="bg-white/25 backdrop-blur-sm text-white hover:bg-white/35 p-4 rounded-full transition-all transform hover:scale-110 shadow-xl border border-white/30" 
                aria-label="Instagram">
                <Instagram size={22} />
              </a>
              <a href="https://www.tiktok.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                className="bg-white/25 backdrop-blur-sm text-white hover:bg-white/35 p-4 rounded-full transition-all transform hover:scale-110 shadow-xl border border-white/30" 
                aria-label="TikTok">
                <TikTok size={22} />
              </a>
              <a href="https://www.youtube.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                className="bg-white/25 backdrop-blur-sm text-white hover:bg-white/35 p-4 rounded-full transition-all transform hover:scale-110 shadow-xl border border-white/30" 
                aria-label="YouTube">
                <Youtube size={22} />
              </a>
              <a href="https://www.facebook.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                className="bg-white/25 backdrop-blur-sm text-white hover:bg-white/35 p-4 rounded-full transition-all transform hover:scale-110 shadow-xl border border-white/30" 
                aria-label="Facebook">
                <Facebook size={22} />
              </a>
            </div>
          </div>
          
          {/* Enhanced featured badges with better animations */}
          <div className="flex flex-wrap gap-4 md:gap-6 mb-8 md:mb-10">
            <div 
              className="bg-white/90 backdrop-blur-sm py-3 px-4 md:px-6 rounded-full shadow-xl text-sm font-semibold text-purple-700 flex items-center transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-white border border-white/40"
              style={{ transitionDelay: '0.1s' }}
            >
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 w-3 h-3 rounded-full mr-3 animate-pulse shadow-sm"></span>
              <strong className="mr-1">125k+</strong> följare på Instagram
            </div>
            
            <div 
              className="bg-white/90 backdrop-blur-sm py-3 px-4 md:px-6 rounded-full shadow-xl text-sm font-semibold text-purple-700 flex items-center transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-white border border-white/40"
              style={{ transitionDelay: '0.2s' }}
            >
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 w-3 h-3 rounded-full mr-3 animate-pulse shadow-sm"></span>
              Säsongsbaserade recept
            </div>
            
            <div 
              className="bg-white/90 backdrop-blur-sm py-3 px-4 md:px-6 rounded-full shadow-xl text-sm font-semibold text-purple-700 flex items-center transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-white border border-white/40"
              style={{ transitionDelay: '0.3s' }}
            >
              <span className="bg-gradient-to-r from-purple-600 to-blue-400 w-3 h-3 rounded-full mr-3 animate-pulse shadow-sm"></span>
              Autentisk matlagning
            </div>
          </div>
          
          <div className="hidden md:flex items-center hero-text-muted text-base">
            <span className="mr-3">Utforska mer</span>
            <button 
              onClick={scrollToRecipes}
              className="animate-bounce bg-white/25 backdrop-blur-sm h-10 w-10 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all focus:outline-none focus:ring-3 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-transparent hover:bg-white/35 border border-white/30"
              aria-label="Scrolla ner till recept"
            >
              <ChevronDown size={20} className="text-white" />
            </button>
          </div>
        </div>
        
        <div className={`w-full lg:w-1/2 flex justify-center transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative max-w-sm lg:max-w-md xl:max-w-lg">
            {/* Enhanced decorative elements */}
            <div 
              className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-full shadow-2xl transform rotate-12 animate-pulse z-10 border border-white/40"
              style={{ animationDelay: '0.5s' }}
            >
              <ChefHat size={24} className="text-purple-600 md:w-7 md:h-7" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-2xl transform -rotate-6 animate-pulse z-10 border border-white/40" style={{ animationDelay: '1s' }}>
              <Heart size={18} className="text-purple-600 md:w-6 md:h-6" />
            </div>
            
            <div className="absolute top-1/4 -right-6 md:-right-8 bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-2xl animate-float z-10 border border-white/40" style={{ animationDelay: '1.5s' }}>
              <Star size={16} className="text-purple-600 md:w-5 md:h-5" />
            </div>
            
            {/* Main hero image with enhanced styling */}
            <div className="rounded-full overflow-hidden h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 border-4 border-white/60 shadow-2xl hover-zoom relative mx-auto backdrop-blur-sm">
              <img 
                src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCvA6O3yhwpAvKSmuXsEtqUGlWP80xMr5Ihgb4" 
                alt="Mayka Gulo i köket med färska råvaror" 
                className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-105"
                loading="eager"
                width="384"
                height="384"
              />
              
              {/* Enhanced overlay effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-900/30 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </div>
            
            {/* Enhanced quote card */}
            <div 
              className="absolute -bottom-6 -left-6 bg-white/98 backdrop-blur-sm p-5 md:p-7 rounded-xl shadow-2xl max-w-xs hidden sm:block transform transition-all duration-500 hover:-translate-y-2 hover:shadow-3xl border border-white/50"
              style={{ animationDelay: '0.8s' }}
            >
              <p className="text-sm md:text-base text-purple-700 italic break-words font-medium">"Mat är kärlek, och att laga mat är att dela kärlek med andra."</p>
              <div className="flex items-center mt-3">
                <p className="text-sm font-bold text-purple-800">Mayka Gulo</p>
                <a 
                  href="#om-mig" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('om-mig')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="ml-auto text-sm text-purple-600 flex items-center group hover:text-purple-800 transition-colors font-semibold"
                >
                  Läs mer <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator for mobile */}
      <div className="md:hidden absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <button 
          onClick={scrollToRecipes}
          className="animate-bounce bg-white/25 backdrop-blur-sm h-12 w-12 rounded-full flex items-center justify-center shadow-xl hover:bg-white/35 transition-all border border-white/30"
          aria-label="Scrolla ner för att utforska recept"
        >
          <ChevronDown size={24} className="text-white" />
        </button>
      </div>
    </header>
  );
};