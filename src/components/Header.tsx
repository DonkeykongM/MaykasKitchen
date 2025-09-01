import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Salad } from "lucide-react";
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

  const navigationItems = [
    { id: 'hem', label: 'Hem' },
    { id: 'recept', label: 'Recept' },
    { id: 'om-mig', label: 'Om mig' },
    { id: 'samarbeten', label: 'Samarbeten' },
    { id: 'kontakt', label: 'Kontakt' }
  ];

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-purple-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo med saladsskål */}
          <button 
            onClick={() => scrollToSection('hem')}
            className="flex items-center space-x-3 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg p-2 min-h-[44px]"
            aria-label="Gå till startsidan"
          >
            <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Salad className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
            </div>
            <span className={`text-xl lg:text-2xl font-bold font-serif transition-all duration-300 ${
              isScrolled ? 'text-purple-600' : 'text-white'
            }`}>
              MaykasKitchen
            </span>
          </button>

          {/* Desktop Navigation - Förenklad och tydligare */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative font-medium transition-all duration-200 py-2 px-1 min-h-[44px] group ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-purple-600' 
                    : 'text-white/90 hover:text-white'
                }`}
                aria-label={`Navigera till ${item.label}`}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
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
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Förenklad */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 bg-white/98 backdrop-blur-lg rounded-b-xl shadow-xl border border-purple-100 mt-2">
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium rounded-lg mx-2 min-h-[44px]"
                  aria-label={`Navigera till ${item.label}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};