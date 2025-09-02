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
            <span className="text-base md:text-lg lg:text-xl font-bold text-purple-600 tracking-tight truncate transition-colors group-hover:text-purple-700 font-serif">
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
              className="text-gray-700 hover:text-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded-full p-2 relative group min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={`Sök (${navigator.platform.includes('Mac') ? 'Cmd' : 'Ctrl'} + K)`}
              aria-expanded={isSearchOpen}
              title={`Sök (${navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'} + K)`}
            >
              <Search size={16} />
              <span className="sr-only">Sök</span>
            </button>
            
            <a 
              href="#kontakt" 
              onClick={(e) => handleNavLinkClick(e, 'kontakt')}
              className="btn-primary transform hover:scale-105 transition-all duration-300 whitespace-nowrap focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 text-sm lg:text-base px-4 py-2"
            >
              Kontakt
            </a>
          </nav>
          
          <div className="lg:hidden flex items-center space-x-2">
            <button 
              onClick={toggleSearch} 
              className="text-gray-700 hover:text-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded-full p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Sök"
              aria-expanded={isSearchOpen}
            >
              <Search size={18} />
            </button>
            <button 
              onClick={toggleMenu} 
              className="text-gray-700 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded-full p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isMenuOpen ? "Stäng meny" : "Öppna meny"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Panel */}
      <div 
        className={`bg-white border-t border-purple-100 shadow-lg py-3 md:py-4 transform transition-all duration-300 ease-in-out ${
          isSearchOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        } absolute left-0 right-0 top-full z-20 w-full`}
        aria-hidden={!isSearchOpen}
        role="search"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <form onSubmit={handleSearchSubmit} className="relative">
            <label htmlFor="search-input" className="sr-only">
              Sök efter recept, ingredienser eller tekniker
            </label>
            <input
              id="search-input"
              ref={searchInputRef}
              type="text"
              placeholder="Sök efter recept, ingredienser eller tekniker..."
              className="w-full px-3 md:px-4 py-2 md:py-3 pl-10 md:pl-12 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 pr-8 md:pr-10 text-sm md:text-base min-h-[44px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={16} aria-hidden="true" />
            <button
              type="button"
              className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded-full p-1 min-w-[32px] min-h-[32px] flex items-center justify-center"
              aria-label="Stäng sökning"
              onClick={toggleSearch}
            >
              <X size={16} />
            </button>
          </form>
          
          <div className="mt-3 md:mt-4">
            <p className="text-xs md:text-sm text-gray-600 mb-2">Populära sökningar:</p>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {popularSearches.map((search) => (
                <button 
                  key={search}
                  onClick={() => setSearchTerm(search)} 
                  className="text-xs bg-purple-50 text-purple-700 px-2 md:px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-1 min-h-[32px]"
                  type="button"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <nav 
        className={`lg:hidden bg-white border-t border-purple-100 shadow-lg overflow-hidden transition-all duration-300 ease-in-out w-full ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
        role="navigation"
        aria-label="Mobil navigation"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-2 max-w-7xl">
          <a 
            href="#om-mig" 
            onClick={(e) => handleNavLinkClick(e, 'om-mig')}
            className={`text-gray-700 hover:text-purple-600 font-medium py-3 border-b border-purple-50 flex items-center transition-colors min-h-[44px] ${
              activeSection === 'om-mig' ? 'text-purple-600' : ''
            }`}
            aria-current={activeSection === 'om-mig' ? 'page' : undefined}
          >
            Om mig
          </a>
          <a 
            href="#recept" 
            onClick={(e) => handleNavLinkClick(e, 'recept')}
            className={`text-gray-700 hover:text-purple-600 font-medium py-3 border-b border-purple-50 flex items-center transition-colors min-h-[44px] ${
              activeSection === 'recept' ? 'text-purple-600' : ''
            }`}
            aria-current={activeSection === 'recept' ? 'page' : undefined}
          >
            Recept
          </a>
          <a 
            href="#samarbeten" 
            onClick={(e) => handleNavLinkClick(e, 'samarbeten')}
            className={`text-gray-700 hover:text-purple-600 font-medium py-3 border-b border-purple-50 flex items-center transition-colors min-h-[44px] ${
              activeSection === 'samarbeten' ? 'text-purple-600' : ''
            }`}
            aria-current={activeSection === 'samarbeten' ? 'page' : undefined}
          >
            Samarbeten
          </a>
          <a 
            href="https://www.instagram.com/maykaskitchen/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-purple-600 font-medium py-3 border-b border-purple-50 flex items-center transition-colors min-h-[44px]"
            aria-label="Besök min Instagram (öppnas i nytt fönster)"
          >
            <Instagram size={18} className="mr-2" aria-hidden="true" /> 
            Instagram
          </a>
          <a 
            href="#kontakt" 
            onClick={(e) => handleNavLinkClick(e, 'kontakt')}
            className="bg-purple-600 text-white py-3 px-6 rounded-lg text-center hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 font-medium min-h-[44px] flex items-center justify-center mt-4"
          >
            Kontakt
          </a>
        </div>
      </nav>
    </header>
  );
};