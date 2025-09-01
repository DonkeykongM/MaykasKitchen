import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Search, Instagram, ChefHat } from 'lucide-react';
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
          ? 'py-2 shadow-2xl bg-white/98 backdrop-blur-xl border-b border-purple-100' 
          : 'py-4 md:py-5 bg-white/95 backdrop-blur-md shadow-lg'
      }`}
      role="banner"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}
    >
      <a href="#main-content" className="skip-to-content">
        Hoppa till huvudinnehåll
      </a>
      
      <div className="container mx-auto px-4 w-full max-w-7xl">
        <div className="flex justify-between items-center w-full min-h-[60px]">
          <a 
            href="#" 
            onClick={handleHomeClick}
            className="flex items-center group min-w-0 flex-shrink-0 hover-lift"
            aria-label="MaykasKitchen, gå till startsidan"
          >
            <div className="relative mr-3 flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 w-10 h-10 md:w-12 md:h-12 rounded-2xl transition-all duration-300 group-hover:scale-110 flex-shrink-0 shadow-md group-hover:shadow-lg">
              <ChefHat className="w-5 h-5 md:w-6 md:h-6 text-purple-600 transition-all duration-300 group-hover:rotate-12" />
            </div>
            <span className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-600 tracking-tight truncate transition-colors group-hover:text-purple-700 font-serif">
              MaykasKitchen
            </span>
          </a>
          
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6" role="navigation" aria-label="Huvudnavigation">
            <a 
              href="#om-mig" 
              onClick={(e) => handleNavLinkClick(e, 'om-mig')}
              className={`nav-link text-gray-700 hover:text-purple-600 transition-all whitespace-nowrap text-base font-medium hover-lift ${
                activeSection === 'om-mig' ? 'text-purple-600 active' : ''
              }`}
              aria-current={activeSection === 'om-mig' ? 'page' : undefined}
            >
              Om mig
            </a>
            <a 
              href="#recept" 
              onClick={(e) => handleNavLinkClick(e, 'recept')}
              className={`nav-link text-gray-700 hover:text-purple-600 transition-all whitespace-nowrap text-base font-medium hover-lift ${
                activeSection === 'recept' ? 'text-purple-600 active' : ''
              }`}
              aria-current={activeSection === 'recept' ? 'page' : undefined}
            >
              Recept
            </a>
            <a 
              href="#samarbeten" 
              onClick={(e) => handleNavLinkClick(e, 'samarbeten')}
              className={`nav-link text-gray-700 hover:text-purple-600 transition-all whitespace-nowrap text-base font-medium hover-lift ${
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
              className="nav-link text-gray-700 hover:text-purple-600 transition-all flex items-center whitespace-nowrap text-base font-medium hover-lift"
              aria-label="Besök min Instagram (öppnas i nytt fönster)"
            >
              <Instagram size={16} className="mr-2" aria-hidden="true" /> 
              Instagram
            </a>
            
            <button 
              onClick={toggleSearch} 
              className="text-gray-700 hover:text-purple-600 transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded-xl p-3 relative group min-h-[48px] min-w-[48px] flex items-center justify-center hover:bg-purple-50"
              aria-label={`Sök (${navigator.platform.includes('Mac') ? 'Cmd' : 'Ctrl'} + K)`}
              aria-expanded={isSearchOpen}
              title={`Sök (${navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'} + K)`}
            >
              <Search size={18} className="transition-transform group-hover:scale-110" />
              <span className="sr-only">Sök</span>
            </button>
            
            <a 
              href="#kontakt" 
              onClick={(e) => handleNavLinkClick(e, 'kontakt')}
              className="btn-primary hover-lift whitespace-nowrap focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 text-base px-6 py-3 font-semibold"
            >
              Kontakt
            </a>
          </nav>
          
          <div className="lg:hidden flex items-center space-x-2">
            <button 
              onClick={toggleSearch} 
              className="text-gray-700 hover:text-purple-600 transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded-xl p-3 min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-purple-50"
              aria-label="Sök"
              aria-expanded={isSearchOpen}
            >
              <Search size={20} />
            </button>
            <button 
              onClick={toggleMenu} 
              className="text-gray-700 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded-xl p-3 min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-purple-50 transition-all"
              aria-label={isMenuOpen ? "Stäng meny" : "Öppna meny"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={22} className="transition-transform rotate-90" /> : <Menu size={22} className="transition-transform" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Panel */}
      <div 
        className={`bg-white/98 backdrop-blur-xl border-t border-purple-100 shadow-2xl py-4 md:py-6 transform transition-all duration-400 ease-out ${
          isSearchOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        } absolute left-0 right-0 top-full z-20 w-full`}
        aria-hidden={!isSearchOpen}
        role="search"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <form onSubmit={handleSearchSubmit} className="relative">
            <label htmlFor="search-input" className="sr-only">
              Sök efter recept, ingredienser eller tekniker
            </label>
            <input
              id="search-input"
              ref={searchInputRef}
              type="text"
              placeholder="Sök efter recept, ingredienser eller tekniker..."
              className="w-full px-4 md:px-6 py-3 md:py-4 pl-12 md:pl-14 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 pr-12 md:pr-14 text-base bg-white/95 backdrop-blur-md min-h-[52px] shadow-sm focus:shadow-lg transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
            <Search className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-purple-500" size={18} aria-hidden="true" />
            <button
              type="button"
              className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded-xl p-2 min-w-[36px] min-h-[36px] flex items-center justify-center hover:bg-purple-50 transition-all"
              aria-label="Stäng sökning"
              onClick={toggleSearch}
            >
              <X size={18} />
            </button>
          </form>
          
          <div className="mt-4 md:mt-6">
            <p className="text-sm text-gray-600 mb-3 font-medium">Populära sökningar:</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <button 
                  key={search}
                  onClick={() => setSearchTerm(search)} 
                  className="text-sm bg-purple-50 text-purple-700 px-4 py-2 rounded-full hover:bg-purple-600 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-1 min-h-[40px] font-medium hover-scale"
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
        className={`lg:hidden mobile-menu overflow-hidden transition-all duration-400 ease-out w-full ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
        role="navigation"
        aria-label="Mobil navigation"
      >
        <div className="container mx-auto px-4 py-6 flex flex-col space-y-1 max-w-7xl">
          <a 
            href="#om-mig" 
            onClick={(e) => handleNavLinkClick(e, 'om-mig')}
            className={`mobile-nav-item text-gray-700 hover:text-purple-600 font-medium py-4 flex items-center transition-all min-h-[52px] rounded-xl ${
              activeSection === 'om-mig' ? 'text-purple-600' : ''
            }`}
            aria-current={activeSection === 'om-mig' ? 'page' : undefined}
          >
            Om mig
          </a>
          <a 
            href="#recept" 
            onClick={(e) => handleNavLinkClick(e, 'recept')}
            className={`mobile-nav-item text-gray-700 hover:text-purple-600 font-medium py-4 flex items-center transition-all min-h-[52px] rounded-xl ${
              activeSection === 'recept' ? 'text-purple-600' : ''
            }`}
            aria-current={activeSection === 'recept' ? 'page' : undefined}
          >
            Recept
          </a>
          <a 
            href="#samarbeten" 
            onClick={(e) => handleNavLinkClick(e, 'samarbeten')}
            className={`mobile-nav-item text-gray-700 hover:text-purple-600 font-medium py-4 flex items-center transition-all min-h-[52px] rounded-xl ${
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
            className="mobile-nav-item text-gray-700 hover:text-purple-600 font-medium py-4 flex items-center transition-all min-h-[52px] rounded-xl"
            aria-label="Besök min Instagram (öppnas i nytt fönster)"
          >
            <Instagram size={20} className="mr-3" aria-hidden="true" /> 
            Instagram
          </a>
          <a 
            href="#kontakt" 
            onClick={(e) => handleNavLinkClick(e, 'kontakt')}
            className="btn-primary text-center font-semibold min-h-[52px] flex items-center justify-center mt-4 rounded-2xl shadow-lg"
          >
            Kontakt
          </a>
        </div>
      </nav>
    </header>
  );
};