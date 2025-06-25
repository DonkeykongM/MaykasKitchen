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
import FoodBlogBackground from './components/ui/food-blog-background';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    console.log("🚀 App: Starting with hash:", currentHash);
    
    // Optimerad hash change detection
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash !== currentHash) {
        console.log("📍 Hash changed from", currentHash, "to", newHash);
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
    console.log("🍳 Rendering recipe page for:", recipeId);
    
    // Direkt switch för snabbast möjliga rendering
    switch (recipeId) {
      case "lax-risbowl":
        return (
          <FoodBlogBackground className="min-h-screen">
            <div className="font-sans bg-transparent text-text-color relative z-10">
              <Header />
              <main id="main-content">
                <LaxRisbowlPost />
                <Newsletter />
              </main>
              <Footer />
            </div>
          </FoodBlogBackground>
        );
      case "kafta-bil-sejnie":
        return (
          <FoodBlogBackground className="min-h-screen">
            <div className="font-sans bg-transparent text-text-color relative z-10">
              <Header />
              <main id="main-content">
                <KaftaBilSejniePost />
                <Newsletter />
              </main>
              <Footer />
            </div>
          </FoodBlogBackground>
        );
      case "pasta-pesto":
        return (
          <FoodBlogBackground className="min-h-screen">
            <div className="font-sans bg-transparent text-text-color relative z-10">
              <Header />
              <main id="main-content">
                <PastaPestoPost />
                <Newsletter />
              </main>
              <Footer />
            </div>
          </FoodBlogBackground>
        );
      case "kyckling-shawarma":
        return (
          <FoodBlogBackground className="min-h-screen">
            <div className="font-sans bg-transparent text-text-color relative z-10">
              <Header />
              <main id="main-content">
                <KycklingShawarmaPost />
                <Newsletter />
              </main>
              <Footer />
            </div>
          </FoodBlogBackground>
        );
      default:
        // Om recept inte finns, gå tillbaka till startsidan
        window.location.hash = '';
        return null;
    }
  }

  // Visa RecipeList vid navigering till #recept/alla eller andra receptkategorier
  if (currentHash.startsWith("#recept/")) {
    console.log("📋 Rendering recipe list page");
    return (
      <FoodBlogBackground className="min-h-screen">
        <div className="font-sans bg-transparent text-text-color relative z-10">
          <Header />
          <main id="main-content">
            <RecipeList />
            <Newsletter />
          </main>
          <Footer />
        </div>
      </FoodBlogBackground>
    );
  }

  // Standard startsida med FoodBlogBackground som huvudbakgrund
  console.log("🏠 Rendering home page");
  return (
    <FoodBlogBackground className="min-h-screen">
      <div className="font-sans bg-transparent text-text-color relative z-10">
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
    </FoodBlogBackground>
  );
}

export default App;