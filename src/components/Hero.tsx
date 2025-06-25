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
            // Keep animations running when in viewport
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
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden w-full min-h-screen flex items-center bg-beige-50"
      aria-labelledby="hero-heading"
    >
      {/* Contact section background styling applied to hero */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-color rounded-full opacity-10 transform translate-x-1/3 -translate-y-1/3 z-0"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-color rounded-full opacity-10 transform -translate-x-1/3 translate-y-1/3 z-0"></div>
      
      {/* Floating elements with purple theme */}
      <div className="absolute top-[20%] right-[10%] w-12 h-12 md:w-16 md:h-16 bg-primary-color/20 rounded-full animate-float"></div>
      <div className="absolute bottom-[25%] left-[8%] w-8 h-8 md:w-12 md:h-12 bg-purple-300/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[35%] left-[15%] w-6 h-6 md:w-10 md:h-10 bg-indigo-300/25 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center relative z-10 w-full max-w-7xl">
        <div className={`w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-purple-700 px-3 md:px-4 py-1 rounded-full text-sm font-medium mb-4 shadow-lg">
            <span className="bg-purple-600 w-2 h-2 rounded-full mr-2 animate-pulse"></span>
            Assyrisk/syriansk matkonst
          </span>
          
          <h1 id="hero-heading" className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-color mb-4 leading-tight break-words">
            Mat från hjärtat <span className="block text-secondary-color">& själen</span>
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl mb-4 text-text-color leading-relaxed break-words">
            Upptäck <mark className="bg-purple-200/90 text-purple-800 font-semibold px-1 rounded">enkla och smakrika recept</mark> med autentiska assyriska/syrianska rötter, anpassade för det moderna köket.
          </p>
          
          <p className="mb-6 md:mb-8 text-text-secondary break-words">Säsongsbaserad matlagning som skapar glädje runt bordet för hela familjen.</p>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6 md:mb-8">
            <a 
              href="#recept" 
              onClick={(e) => {
                e.preventDefault();
                scrollToRecipes();
              }}
              className="bg-primary-color text-white hover:bg-accent-color transition-all duration-300 py-3 px-6 rounded-full font-semibold flex items-center justify-center group text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              aria-label="Utforska recept"
            >
              <UtensilsCrossed size={18} className="mr-2 transform transition-transform group-hover:rotate-12" />
              <span>Utforska recept</span>
            </a>
          </div>

          <div className="mb-6 md:mb-8">
            <h4 className="font-semibold mb-3 text-text-color">Följ mig här:</h4>
            <div className="flex flex-wrap gap-3 md:gap-5">
              <a href="https://www.instagram.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                className="bg-purple-50 text-purple-600 hover:bg-purple-100 p-3 rounded-full transition-colors transform hover:scale-110 shadow-lg border border-purple-200" 
                aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                className="bg-purple-50 text-purple-600 hover:bg-purple-100 p-3 rounded-full transition-colors transform hover:scale-110 shadow-lg border border-purple-200" 
                aria-label="TikTok">
                <TikTok size={20} />
              </a>
              <a href="https://www.youtube.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                className="bg-purple-50 text-purple-600 hover:bg-purple-100 p-3 rounded-full transition-colors transform hover:scale-110 shadow-lg border border-purple-200" 
                aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href="https://www.facebook.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                className="bg-purple-50 text-purple-600 hover:bg-purple-100 p-3 rounded-full transition-colors transform hover:scale-110 shadow-lg border border-purple-200" 
                aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Enhanced featured badges with animations */}
          <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
            <div 
              className="bg-white/80 backdrop-blur-sm py-2 px-3 md:px-4 rounded-full shadow-lg text-xs font-medium text-purple-700 flex items-center transform transition-all hover:scale-105 hover:shadow-xl hover:bg-white/90"
              style={{ transitionDelay: '0.1s' }}
            >
              <span className="bg-gradient-to-r from-purple-500 to-indigo-500 w-2 h-2 rounded-full mr-2 animate-pulse"></span>
              <strong className="mr-1">125k+</strong> följare på Instagram
            </div>
            
            <div 
              className="bg-white/80 backdrop-blur-sm py-2 px-3 md:px-4 rounded-full shadow-lg text-xs font-medium text-purple-700 flex items-center transform transition-all hover:scale-105 hover:shadow-xl hover:bg-white/90"
              style={{ transitionDelay: '0.2s' }}
            >
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 w-2 h-2 rounded-full mr-2 animate-pulse"></span>
              Säsongsbaserade recept
            </div>
            
            <div 
              className="bg-white/80 backdrop-blur-sm py-2 px-3 md:px-4 rounded-full shadow-lg text-xs font-medium text-purple-700 flex items-center transform transition-all hover:scale-105 hover:shadow-xl hover:bg-white/90"
              style={{ transitionDelay: '0.3s' }}
            >
              <span className="bg-gradient-to-r from-purple-600 to-indigo-400 w-2 h-2 rounded-full mr-2 animate-pulse"></span>
              Autentisk matlagning
            </div>
          </div>
          
          <div className="hidden md:flex items-center text-text-secondary text-sm">
            <span className="mr-2">Utforska mer</span>
            <button 
              onClick={scrollToRecipes}
              className="animate-bounce bg-primary-color/20 backdrop-blur-sm h-8 w-8 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary-color/50 focus:ring-offset-2 focus:ring-offset-transparent hover:bg-primary-color/30"
              aria-label="Scrolla ner till recept"
            >
              <ChevronDown size={18} className="text-primary-color" />
            </button>
          </div>
        </div>
        
        <div className={`w-full lg:w-1/2 flex justify-center transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative max-w-sm lg:max-w-md xl:max-w-lg">
            {/* Decorative elements with updated colors */}
            <div 
              className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-xl transform rotate-12 animate-pulse z-10"
              style={{ animationDelay: '0.5s' }}
            >
              <ChefHat size={20} className="text-purple-600 md:w-6 md:h-6" />
            </div>
            
            <div className="absolute -bottom-3 -left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-xl transform -rotate-6 animate-pulse z-10" style={{ animationDelay: '1s' }}>
              <Heart size={16} className="text-purple-600 md:w-5 md:h-5" />
            </div>
            
            <div className="absolute top-1/4 -right-4 md:-right-6 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-xl animate-float z-10" style={{ animationDelay: '1.5s' }}>
              <Star size={14} className="text-purple-600 md:w-4 md:h-4" />
            </div>
            
            {/* Main hero image with enhanced styling */}
            <div className="rounded-full overflow-hidden h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 border-4 border-white/50 shadow-2xl hover-zoom relative mx-auto backdrop-blur-sm">
              <img 
                src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCvA6O3yhwpAvKSmuXsEtqUGlWP80xMr5Ihgb4" 
                alt="Mayka Gulo i köket med färska råvaror" 
                className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-105"
                loading="eager"
                width="384"
                height="384"
              />
              
              {/* Overlay effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </div>
            
            {/* Quote card with animation - updated styling */}
            <div 
              className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-xl max-w-xs hidden sm:block transform transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl border border-purple-100"
              style={{ animationDelay: '0.8s' }}
            >
              <p className="text-xs md:text-sm text-purple-700 italic break-words">"Mat är kärlek, och att laga mat är att dela kärlek med andra."</p>
              <div className="flex items-center mt-2">
                <p className="text-xs font-semibold text-purple-800">Mayka Gulo</p>
                <a 
                  href="#om-mig" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('om-mig')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="ml-auto text-xs text-purple-600 flex items-center group hover:text-purple-800 transition-colors"
                >
                  Läs mer <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator for mobile */}
      <div className="md:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={scrollToRecipes}
          className="animate-bounce bg-primary-color/20 backdrop-blur-sm h-10 w-10 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-color/30 transition-all"
          aria-label="Scrolla ner för att utforska recept"
        >
          <ChevronDown size={20} className="text-primary-color" />
        </button>
      </div>
    </header>
  );
};