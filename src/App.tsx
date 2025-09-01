import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { RecipeSection } from './components/RecipeSection';
import { BlogSection } from './components/BlogSection';
import { CollaborationSection } from './components/CollaborationSection';
import { ContactSection } from './components/ContactSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

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
const LinsBulgurJarparPost = lazy(() => import('./components/BlogPost').then(module => ({ default: module.LinsBulgurJarparPost })));
const MiniLahmacunPost = lazy(() => import('./components/BlogPost').then(module => ({ default: module.MiniLahmacunPost })));
const KallFoulMedamesPost = lazy(() => import('./components/BlogPost').then(module => ({ default: module.KallFoulMedamesPost })));
const KikartsTikkaMasalaPost = lazy(() => import('./components/BlogPost').then(module => ({ default: module.KikartsTikkaMasalaPost })));
const QrimyotheMunkarPost = lazy(() => import('./components/BlogPost').then(module => ({ default: module.QrimyotheMunkarPost })));

// Enhanced loading component with skeleton states
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
      <p className="text-purple-600 font-medium">Laddar...</p>
    </div>
  </div>
);

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simple hash change detection
    const handleHashChange = () => {
      const newHash = window.location.hash;
      setCurrentHash(newHash);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentHash]);

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
        "batata-harra": BatataHarraPost,
        "kycklingfile-potatis-dragon": KycklingfilePotatisDragonPost,
        "lins-bulgur-jarpar": LinsBulgurJarparPost,
        "mini-lahmacun": MiniLahmacunPost,
        "kall-foul-medames": KallFoulMedamesPost,
        "kikarts-tikka-masala": KikartsTikkaMasalaPost,
        "qrimyothe-munkar": QrimyotheMunkarPost
      };

      const Component = recipeComponents[recipeId];
      
      if (!Component) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recept inte hittat</h2>
              <button 
                onClick={() => window.location.hash = ''}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Tillbaka till startsidan
              </button>
            </div>
          </div>
        );
      }

      return <Component />;
    };

    return (
      <div className="font-sans bg-white text-gray-800">
        <Header />
        <main id="main-content" role="main">
          <Suspense fallback={<LoadingSpinner />}>
            <RecipeComponent />
          </Suspense>
          <Newsletter />
        </main>
        <Footer />
      </div>
    );
  }

  // Recipe list page with lazy loading
  if (currentHash.startsWith("#recept/")) {
    return (
      <div className="font-sans bg-gray-50 text-gray-800">
        <Header />
        <main id="main-content" role="main">
          <Suspense fallback={<LoadingSpinner />}>
            <RecipeList />
          </Suspense>
          <Newsletter />
        </main>
        <Footer />
      </div>
    );
  }

  // Home page
  return (
    <div className="font-sans bg-white text-gray-800">
      <Header />
      <main id="main-content" role="main">
        <Hero />
        <AboutSection />
        <RecipeSection />
        <BlogSection />
        <CollaborationSection />
        <ContactSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;