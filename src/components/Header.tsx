import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Salad } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'hem' || sectionId === '') {
      // Reset hash and scroll to top
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMenuOpen(false);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 90;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Update hash after successful scroll
      window.history.pushState(null, '', `#${sectionId}`);
    }
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

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
            className="flex items-center space-x-2 md:space-x-3 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg p-2 min-h-[44px] transform hover:scale-105 transition-all duration-300"
            aria-label="Gå till startsidan"
          >
            <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 p-2 md:p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
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
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`relative font-medium transition-all duration-300 py-2 px-3 min-h-[44px] group rounded-lg ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' 
                    : 'text-white/90 hover:text-white'
                }`}
                aria-label={`Navigera till ${item.label}`}
              >
                <span className="relative z-10">{item.label}</span>
                <div className={`absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                  !isScrolled ? 'from-white to-white' : ''
                }`} />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center hover:scale-110 ${
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
          <div className="lg:hidden py-4 bg-white/98 backdrop-blur-lg rounded-b-xl shadow-xl border border-purple-100 mt-2 animate-fade-in-down">
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 font-medium rounded-lg mx-2 min-h-[44px] transform hover:translate-x-1"
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