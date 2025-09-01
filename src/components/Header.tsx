import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, Instagram, Salad } from "lucide-react";
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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hem')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Salad className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Mayka's Kitchen
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { id: 'hem', label: 'Hem' },
              { id: 'recept', label: 'Recept' },
              { id: 'om', label: 'Om Mig' },
              { id: 'blogg', label: 'Blogg' },
              { id: 'kontakt', label: 'Kontakt' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 group"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200">
              <Search className="h-5 w-5" />
            </button>
            <a 
              href="https://instagram.com/maykas_kitchen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Instagram className="h-4 w-4" />
              <span className="font-medium">Följ oss</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 space-y-2 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-lg">
            {[
              { id: 'hem', label: 'Hem' },
              { id: 'recept', label: 'Recept' },
              { id: 'om', label: 'Om Mig' },
              { id: 'blogg', label: 'Blogg' },
              { id: 'kontakt', label: 'Kontakt' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-6 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
            <div className="px-6 py-3 border-t border-gray-200">
              <a 
                href="https://instagram.com/maykas_kitchen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-3 rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg"
              >
                <Instagram className="h-4 w-4" />
                <span className="font-medium">Följ oss på Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};