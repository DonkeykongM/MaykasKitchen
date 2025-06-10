import React, { useEffect } from 'react';
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
import { BlogPost, LaxRisbowlPost, KaftaBilSejniePost, PastaPestoPost } from './components/BlogPost';
import { RecipePage } from './components/RecipePage';

function App() {
  useEffect(() => {
    // Add scroll animation functionality
    const handleScroll = () => {
      const scrollTriggers = document.querySelectorAll('.scroll-trigger');
      scrollTriggers.forEach(element => {
        const position = element.getBoundingClientRect();
        // If element is in viewport
        if (position.top < window.innerHeight * 0.9) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to show elements already in viewport
    handleScroll();

    // Set page title dynamically based on hash
    const updatePageTitle = () => {
      const hash = window.location.hash;
      let title = "MaykasKitchen - Autentisk assyrisk/syriansk matlagning med Mayka Gulo";
      
      if (hash === "#recipe/lax-risbowl") {
        title = "Kryddig lax- & risbowl - MaykasKitchen";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Recept på kryddig lax- & risbowl. Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen. Enkelt och smakrikt recept från MaykasKitchen.");
      } else if (hash === "#recipe/kafta-bil-sejnie") {
        title = "Köttbullar i tomatsås (Kafta bil sejnie) - MaykasKitchen";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Autentiskt recept på mellanösterns köttbullar i tomatsås. En traditionell assyrisk/syriansk rätt med smakrik tomatsås från MaykasKitchen.");
      } else if (hash === "#recipe/pasta-pesto") {
        title = "Pasta pesto med ugnsbakade tomater & stekt halloumi - MaykasKitchen";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Smakrik pastarätt med krämig pestosås, ugnsbakade tomater och stekt halloumi - enkel att laga och älskad av hela familjen.");
      } else if (hash === "#recept/alla" || hash.startsWith("#recept/")) {
        title = "Alla recept - MaykasKitchen";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Upptäck alla våra recept - från traditionella assyriska rätter till moderna tolkningar. Fisk, kött, vegetariskt och mycket mer hos MaykasKitchen.");
      }
      
      document.title = title;
    };
    
    updatePageTitle();
    window.addEventListener('hashchange', updatePageTitle);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', updatePageTitle);
    };
  }, []);

  // Check if we should display a blog post or recipe page based on hash
  const hash = window.location.hash;
  
  if (hash.startsWith("#recipe/")) {
    const recipeId = hash.replace("#recipe/", "");
    if (recipeId === "lax-risbowl") {
      return (
        <div className="font-sans bg-light-bg text-text-color">
          <Header />
          <main id="main-content">
            <LaxRisbowlPost />
            <Newsletter />
          </main>
          <Footer />
        </div>
      );
    }
    if (recipeId === "kafta-bil-sejnie") {
      return (
        <div className="font-sans bg-light-bg text-text-color">
          <Header />
          <main id="main-content">
            <KaftaBilSejniePost />
            <Newsletter />
          </main>
          <Footer />
        </div>
      );
    }
    if (recipeId === "pasta-pesto") {
      return (
        <div className="font-sans bg-light-bg text-text-color">
          <Header />
          <main id="main-content">
            <PastaPestoPost />
            <Newsletter />
          </main>
          <Footer />
        </div>
      );
    }
  }

  // Visa RecipeList vid navigering till #recept/alla eller andra receptkategorier
  if (hash.startsWith("#recept/")) {
    return (
      <div className="font-sans bg-light-bg text-text-color">
        <Header />
        <main id="main-content">
          <RecipeList />
          <Newsletter />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans bg-light-bg text-text-color">
      <Header />
      <main id="main-content">
        <Hero />
        <div className="section-divider" aria-hidden="true"></div>
        <NewsletterPopup />
        <AboutSection />
        <div className="section-divider" aria-hidden="true"></div>
        <RecipeSection />
        <div className="section-divider" aria-hidden="true"></div>
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