import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Instagram, Sun, Moon, Salad } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Determine active section based on scroll position
      const sections = ['om-mig', 'recept', 'samarbeten', 'kontakt'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Focus search input when search is opened
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Here you would apply dark mode classes to document if implementing dark mode
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Improved hash link clicks to add smooth scrolling
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    const element = document.getElementById(id);
    if (element) {
      closeMenu();
      window.scrollTo({
        top: element.offsetTop - 80, // Account for header height
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
      setActiveSection(id);
    }
  };

  // Function to handle home link click
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.hash = ''; // Clear the hash
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <nav 
      className={`${
        isScrolled 
          ? 'py-2 shadow-md bg-white/95 backdrop-blur-sm' 
          : 'py-4 bg-white'
      } sticky top-0 z-50 transition-all duration-300 w-full`}
      role="navigation"
      aria-label="Huvudmeny"
    >
      {/* Skip to main content link for accessibility */}
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
            <div className="relative mr-2 md:mr-3 flex items-center justify-center bg-primary-color/10 w-8 h-8 md:w-10 md:h-10 rounded-full transition-transform duration-300 group-hover:rotate-6 flex-shrink-0">
              <Salad className="w-4 h-4 md:w-6 md:h-6 text-primary-color" />
            </div>
            <span className="text-lg md:text-2xl font-bold text-primary-color tracking-tight truncate">MaykasKitchen</span>
          </a>
          
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a 
              href="#om-mig" 
              onClick={(e) => handleNavLinkClick(e, 'om-mig')}
              className={`nav-link text-brown-500 hover:text-primary-color transition-colors whitespace-nowrap ${
                activeSection === 'om-mig' ? 'text-primary-color active' : ''
              }`}
            >
              Om mig
            </a>
            <a 
              href="#recept" 
              onClick={(e) => handleNavLinkClick(e, 'recept')}
              className={`nav-link text-brown-500 hover:text-primary-color transition-colors whitespace-nowrap ${
                activeSection === 'recept' ? 'text-primary-color active' : ''
              }`}
            >
              Recept
            </a>
            <a 
              href="#samarbeten" 
              onClick={(e) => handleNavLinkClick(e, 'samarbeten')}
              className={`nav-link text-brown-500 hover:text-primary-color transition-colors whitespace-nowrap ${
                activeSection === 'samarbeten' ? 'text-primary-color active' : ''
              }`}
            >
              Samarbeten
            </a>
            <a 
              href="https://www.instagram.com/maykaskitchen/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link text-brown-500 hover:text-primary-color transition-colors flex items-center whitespace-nowrap"
              aria-label="Besök min Instagram"
            >
              <Instagram size={16} className="mr-1" /> Instagram
            </a>
            <button 
              onClick={toggleSearch} 
              className="text-brown-500 hover:text-primary-color transition-colors focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 rounded-full p-1"
              aria-label="Sök"
              aria-expanded={isSearchOpen}
            >
              <Search size={18} />
            </button>
            <a 
              href="#kontakt" 
              onClick={(e) => handleNavLinkClick(e, 'kontakt')}
              className="btn-primary transform hover:scale-105 transition-transform whitespace-nowrap"
            >
              Kontakt
            </a>
          </div>
          
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
      
      {/* Search panel with enhanced animation */}
      <div 
        className={`bg-white border-t border-gray-100 shadow-md py-4 transform transition-all duration-300 ease-in-out ${
          isSearchOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        } absolute left-0 right-0 top-full z-20 w-full`}
        aria-hidden={!isSearchOpen}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Sök efter recept, ingredienser eller tekniker..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color pr-10"
              aria-label="Sök på webbplatsen"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 rounded-full p-1"
              aria-label="Stäng sökning"
              onClick={toggleSearch}
            >
              <X size={20} />
            </button>
          </form>
          
          <div className="mt-3">
            <p className="text-sm text-gray-500">Populära sökningar:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <button onClick={() => setSearchTerm('Mellanöstern')} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors">Mellanöstern</button>
              <button onClick={() => setSearchTerm('Vegetariskt')} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors">Vegetariskt</button>
              <button onClick={() => setSearchTerm('Snabba recept')} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors">Snabba recept</button>
              <button onClick={() => setSearchTerm('Dessert')} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors">Dessert</button>
              <button onClick={() => setSearchTerm('Lax')} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors">Lax</button>
              <button onClick={() => setSearchTerm('Köttbullar')} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors">Köttbullar</button>
              <button onClick={() => setSearchTerm('Assyriskt')} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors">Assyriskt</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu with enhanced animation */}
      <div 
        className={`lg:hidden bg-white border-t border-gray-100 shadow-soft overflow-hidden transition-all duration-300 ease-in-out w-full ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4 max-w-7xl">
          <a 
            href="#om-mig" 
            onClick={(e) => handleNavLinkClick(e, 'om-mig')}
            className={`text-brown-500 hover:text-primary-color font-medium py-2 border-b border-gray-50 flex items-center ${
              activeSection === 'om-mig' ? 'text-primary-color' : ''
            }`}
          >
            Om mig
          </a>
          <a 
            href="#recept" 
            onClick={(e) => handleNavLinkClick(e, 'recept')}
            className={`text-brown-500 hover:text-primary-color font-medium py-2 border-b border-gray-50 flex items-center ${
              activeSection === 'recept' ? 'text-primary-color' : ''
            }`}
          >
            Recept
          </a>
          <a 
            href="#samarbeten" 
            onClick={(e) => handleNavLinkClick(e, 'samarbeten')}
            className={`text-brown-500 hover:text-primary-color font-medium py-2 border-b border-gray-50 flex items-center ${
              activeSection === 'samarbeten' ? 'text-primary-color' : ''
            }`}
          >
            Samarbeten
          </a>
          <a 
            href="https://www.instagram.com/maykaskitchen/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brown-500 hover:text-primary-color font-medium py-2 border-b border-gray-50 flex items-center"
          >
            <Instagram size={18} className="mr-2" /> Instagram
          </a>
          <a 
            href="#kontakt" 
            onClick={(e) => handleNavLinkClick(e, 'kontakt')}
            className="bg-primary-color text-white py-3 px-6 rounded-lg text-center hover:bg-accent-color transition-colors"
          >
            Kontakt
          </a>
        </div>
      </div>
    </nav>
  );
};