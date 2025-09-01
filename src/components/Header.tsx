import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChefHat } from "lucide-react";
import { useOptimizedScroll } from "../hooks/useOptimizedScroll";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const { scrollY } = useOptimizedScroll();

  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'hem') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMenuOpen(false);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, []);

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-purple-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo - Förbättrad design */}
          <button 
            onClick={() => scrollToSection('hem')}
            className="flex items-center space-x-3 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg p-2 min-h-[44px]"
            aria-label="Gå till startsidan"
          >
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
              <ChefHat className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
            </div>
            <span className={`text-xl lg:text-2xl font-bold font-serif bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-300 ${
              isScrolled ? 'opacity-100' : 'text-white'
            }`}>
              MaykasKitchen
            </span>
          </button>

          {/* Desktop Navigation - Förbättrad design */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { id: 'hem', label: 'Hem' },
              { id: 'recept', label: 'Recept' },
              { id: 'om-mig', label: 'Om mig' },
              { id: 'min-blogg', label: 'Blogg' },
              { id: 'samarbeten', label: 'Samarbeten' },
              { id: 'kontakt', label: 'Kontakt' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group min-h-[44px] ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                aria-label={`Navigera till ${item.label}`}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button - Förbättrad design */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isScrolled 
                ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' 
                : 'text-white hover:bg-white/10'
            }`}
            aria-label={isMenuOpen ? 'Stäng meny' : 'Öppna meny'}
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              {isMenuOpen ? (
                <X size={24} className="transition-transform duration-300" />
              ) : (
                <Menu size={24} className="transition-transform duration-300" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Menu - Förbättrad design */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-1 bg-white/98 backdrop-blur-lg rounded-b-2xl shadow-2xl border border-purple-100 mt-2">
            {[
              { id: 'hem', label: 'Hem' },
              { id: 'recept', label: 'Recept' },
              { id: 'om-mig', label: 'Om mig' },
              { id: 'min-blogg', label: 'Blogg' },
              { id: 'samarbeten', label: 'Samarbeten' },
              { id: 'kontakt', label: 'Kontakt' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-6 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium rounded-lg mx-2 min-h-[44px]"
                aria-label={`Navigera till ${item.label}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};