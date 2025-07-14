import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { RecipeSection } from './components/RecipeSection';
import { CollaborationSection } from './components/CollaborationSection';
import { ContactSection } from './components/ContactSection';
import { Newsletter } from './components/Newsletter';
import { NewsletterPopup } from './components/NewsletterPopup';
import { Footer } from './components/Footer';
import FoodBlogBackground from './components/ui/food-blog-background';
import { HeroSkeleton } from './components/LoadingStates/SkeletonLoader';

// Lazy load components for better performance
const RecipeList = lazy(() => import('./components/RecipeList').then(module => ({ default: module.RecipeList })));
const LaxRisbowlPost = lazy(() => import('./components/BlogPost').then(module => ({ default: module.LaxRisbowlPost })));
const KaftaBilSejniePost = lazy(() => import('./components/BlogPost').then(module => ({ default: module.KaftaBilSejniePost })));
const KoftaBilSaniehPost = lazy(() => import('./components/BlogPost').then(module => ({ default: module.KoftaBilSaniehPost })));
const PastaPestoPost = lazy(() => import('./components/BlogPost').then(module => ({ default: module.PastaPestoPost })));
const KycklingShawarmaPost = lazy(() => import('./components/BlogPost').then(module => ({ default: module.KycklingShawarmaPost })));
const PannpizzorPost = lazy(() => import('./components/BlogPost').then(module => ({ default: module.PannpizzorPost })));
const BatataHarraPost = lazy(() => import('./components/BlogPost').then(module => ({ default: module.BatataHarraPost })));
const KycklingfilePotatisDragonPost = lazy(() => import('./components/BlogPost').then(module => ({ default: module.KycklingfilePotatisDragonPost })));

// Enhanced loading component with skeleton states
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
      <p className="text-purple-600 font-medium">Laddar...</p>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Något gick fel</h2>
            <p className="text-gray-600 mb-4">Vi arbetar på att lösa problemet.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Försök igen
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Optimized loading with performance monitoring
    const startTime = performance.now();
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsInitialLoad(false);
      
      const loadTime = performance.now() - startTime;
      if (loadTime > 3000) {
        console.warn(`Page load time exceeded 3 seconds: ${loadTime.toFixed(2)}ms`);
      }
    }, 100);
    
    // Optimized hash change detection
    let hashChangeTimeout: number;
    const handleHashChange = () => {
      clearTimeout(hashChangeTimeout);
      hashChangeTimeout = window.setTimeout(() => {
        const newHash = window.location.hash;
        if (newHash !== currentHash) {
          setCurrentHash(newHash);
          
          // Smooth scroll to top for major section changes
          if (newHash === '' || newHash.startsWith('#recipe/') || newHash.startsWith('#recept/')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      }, 50);
    };

    // Optimized scroll animation with Intersection Observer
    const observeScrollTriggers = () => {
      const scrollTriggers = document.querySelectorAll('.scroll-trigger');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' }
      );
      
      scrollTriggers.forEach(element => {
        observer.observe(element);
      });
      
      return () => observer.disconnect();
    };

    // Event listeners with passive option for better performance
    window.addEventListener('hashchange', handleHashChange);
    const cleanupObserver = observeScrollTriggers();
    
    // Initial trigger
    setTimeout(observeScrollTriggers, 500);

    // Optimized page title and meta description updates
    const updatePageMeta = () => {
      let title = "MaykasKitchen - Autentisk assyrisk/syriansk matlagning med Mayka Gulo";
      let description = "Upptäck smakrika recept och matinspiration från Mayka Gulo, kock och matkreatör med assyrisk/syriansk tradition och passion för säsongsbaserad matlagning";
      
      const metaUpdates = {
        "#recipe/lax-risbowl": {
          title: "Kryddig lax- & risbowl - MaykasKitchen",
          description: "Recept på kryddig lax- & risbowl. Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen. Enkelt och smakrikt recept från MaykasKitchen."
        },
        "#recipe/kafta-bil-sejnie": {
          title: "Köttbullar i tomatsås (Kafta bil sejnie) - MaykasKitchen",
          description: "Autentiskt recept på mellanösterns köttbullar i tomatsås. En traditionell assyrisk/syriansk rätt med smakrik tomatsås från MaykasKitchen."
        },
        "#recipe/kofta-bil-sanieh": {
          title: "Köfta bil Sanieh - MaykasKitchen",
          description: "Autentiskt syriskt recept på Köfta bil Sanieh. Mellanösterns vardagsfavorit med kryddig köttfärs, potatis och padron paprika i mustig tomatsås."
        },
        "#recipe/pasta-pesto": {
          title: "Pasta pesto med ugnsbakade tomater & stekt halloumi - MaykasKitchen",
          description: "Smakrik pastarätt med krämig pestosås, ugnsbakade tomater och stekt halloumi - enkel att laga och älskad av hela familjen."
        },
        "#recipe/kyckling-shawarma": {
          title: "Kyckling Shawarma - MaykasKitchen",
          description: "Autentisk mellanöstern kyckling shawarma med hemmagjorda tunnbröd, kryddigt kött och fräscha tillbehör. Perfekt för familjen!"
        },
        "#recipe/pannpizzor": {
          title: "Snabba pannpizzor direkt i ugnsformen - MaykasKitchen",
          description: "Perfekt när du har kylskåpsrester att ta vara på! Enkla pannpizzor med hemmagjord deg som hela familjen älskar."
        },
        "#recipe/batata-harra": {
          title: "Batata Harra – Friterad potatis med tomatsås - MaykasKitchen",
          description: "En smakrik och kryddig libanesisk rätt med krispig potatis, het tomatsås och färska örter. Perfekt som meze eller huvudrätt!"
        }
      };

      if (currentHash.startsWith("#recept/")) {
        title = "Alla recept - MaykasKitchen";
        description = "Upptäck alla våra recept - från traditionella assyriska rätter till moderna tolkningar. Fisk, kött, vegetariskt och mycket mer hos MaykasKitchen.";
      } else if (metaUpdates[currentHash]) {
        ({ title, description } = metaUpdates[currentHash]);
      }
      
      // Batched DOM updates for better performance
      requestAnimationFrame(() => {
        document.title = title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute("content", description);
        }
      });
    };
    
    updatePageMeta();
    
    return () => {
      clearTimeout(timer);
      clearTimeout(hashChangeTimeout);
      window.removeEventListener('hashchange', handleHashChange);
      cleanupObserver();
    };
  }, [currentHash]);

  // Performance monitoring
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        if (loadTime > 3000) {
          console.warn(`Total page load time: ${loadTime.toFixed(2)}ms - Consider optimization`);
        }
      });
    }
  }, []);

  // Show loading screen with skeleton
  if (isLoading) {
    return isInitialLoad ? <LoadingSpinner /> : <HeroSkeleton />;
  }

  // Recipe pages with lazy loading and error boundary
  if (currentHash.startsWith("#recipe/")) {
    const recipeId = currentHash.replace("#recipe/", "");
    
    const RecipeComponent = () => {
      const recipeComponents = {
        "lax-risbowl": LaxRisbowlPost,
        "kafta-bil-sejnie": KaftaBilSejniePost,
        "kofta-bil-sanieh": KoftaBilSaniehPost,
        "pasta-pesto": PastaPestoPost,
        "kyckling-shawarma": KycklingShawarmaPost,
        "pannpizzor": PannpizzorPost,
        "batata-harra": BatataHarraPost
      };

      const Component = recipeComponents[recipeId];
      
      if (!Component) {
        // Redirect to home if recipe not found
        window.location.hash = '';
        return null;
      }

      return <Component />;
    };

    return (
      <ErrorBoundary>
        <FoodBlogBackground className="min-h-screen" variant="recipes">
          <div className="font-sans bg-transparent text-text-color relative z-10">
            <Header />
            <main id="main-content" role="main">
              <Suspense fallback={<LoadingSpinner />}>
                <RecipeComponent />
              </Suspense>
              <Newsletter />
            </main>
            <Footer />
          </div>
        </FoodBlogBackground>
      </ErrorBoundary>
    );
  }

  // Recipe list page with lazy loading
  if (currentHash.startsWith("#recept/")) {
    return (
      <ErrorBoundary>
        <FoodBlogBackground className="min-h-screen" variant="recipes">
          <div className="font-sans bg-transparent text-text-color relative z-10">
            <Header />
            <main id="main-content" role="main">
              <Suspense fallback={<LoadingSpinner />}>
                <RecipeList />
              </Suspense>
              <Newsletter />
            </main>
            <Footer />
          </div>
        </FoodBlogBackground>
      </ErrorBoundary>
    );
  }

  // Optimized home page with different variants for different sections
  return (
    <ErrorBoundary>
      <FoodBlogBackground className="min-h-screen" variant="default">
        <div className="font-sans bg-transparent text-text-color relative z-10">
          <Header />
          <main id="main-content" role="main">
            {/* Hero section with dark gradient background */}
            <Hero />
            
            <div className="section-divider" aria-hidden="true"></div>
            
            {/* Newsletter popup - återställd med 90 sekunders intervall */}
            <NewsletterPopup />
            
            {/* About section with about variant */}
            <FoodBlogBackground variant="about" className="relative">
              <AboutSection />
            </FoodBlogBackground>
            
            <div className="section-divider" aria-hidden="true"></div>
            
            {/* Recipe section with recipes variant */}
          <FoodBlogBackground variant="recipes" className="relative">
            <RecipeSection />
          </FoodBlogBackground>
          
          <div className="section-divider" aria-hidden="true"></div>
          
          {/* Collaboration section */}
          <CollaborationSection />
          
          <div className="section-divider" aria-hidden="true"></div>
          
          {/* Contact section */}
          <ContactSection />
          
          <Newsletter />
        </main>
        <Footer />
      </div>
    </FoodBlogBackground>
  </ErrorBoundary>
);
}

export default App;