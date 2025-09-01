import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Search, Instagram, Salad } from 'lucide-react';
import { useOptimizedScroll } from '../hooks/useOptimizedScroll';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Optimized scroll handler with throttling
  const handleScrollOptimized = useCallback((scrollY: number) => {
    setIsScrolled(scrollY > 60);
    
    const sections = ['om-mig', 'recept', 'samarbeten', 'kontakt'];
    const currentSection = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom > 120;
      }
      return false;
    });
    
    if (currentSection && currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  }, [activeSection]);

  useOptimizedScroll(handleScrollOptimized);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
        if (isMenuOpen) setIsMenuOpen(false);
      }
      
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, isMenuOpen]);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const toggleSearch = useCallback(() => setIsSearchOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleNavLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const element = document.getElementById(id);
    if (element) {
      closeMenu();
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', `#${id}`);
      setActiveSection(id);
    }
  }, [closeMenu]);

  const handleHomeClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('');
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (searchTerm.trim()) {
      localStorage.setItem('lastSearch', searchTerm.trim());
      window.location.hash = 'recept/alla';
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  }, [searchTerm]);

  const popularSearches = ['Fisk', 'Vegetariskt', 'Snabba recept', 'Dessert', 'Assyriskt'];

  return (
    <header 
      className={`fixed top-0 z-50 transition-all duration-300 w-full ${
        isScrolled 
          ? 'py-2 shadow-lg bg-white/95 backdrop-blur-md border-b border-purple-200' 
          : 'py-3 md:py-4 bg-white shadow-sm'
      }`}
      role="banner"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}
    >
      <a href="#main-content" className="skip-to-content">
        Hoppa till huvudinnehåll
      </a>
      
      <div className="container mx-auto px-4 w-full max-w-7xl">
        <div className="flex justify-between items-center w-full">
          <a 
            href="#" 
            onClick={handleHomeClick}
            className="flex items-center group min-w-0 flex-shrink-0"
            aria-label="MaykasKitchen, gå till startsidan"
          >
            <div className="relative mr-2 md:mr-3 flex items-center justify-center bg-purple-100 w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-300 group-hover:bg-purple-200 group-hover:scale-110 flex-shrink-0">
              <Salad className="w-4 h-4 md:w-6 md:h-6 text-purple-600 transition-colors" />
            </div>
            <span className="text-lg md:text-xl lg:text-2xl font-bold text-purple-600 tracking-tight truncate transition-colors group-hover:text-purple-700 font-serif">
              MaykasKitchen
            </span>
          </a>
          
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6" role="navigation" aria-label="Huvudnavigation">
            <a 
              href="#om-mig" 
              onClick={(e) => handleNavLinkClick(e, 'om-mig')}
              className={`nav-link text-gray-700 hover:text-purple-600 transition-colors whitespace-nowrap text-sm lg:text-base ${
                activeSection === 'om-mig' ? 'text-purple-600 active' : ''
              }`}
              aria-current={activeSection === 'om-mig' ? 'page' : undefined}
            >
              Om mig
            </a>
            <a 
              href="#recept" 
              onClick={(e) => handleNavLinkClick(e, 'recept')}
              className={`nav-link text-gray-700 hover:text-purple-600 transition-colors whitespace-nowrap text-sm lg:text-base ${
                activeSection === 'recept' ? 'text-purple-600 active' : ''
              }`}
              aria-current={activeSection === 'recept' ? 'page' : undefined}
            >
              Recept
            </a>
            <a 
              href="#samarbeten" 
              onClick={(e) => handleNavLinkClick(e, 'samarbeten')}
              className={`nav-link text-gray-700 hover:text-purple-600 transition-colors whitespace-nowrap text-sm lg:text-base ${
                activeSection === 'samarbeten' ? 'text-purple-600 active' : ''
              }`}
              aria-current={activeSection === 'samarbeten' ? 'page' : undefined}
            >
              Samarbeten
            </a>
            <a 
              href="https://www.instagram.com/maykaskitchen/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link text-gray-700 hover:text-purple-600 transition-colors flex items-center whitespace-nowrap text-sm lg:text-base"
              aria-label="Besök min Instagram (öppnas i nytt fönster)"
            >
              <Instagram size={14} className="mr-1" aria-hidden="true" /> 
              Instagram
            </a>
            
            <button 
              onClick={toggleSearch} 
              className="text-gray-700 hover:text-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded-full p-2 relative"
            >
              <Search size={18} />
            </button>
}
  )
}