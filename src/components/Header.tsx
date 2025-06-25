import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Search, Instagram, Salad } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    
    // Update header appearance
    setIsScrolled(scrollY > 60);
    
    // Determine active section
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

  // Throttled scroll listener
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

  // Auto-focus search input
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Enhanced keyboard navigation
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

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, isMenuOpen]);

  // Optimized navigation handlers
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
      
      // Update URL without triggering page reload
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
      // Save search term and navigate to recipes
      localStorage.setItem('lastSearch', searchTerm.trim());
      window.location.hash = 'recept/alla';
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  }, [searchTerm]);

  const popularSearches = ['Fisk', 'Vegetariskt', 'Snabba recept', 'Dessert', 'Assyriskt'];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled 
          ? 'py-2 shadow-lg bg-white/95 backdrop-blur-md border-b border-gray-200' 
          : 'py-4 bg-white shadow-sm'
      }`}
      role="banner"
    >
      {/* Skip to main content link */}
      <a href="#main-content" className="skip-to-content">
        Hoppa till huvudinnehåll
      </a>
      
      <div className="container mx-auto px-4 w-full max-w-7xl">
        <div className="flex justify-between items-center w-full">
          {/* Logo/Brand */}
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
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" role="navigation" aria-label="Huvudnavigation">
            <a 
              href="#om-mig" 
              onClick={(e) => handleNavLinkClick(e, 'om-mig')}
              className={`nav-link text-brown-500 hover:text-primary-color transition-colors whitespace-nowrap ${
                activeSection === 'om-mig' ? 'text-primary-color active' : ''
              }`}
              aria-current={activeSection === 'om-mig' ? 'page' : undefined}
            >
              Om mig
            </a>
            <a 
              href="#recept" 
              onClick={(e) => handleNavLinkClick(e, 'recept')}
              className={`nav-link text-brown-500 hover:text-primary-color transition-colors whitespace-nowrap ${
                activeSection === 'recept' ? 'text-primary-color active' : ''
              }`}
              aria-current={activeSection === 'recept' ? 'page' : undefined}
            >
              Recept
            </a>
            <a 
              href="#samarbeten" 
              onClick={(e) => handleNavLinkClick(e, 'samarbeten')}
              className={`nav-link text-brown-500 hover:text-primary-color transition-colors whitespace-nowrap ${
                activeSection === 'samarbeten' ? 'text-primary-color active' : ''
              }`}
              aria-current={activeSection === 'samarbeten' ? 'page' : undefined}
            >
              Samarbeten
            </a>
            <a 
              href="https://www.instagram.com/maykaskitchen/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link text-brown-500 hover:text-primary-color transition-colors flex items-center whitespace-nowrap"
              aria-label="Besök min Instagram (öppnas i nytt fönster)"
            >
              <Instagram size={16} className="mr-1" aria-hidden="true" /> 
              Instagram
            </a>
            
            {/* Search button with keyboard shortcut hint */}
            <button 
              onClick={toggleSearch} 
              className="text-brown-500 hover:text-primary-color transition-colors focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 rounded-full p-2 relative group"
              aria-label={`Sök (${navigator.platform.includes('Mac') ? 'Cmd' : 'Ctrl'} + K)`}
              aria-expanded={isSearchOpen}
              title={`Sök (${navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'} + K)`}
            >
              <Search size={18} />
              <span className="sr-only">Sök</span>
            </button>
            
            <a 
              href="#kontakt" 
              onClick={(e) => handleNavLinkClick(e, 'kontakt')}
              className="btn-primary transform hover:scale-105 transition-all duration-300 whitespace-nowrap focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
            >
              Kontakt
            </a>
          </nav>
          
          {/* Mobile buttons */}
          <div className="lg:hidden flex items-center space-x-3">
            <button 
              onClick={toggleSearch} 
              className="text-brown-500 hover:text-primary-color transition-colors focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 rounded-full p-1"
              aria-label="Sök"
              aria-expanded={isSearchOpen}
            >
              <Search size={18} />
            </button>
            <button 
              onClick={toggleMenu} 
              className="text-brown-500 hover:text-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 rounded-full p-1"
              aria-label={isMenuOpen ? "Stäng meny" : "Öppna meny"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Search Panel */}
      <div 
        className={`bg-white border-t border-gray-100 shadow-lg py-4 transform transition-all duration-300 ease-in-out ${
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
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-primary-color pr-10 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 rounded-full p-1"
              aria-label="Stäng sökning"
              onClick={toggleSearch}
            >
              <X size={20} />
            </button>
          </form>
          
          {/* Popular searches */}
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Populära sökningar:</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <button 
                  key={search}
                  onClick={() => setSearchTerm(search)} 
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-1"
                  type="button"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Mobile Menu */}
      <nav 
        className={`lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden transition-all duration-300 ease-in-out w-full ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
        role="navigation"
        aria-label="Mobil navigation"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4 max-w-7xl">
          <a 
            href="#om-mig" 
            onClick={(e) => handleNavLinkClick(e, 'om-mig')}
            className={`text-brown-500 hover:text-primary-color font-medium py-3 border-b border-gray-50 flex items-center transition-colors ${
              activeSection === 'om-mig' ? 'text-primary-color' : ''
            }`}
            aria-current={activeSection === 'om-mig' ? 'page' : undefined}
          >
            Om mig
          </a>
          <a 
            href="#recept" 
            onClick={(e) => handleNavLinkClick(e, 'recept')}
            className={`text-brown-500 hover:text-primary-color font-medium py-3 border-b border-gray-50 flex items-center transition-colors ${
              activeSection === 'recept' ? 'text-primary-color' : ''
            }`}
            aria-current={activeSection === 'recept' ? 'page' : undefined}
          >
            Recept
          </a>
          <a 
            href="#samarbeten" 
            onClick={(e) => handleNavLinkClick(e, 'samarbeten')}
            className={`text-brown-500 hover:text-primary-color font-medium py-3 border-b border-gray-50 flex items-center transition-colors ${
              activeSection === 'samarbeten' ? 'text-primary-color' : ''
            }`}
            aria-current={activeSection === 'samarbeten' ? 'page' : undefined}
          >
            Samarbeten
          </a>
          <a 
            href="https://www.instagram.com/maykaskitchen/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brown-500 hover:text-primary-color font-medium py-3 border-b border-gray-50 flex items-center transition-colors"
            aria-label="Besök min Instagram (öppnas i nytt fönster)"
          >
            <Instagram size={18} className="mr-2" aria-hidden="true" /> 
            Instagram
          </a>
          <a 
            href="#kontakt" 
            onClick={(e) => handleNavLinkClick(e, 'kontakt')}
            className="bg-primary-color text-white py-3 px-6 rounded-lg text-center hover:bg-accent-color transition-colors focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 font-medium"
          >
            Kontakt
          </a>
        </div>
      </nav>
    </header>
  );
};