import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { RecipeSection } from './components/RecipeSection';
import { RecipeList } from './components/RecipeList';
import { CollaborationSection } from './components/CollaborationSection';
import { ContactSection } from './components/ContactSection';
import { Newsletter } from './components/Newsletter';
import { NewsletterPopup } from './components/NewsletterPopup';
import { Footer } from './components/Footer';
import { LaxRisbowlPost, KaftaBilSejniePost, PastaPestoPost, KycklingShawarmaPost } from './components/BlogPost';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    // Optimerad hash change detection
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash !== currentHash) {
        setCurrentHash(newHash);
      }
    };

    // Add scroll animation functionality
    const handleScroll = () => {
      const scrollTriggers = document.querySelectorAll('.scroll-trigger');
      scrollTriggers.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.9) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on mount
    handleScroll();

    // Set page title dynamically based on hash
    const updatePageTitle = () => {
      let title = "MaykasKitchen - Autentisk assyrisk/syriansk matlagning med Mayka Gulo";
      
      if (currentHash === "#recipe/lax-risbowl") {
        title = "Kryddig lax- & risbowl - MaykasKitchen";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Recept på kryddig lax- & risbowl. Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen. Enkelt och smakrikt recept från MaykasKitchen.");
      } else if (currentHash === "#recipe/kafta-bil-sejnie") {
        title = "Köttbullar i tomatsås (Kafta bil sejnie) - MaykasKitchen";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Autentiskt recept på mellanösterns köttbullar i tomatsås. En traditionell assyrisk/syriansk rätt med smakrik tomatsås från MaykasKitchen.");
      } else if (currentHash === "#recipe/pasta-pesto") {
        title = "Pasta pesto med ugnsbakade tomater & stekt halloumi - MaykasKitchen";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Smakrik pastarätt med krämig pestosås, ugnsbakade tomater och stekt halloumi - enkel att laga och älskad av hela familjen.");
      } else if (currentHash === "#recipe/kyckling-shawarma") {
        title = "Kyckling Shawarma - MaykasKitchen";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Autentisk mellanöstern kyckling shawarma med hemmagjorda tunnbröd, kryddigt kött och fräscha tillbehör. Perfekt för familjen!");
      } else if (currentHash === "#recept/alla" || currentHash.startsWith("#recept/")) {
        title = "Alla recept - MaykasKitchen";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Upptäck alla våra recept - från traditionella assyriska rätter till moderna tolkningar. Fisk, kött, vegetariskt och mycket mer hos MaykasKitchen.");
      }
      
      document.title = title;
    };
    
    updatePageTitle();
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentHash]);

  // Direkt rendering utan fördröjning - check hash directly
  if (currentHash.startsWith("#recipe/")) {
    const recipeId = currentHash.replace("#recipe/", "");
    
    // Direkt switch för snabbast möjliga rendering
    switch (recipeId) {
      case "lax-risbowl":
        return (
          <div className="font-sans bg-gradient-to-br from-orange-50/80 via-red-50/60 to-yellow-50/80 text-text-color relative min-h-screen">
            <Header />
            <main id="main-content">
              <LaxRisbowlPost />
              <Newsletter />
            </main>
            <Footer />
          </div>
        );
      case "kafta-bil-sejnie":
        return (
          <div className="font-sans bg-gradient-to-br from-orange-50/80 via-red-50/60 to-yellow-50/80 text-text-color relative min-h-screen">
            <Header />
            <main id="main-content">
              <KaftaBilSejniePost />
              <Newsletter />
            </main>
            <Footer />
          </div>
        );
      case "pasta-pesto":
        return (
          <div className="font-sans bg-gradient-to-br from-orange-50/80 via-red-50/60 to-yellow-50/80 text-text-color relative min-h-screen">
            <Header />
            <main id="main-content">
              <PastaPestoPost />
              <Newsletter />
            </main>
            <Footer />
          </div>
        );
      case "kyckling-shawarma":
        return (
          <div className="font-sans bg-gradient-to-br from-orange-50/80 via-red-50/60 to-yellow-50/80 text-text-color relative min-h-screen">
            <Header />
            <main id="main-content">
              <KycklingShawarmaPost />
              <Newsletter />
            </main>
            <Footer />
          </div>
        );
      default:
        // Om recept inte finns, gå tillbaka till startsidan
        window.location.hash = '';
        return null;
    }
  }

  // Visa RecipeList vid navigering till #recept/alla eller andra receptkategorier
  if (currentHash.startsWith("#recept/")) {
    return (
      <div className="font-sans bg-gradient-to-br from-orange-50/80 via-red-50/60 to-yellow-50/80 text-text-color relative min-h-screen">
        <Header />
        <main id="main-content">
          <RecipeList />
          <Newsletter />
        </main>
        <Footer />
      </div>
    );
  }

  // Standard startsida med integrerade animationer
  return (
    <div className="font-sans bg-gradient-to-br from-orange-50/80 via-red-50/60 to-yellow-50/80 text-text-color relative min-h-screen overflow-x-hidden">
      {/* Animated decorative elements directly in sections */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating food icons */}
        <div className="animate-float absolute top-[20%] right-[10%] w-8 h-8 text-primary-color opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.252 8.252 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
          </svg>
        </div>
        
        <div className="animate-bounce-subtle absolute top-[60%] left-[5%] w-10 h-10 text-secondary-color opacity-15" style={{animationDelay: '1s'}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-3.097-3.097a2.25 2.25 0 0 0-3.196 0L12 19.5l-4.707-4.707a2.25 2.25 0 0 0-3.196 0L1 18.75" />
          </svg>
        </div>
        
        <div className="animate-pulse-subtle absolute bottom-[30%] right-[15%] w-6 h-6 text-accent-color opacity-25" style={{animationDelay: '2s'}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </div>
        
        <div className="animate-float absolute top-[40%] left-[80%] w-7 h-7 text-primary-color opacity-20" style={{animationDelay: '3s'}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        
        {/* Organic blob shapes */}
        <div className="absolute top-[10%] left-[20%] w-32 h-32 bg-gradient-to-br from-primary-color/10 to-transparent rounded-full animate-pulse-subtle"></div>
        <div className="absolute bottom-[20%] right-[25%] w-24 h-24 bg-gradient-to-br from-secondary-color/10 to-transparent rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-[70%] left-[10%] w-40 h-40 bg-gradient-to-br from-accent-color/8 to-transparent rounded-full animate-bounce-subtle" style={{animationDelay: '2.5s'}}></div>
      </div>

      <Header />
      <main id="main-content">
        <Hero />
        <div className="section-divider" aria-hidden="true"></div>
        <NewsletterPopup />
        <AboutSection />
        <div className="section-divider" aria-hidden="true"></div>
        <RecipeSection />
        <div className="section-diviner" aria-hidden="true"></div>
        <CollaborationSection />
        <div className="section-divider" aria-hidden="true"></div>
        <ContactSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;