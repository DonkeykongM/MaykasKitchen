import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Search, Instagram, Salad } from 'lucide-react';
import { useOptimizedScroll } from '../hooks/useOptimizedScroll';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleNavLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const element = document.getElementById(id);
    if (element) {
      closeMenu();
      const headerHeight = 90; // Account for fixed header height
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Ensure hash updates after scroll
      setTimeout(() => {
      window.history.pushState(null, '', `#${id}`);
      setActiveSection(id);
      }, 100);
    }
  }, [closeMenu]);

  const handleHomeClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('');
  }, []);

  return (
    <header 
      className={`fixed top-0 z-50 transition-all duration-300 w-full ${
        isScrolled 
          ? 'py-3 md:py-4 shadow-xl bg-white/98 backdrop-blur-lg border-b border-purple-100' 
          : 'py-4 md:py-5 bg-white shadow-md'
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
            className="flex items-center group min-w-0 flex-shrink-0 hover:scale-105 transition-transform duration-200"
            aria-label="MaykasKitchen, gå till startsidan"
          >
            <div className="relative mr-3 md:mr-4 flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 w-10 h-10 md:w-12 md:h-12 rounded-xl transition-all duration-300 group-hover:from-purple-600 group-hover:to-purple-700 group-hover:scale-110 flex-shrink-0 shadow-lg">
              <Salad className="w-5 h-5 md:w-7 md:h-7 text-white transition-colors" />
            </div>
            <span className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-600 tracking-tight truncate transition-colors group-hover:text-purple-700 font-serif">
              MaykasKitchen
            </span>
          </a>
          
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6" role="navigation" aria-label="Huvudnavigation">
            <a 
              href="#om-mig" 
              onClick={(e) => handleNavLinkClick(e, 'om-mig')}
              className={`nav-link text-gray-700 hover:text-purple-600 transition-all duration-200 whitespace-nowrap text-sm lg:text-base font-medium ${
                activeSection === 'om-mig' ? 'text-purple-600 active' : ''
              }`}
              aria-current={activeSection === 'om-mig' ? 'page' : undefined}
            >
              Om mig
            </a>
            <a 
              href="#recept" 
              onClick={(e) => handleNavLinkClick(e, 'recept')}
              className={`nav-link text-gray-700 hover:text-purple-600 transition-all duration-200 whitespace-nowrap text-sm lg:text-base font-medium ${
                activeSection === 'recept' ? 'text-purple-600 active' : ''
              }`}
              aria-current={activeSection === 'recept' ? 'page' : undefined}
            >
              Recept
            </a>
            <a 
              href="#samarbeten" 
              onClick={(e) => handleNavLinkClick(e, 'samarbeten')}
              className={`nav-link text-gray-700 hover:text-purple-600 transition-all duration-200 whitespace-nowrap text-sm lg:text-base font-medium ${
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
              className="nav-link text-gray-700 hover:text-purple-600 transition-all duration-200 flex items-center whitespace-nowrap text-sm lg:text-base font-medium bg-purple-50 px-3 py-2 rounded-lg hover:bg-purple-100"
              aria-label="Besök min Instagram (öppnas i nytt fönster)"
            >
              <Instagram size={14} className="mr-1" aria-hidden="true" /> 
              Instagram
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded-lg min-h-[44px] min-w-[44px]"
            aria-label="Öppna meny"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-lg border-b border-purple-100 shadow-xl">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                <a 
                  href="#om-mig" 
                  onClick={(e) => {
                    handleNavLinkClick(e, 'om-mig');
                    closeMenu();
                  }}
                  className="block py-3 px-4 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all font-medium"
                >
                  Om mig
                </a>
                <a 
                  href="#recept" 
                  onClick={(e) => {
                    handleNavLinkClick(e, 'recept');
                    closeMenu();
                  }}
                  className="block py-3 px-4 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all font-medium"
                >
                  Recept
                </a>
                <a 
                  href="#samarbeten" 
                  onClick={(e) => {
                    handleNavLinkClick(e, 'samarbeten');
                    closeMenu();
                  }}
                  className="block py-3 px-4 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all font-medium"
                >
                  Samarbeten
                </a>
                <a 
                  href="https://www.instagram.com/maykaskitchen/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block py-3 px-4 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all font-medium"
                  onClick={closeMenu}
                >
                  <Instagram size={16} className="inline mr-2" /> 
                  Instagram
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
            >
              <Search size={18} />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};