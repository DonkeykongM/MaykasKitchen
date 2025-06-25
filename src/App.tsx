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
import FoodBlogBackground from './components/ui/food-blog-background';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading (remove in production if not needed)
    const timer = setTimeout(() => setIsLoading(false), 100);
    
    // Optimized hash change detection
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash !== currentHash) {
        setCurrentHash(newHash);
        
        // Smooth scroll to top when navigating between major sections
        if (newHash === '' || newHash.startsWith('#recipe/') || newHash.startsWith('#recept/')) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    // Enhanced scroll animation functionality
    const handleScroll = () => {
      const scrollTriggers = document.querySelectorAll('.scroll-trigger');
      const windowHeight = window.innerHeight;
      
      scrollTriggers.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };

    // Event listeners
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial trigger
    handleScroll();

    // Dynamic page title and meta description
    const updatePageMeta = () => {
      let title = "MaykasKitchen - Autentisk assyrisk/syriansk matlagning med Mayka Gulo";
      let description = "Upptäck smakrika recept och matinspiration från Mayka Gulo, kock och matkreatör med assyrisk/syriansk tradition och passion för säsongsbaserad matlagning";
      
      if (currentHash === "#recipe/lax-risbowl") {
        title = "Kryddig lax- & risbowl - MaykasKitchen";
        description = "Recept på kryddig lax- & risbowl. Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen. Enkelt och smakrikt recept från MaykasKitchen.";
      } else if (currentHash === "#recipe/kafta-bil-sejnie") {
        title = "Köttbullar i tomatsås (Kafta bil sejnie) - MaykasKitchen";
        description = "Autentiskt recept på mellanösterns köttbullar i tomatsås. En traditionell assyrisk/syriansk rätt med smakrik tomatsås från MaykasKitchen.";
      } else if (currentHash === "#recipe/kofta-bil-sanieh") {
        title = "Köfta bil Sanieh - MaykasKitchen";
        description = "Autentiskt syriskt recept på Köfta bil Sanieh. Mellanösterns vardagsfavorit med kryddig köttfärs, potatis och padron paprika i mustig tomatsås.";
      } else if (currentHash === "#recipe/pasta-pesto") {
        title = "Pasta pesto med ugnsbakade tomater & stekt halloumi - MaykasKitchen";
        description = "Smakrik pastarätt med krämig pestosås, ugnsbakade tomater och stekt halloumi - enkel att laga och älskad av hela familjen.";
      } else if (currentHash === "#recipe/kyckling-shawarma") {
        title = "Kyckling Shawarma - MaykasKitchen";
        description = "Autentisk mellanöstern kyckling shawarma med hemmagjorda tunnbröd, kryddigt kött och fräscha tillbehör. Perfekt för familjen!";
      } else if (currentHash === "#recept/alla" || currentHash.startsWith("#recept/")) {
        title = "Alla recept - MaykasKitchen";
        description = "Upptäck alla våra recept - från traditionella assyriska rätter till moderna tolkningar. Fisk, kött, vegetariskt och mycket mer hos MaykasKitchen.";
      }
      
      // Update title and meta description
      document.title = title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      }
    };
    
    updatePageMeta();
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentHash]);

  // Loading screen (optional - remove if not needed)
  if (isLoading) {
    return (
      <FoodBlogBackground className="min-h-screen">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color mx-auto mb-4"></div>
            <p className="text-primary-color font-medium">Laddar...</p>
          </div>
        </div>
      </FoodBlogBackground>
    );
  }

  // Recipe pages with error boundary
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
      <FoodBlogBackground className="min-h-screen">
        <div className="font-sans bg-transparent text-text-color relative z-10">
          <Header />
          <main id="main-content" role="main">
            <RecipeComponent />
            <Newsletter />
          </main>
          <Footer />
        </div>
      </FoodBlogBackground>
    );
  }

  // Recipe list page
  if (currentHash.startsWith("#recept/")) {
    return (
      <FoodBlogBackground className="min-h-screen">
        <div className="font-sans bg-transparent text-text-color relative z-10">
          <Header />
          <main id="main-content" role="main">
            <RecipeList />
            <Newsletter />
          </main>
          <Footer />
        </div>
      </FoodBlogBackground>
    );
  }

  // Home page
  return (
    <FoodBlogBackground className="min-h-screen">
      <div className="font-sans bg-transparent text-text-color relative z-10">
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
    </FoodBlogBackground>
  );
}

export default App;