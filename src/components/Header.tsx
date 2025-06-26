import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Search, Instagram, Salad } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
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

  useEffect(() => {
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const toggleSearch = useCallback(() => setIsSearchOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleNavLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      closeMenu();
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
      setActiveSection(id);
    }
  }, [closeMenu]);

  const handleHomeClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('');
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      localStorage.setItem('lastSearch', searchTerm.trim());
      window.location.hash = 'recept/alla';
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  }, [searchTerm]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled 
          ? 'py-2 shadow-lg bg-white/95 backdrop-blur-md border-b border-gray-200' 
          : 'py-4 bg-white shadow-sm'
      }`}
      role="banner"
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
            <div className="relative mr-2 md:mr-3 flex items-center justify-center bg-primary-color/10 w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-300 group-hover:bg-primary-color/20 group-hover:scale-110 flex-shrink-0">
              <Salad className="w-4 h-4 md:w-6 md:h-6 text-primary-color transition-colors group-hover:text-primary-color" />
            </div>
            <span className="text-lg md:text-2xl font-bold text-primary-color tracking-tight truncate transition-colors group-hover:text-accent-color">
              MaykasKitchen
            </span>
          </a>
          
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" role="navigation">
            <a 
              href="#om-mig" 
              onClick={(e) => handleNavLinkClick(e, 'om-mig')}
              className={`nav-link text-brown-500 hover:text-primary-color transition-colors ${
                activeSection === 'om-mig' ? 'text-primary-color active' : ''
              }`}
            >
              Om mig
            </a>
            <a 
              href="#recept" 
              onClick={(e) => handleNavLinkClick(e, 'recept')}
              className={`nav-link text-brown-500 hover:text-primary-color transition-colors ${
                activeSection === 'recept' ? 'text-primary-color active' : ''
              }`}
            >
              Recept
            </a>
            <a 
              href="#samarbeten" 
              onClick={(e) => handleNavLinkClick(e, 'samarbeten')}
              className={`nav-link text-brown-500 hover:text-primary-color transition-colors ${
                activeSection === 'samarbeten' ? 'text-primary-color active' : ''
              }`}
            >
              Samarbeten
            </a>
            <a 
              href="https://www.instagram.com/maykaskitchen/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link text-brown-500 hover:text-primary-color transition-colors flex items-center"
            >
              <Instagram size={16} className="mr-1" /> 
              Instagram
            </a>
            
            <button 
              onClick={toggleSearch} 
              className="text-brown-500 hover:text-primary-color transition-colors focus:outline-none p-2"
              aria-expanded={isSearchOpen}
            >
              <Search size={18} />
            </button>
            
            <a 
              href="#kontakt" 
              onClick={(e) => handleNavLinkClick(e, 'kontakt')}
              className="btn-primary transform hover:scale-105 transition-all duration-300"
            >
              Kontakt
            </a>
          </nav>
          
          <div className="lg:hidden flex items-center space-x-3">
            <button 
              onClick={toggleSearch} 
              className="text-brown-500 hover:text-primary-color transition-colors p-1"
              aria-expanded={isSearchOpen}
            >
              <Search size={18} />
            </button>
            <button 
              onClick={toggleMenu} 
              className="text-brown-500 hover:text-primary-color p-1"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Panel */}
      <div 
        className={`bg-white border-t border-gray-100 shadow-lg py-4 transform transition-all duration-300 ease-in-out ${
          isSearchOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        } absolute left-0 right-0 top-full z-20 w-full`}
        role="search"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Sök efter recept..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-color p-1"
              onClick={toggleSearch}
            >
              <X size={20} />
            </button>
          </form>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <nav 
        className={`lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden transition-all duration-300 ease-in-out w-full ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        role="navigation"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4 max-w-7xl">
          <a 
            href="#om-mig" 
            onClick={(e) => handleNavLinkClick(e, 'om-mig')}
            className="text-brown-500 hover:text-primary-color font-medium py-3 border-b border-gray-50"
          >
            Om mig
          </a>
          <a 
            href="#recept" 
            onClick={(e) => handleNavLinkClick(e, 'recept')}
            className="text-brown-500 hover:text-primary-color font-medium py-3 border-b border-gray-50"
          >
            Recept
          </a>
          <a 
            href="#samarbeten" 
            onClick={(e) => handleNavLinkClick(e, 'samarbeten')}
            className="text-brown-500 hover:text-primary-color font-medium py-3 border-b border-gray-50"
          >
            Samarbeten
          </a>
          <a 
            href="https://www.instagram.com/maykaskitchen/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brown-500 hover:text-primary-color font-medium py-3 border-b border-gray-50 flex items-center"
          >
            <Instagram size={18} className="mr-2" /> 
            Instagram
          </a>
          <a 
            href="#kontakt" 
            onClick={(e) => handleNavLinkClick(e, 'kontakt')}
            className="bg-primary-color text-white py-3 px-6 rounded-lg text-center hover:bg-accent-color transition-colors font-medium"
          >
            Kontakt
          </a>
        </div>
      </nav>
    </header>
  );
};