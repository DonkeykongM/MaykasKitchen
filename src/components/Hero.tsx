import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Instagram, UtensilsCrossed, ArrowRight, Heart, Star, ChefHat, BookText as TikTok, Youtube, Facebook } from 'lucide-react';
import { SparklesCore } from './ui/sparkles';

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
      className="py-16 md:py-20 lg:py-24 overflow-hidden relative bg-light-bg w-full"
      aria-labelledby="hero-heading"
    >
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.2}
          maxSize={0.8}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#8A9A5B"
          speed={0.3}
        />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-[20%] right-[5%] w-16 h-16 md:w-24 md:h-24 bg-secondary-color rounded-full opacity-30 animate-float"></div>
      <div className="absolute bottom-[20%] left-[5%] w-12 h-12 md:w-16 md:h-16 bg-secondary-color rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute inset-0 bg-gradient-to-r from-beige-50/80 to-transparent"></div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center relative z-10 w-full max-w-7xl">
        <div className={`w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center bg-secondary-color text-accent-color px-3 md:px-4 py-1 rounded-full text-sm font-medium mb-4 animate-pulse">
            <span className="bg-primary-color w-2 h-2 rounded-full mr-2"></span>
            Assyrisk/syriansk matkonst
          </span>
          
          <h1 id="hero-heading" className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-color mb-4 leading-tight break-words">
            Mat från hjärtat <span className="block text-accent-color">& själen</span>
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl mb-4 text-brown-500 leading-relaxed break-words">
            Upptäck <mark className="bg-transparent text-primary-color font-semibold">enkla och smakrika recept</mark> med autentiska assyriska/syrianska rötter, anpassade för det moderna köket.
          </p>
          
          <p className="mb-6 md:mb-8 text-brown-400 break-words">Säsongsbaserad matlagning som skapar glädje runt bordet för hela familjen.</p>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6 md:mb-8">
            <a 
              href="#recept" 
              onClick={(e) => {
                e.preventDefault();
                scrollToRecipes();
              }}
              className="btn-primary flex items-center justify-center group text-center"
              aria-label="Utforska recept"
            >
              <UtensilsCrossed size={18} className="mr-2 transform transition-transform group-hover:rotate-12" />
              <span>Utforska recept</span>
            </a>
          </div>

          <div className="mb-6 md:mb-8">
            <h4 className="font-semibold mb-3 text-brown-700">Följ mig här:</h4>
            <div className="flex flex-wrap gap-3 md:gap-5">
              <a href="https://www.instagram.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                className="bg-beige-50 text-primary-color hover:bg-beige-100 p-3 rounded-full transition-colors transform hover:scale-110" 
                aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                className="bg-beige-50 text-primary-color hover:bg-beige-100 p-3 rounded-full transition-colors transform hover:scale-110" 
                aria-label="TikTok">
                <TikTok size={20} />
              </a>
              <a href="https://www.youtube.com/@Maykaskitchen" target="_blank" rel="noopener noreferrer" 
                className="bg-beige-50 text-primary-color hover:bg-beige-100 p-3 rounded-full transition-colors transform hover:scale-110" 
                aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href="https://www.facebook.com/maykaskitchen/" target="_blank" rel="noopener noreferrer" 
                className="bg-beige-50 text-primary-color hover:bg-beige-100 p-3 rounded-full transition-colors transform hover:scale-110" 
                aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Enhanced featured badges with animations */}
          <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
            <div 
              className="bg-white/90 backdrop-blur-sm py-2 px-3 md:px-4 rounded-full shadow-sm text-xs font-medium text-brown-500 flex items-center transform transition-all hover:scale-105 hover:shadow-md hover:bg-white"
              style={{ transitionDelay: '0.1s' }}
            >
              <span className="bg-gradient-to-r from-terracotta-400 to-terracotta-600 w-2 h-2 rounded-full mr-2"></span>
              <strong className="mr-1">125k+</strong> följare på Instagram
            </div>
            
            <div 
              className="bg-white/90 backdrop-blur-sm py-2 px-3 md:px-4 rounded-full shadow-sm text-xs font-medium text-brown-500 flex items-center transform transition-all hover:scale-105 hover:shadow-md hover:bg-white"
              style={{ transitionDelay: '0.2s' }}
            >
              <span className="bg-gradient-to-r from-olive-400 to-olive-600 w-2 h-2 rounded-full mr-2"></span>
              Säsongsbaserade recept
            </div>
            
            <div 
              className="bg-white/90 backdrop-blur-sm py-2 px-3 md:px-4 rounded-full shadow-sm text-xs font-medium text-brown-500 flex items-center transform transition-all hover:scale-105 hover:shadow-md hover:bg-white"
              style={{ transitionDelay: '0.3s' }}
            >
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 w-2 h-2 rounded-full mr-2"></span>
              Autentisk matlagning
            </div>
          </div>
          
          <div className="hidden md:flex items-center text-brown-400 text-sm">
            <span className="mr-2">Utforska mer</span>
            <button 
              onClick={scrollToRecipes}
              className="animate-bounce-subtle bg-white h-8 w-8 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
              aria-label="Scrolla ner till recept"
            >
              <ChevronDown size={18} className="text-primary-color" />
            </button>
          </div>
        </div>
        
        <div className={`w-full lg:w-1/2 flex justify-center transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative max-w-sm lg:max-w-md xl:max-w-lg">
            {/* Decorative elements */}
            <div 
              className="absolute -top-4 -right-4 bg-white p-2 md:p-3 rounded-full shadow-lg transform rotate-12 animate-pulse-subtle z-10"
              style={{ animationDelay: '0.5s' }}
            >
              <ChefHat size={20} className="text-primary-color md:w-6 md:h-6" />
            </div>
            
            <div className="absolute -bottom-3 -left-3 bg-white p-2 rounded-full shadow-lg transform -rotate-6 animate-pulse-subtle z-10" style={{ animationDelay: '1s' }}>
              <Heart size={16} className="text-primary-color md:w-5 md:h-5" />
            </div>
            
            <div className="absolute top-1/4 -right-4 md:-right-6 bg-white p-2 rounded-full shadow-lg animate-float z-10" style={{ animationDelay: '1.5s' }}>
              <Star size={14} className="text-primary-color md:w-4 md:h-4" />
            </div>
            
            {/* Main hero image with enhanced styling */}
            <div className="rounded-full overflow-hidden h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 border-4 border-white shadow-xl hover-zoom relative mx-auto">
              <img 
                src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCvA6O3yhwpAvKSmuXsEtqUGlWP80xMr5Ihgb4" 
                alt="Mayka Gulo i köket med färska råvaror" 
                className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-105"
                loading="eager" // Load hero image immediately
                width="384"
                height="384"
              />
              
              {/* Overlay effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </div>
            
            {/* Quote card with animation - hidden on small mobile */}
            <div 
              className="absolute -bottom-4 -left-4 bg-beige-50 p-4 md:p-6 rounded-lg shadow-md max-w-xs hidden sm:block transform transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: '0.8s' }}
            >
              <p className="text-xs md:text-sm text-brown-500 italic break-words">"Mat är kärlek, och att laga mat är att dela kärlek med andra."</p>
              <div className="flex items-center mt-2">
                <p className="text-xs font-semibold text-primary-color">Mayka Gulo</p>
                <a 
                  href="#om-mig" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('om-mig')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="ml-auto text-xs text-primary-color flex items-center group"
                >
                  Läs mer <ArrowRight size={12} className="ml-1 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator for mobile */}
      <div className="md:hidden flex justify-center mt-8">
        <button 
          onClick={scrollToRecipes}
          className="animate-bounce-subtle bg-white h-10 w-10 rounded-full flex items-center justify-center shadow-md"
          aria-label="Scrolla ner för att utforska recept"
        >
          <ChevronDown size={20} className="text-primary-color" />
        </button>
      </div>
    </header>
  );
};