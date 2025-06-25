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
import { LaxRisbowlPost, KaftaBilSejniePost, KoftaBilSaniehPost, PastaPestoPost, KycklingShawarmaPost } from './components/BlogPost';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    // Optimized hash change detection
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
      } else if (currentHash === "#recipe/kofta-bil-sanieh") {
        title = "Köfta bil Sanieh - MaykasKitchen";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Autentiskt syriskt recept på Köfta bil Sanieh. Mellanösterns vardagsfavorit med kryddig köttfärs, potatis och padron paprika i mustig tomatsås.");
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

  // Recipe pages
  if (currentHash.startsWith("#recipe/")) {
    const recipeId = currentHash.replace("#recipe/", "");
    
    const RecipeComponent = () => {
      switch (recipeId) {
        case "lax-risbowl":
          return <LaxRisbowlPost />;
        case "kafta-bil-sejnie":
          return <KaftaBilSejniePost />;
        case "kofta-bil-sanieh":
          return <KoftaBilSaniehPost />;
        case "pasta-pesto":
          return <PastaPestoPost />;
        case "kyckling-shawarma":
          return <KycklingShawarmaPost />;
        default:
          // Redirect to home if recipe not found
          window.location.hash = '';
          return null;
      }
    };

    return (
      <div className="font-sans bg-transparent text-white relative z-10">
        <Header />
        <main id="main-content" role="main">
          <RecipeComponent />
          <Newsletter />
        </main>
        <Footer />
      </div>
    );
  }

  // Recipe list page
  if (currentHash.startsWith("#recept/")) {
    return (
      <div className="font-sans bg-transparent text-white relative z-10">
        <Header />
        <main id="main-content" role="main">
          <RecipeList />
          <Newsletter />
        </main>
        <Footer />
      </div>
    );
  }

  // Home page
  return (
    <div className="font-sans bg-transparent text-white relative z-10">
      <Header />
      <main id="main-content" role="main">
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