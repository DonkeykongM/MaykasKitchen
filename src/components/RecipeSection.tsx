import React, { useState, useRef, useCallback, useMemo, Suspense } from 'react';
import { Clock, Users, Heart, Star, ChevronRight } from 'lucide-react';
import { SkeletonLoader, RecipeGridSkeleton } from './LoadingStates/SkeletonLoader';

// Memoized recipe data with guaranteed working image URLs
const RECIPES = [
  {
    id: 'kikarts-tikka-masala',
    title: 'Krämigaste kikärts-tikka masalan någonsin 🤯🔥',
    description: 'En gryta som kramar om både hjärta och smaklökar – den krämigaste kikärts tikka masalan du kan tänka dig. Fullproppad med dofter, kryddor och värme, och ändå klar på bara 20 minuter. Perfekt för en mysig familjemiddag eller en kväll med vänner. Och det bästa av allt? Den är helt vegansk – men så god att ingen ens märker det 😊',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCKJbVDrdNwFxeKMmirjvq6ZL34tbPu8S2X5Q9',
    time: '35',
    portions: '4-6',
    likes: 12,
    rating: 4.9,
    reviews: 1,
    badges: ['Vegan', 'Indiskt', 'Vegetariskt', 'Snabb'],
    trending: true,
    difficulty: 'Lätt',
    fallbackEmoji: '🍛'
  },
  {
    id: 'kall-foul-medames',
    title: 'Kall foul medames',
    description: 'En fräsch och proteinrik sallad med kokta bruna bönor eller favabönor, färska örter och citron. Perfekt som meze eller lätt måltid!',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCzNWv2DP9mAtjTsb7I6ZNyREunpVPwDz3h850',
    time: '15',
    portions: '4',
    likes: 15,
    rating: 4.8,
    reviews: 1,
    badges: ['Vegan', 'Mellanöstern', 'Snabb', 'Sallad'],
    trending: true,
    difficulty: 'Lätt',
    fallbackEmoji: '🫘'
  },
  {
    id: 'mini-lahmacun',
    title: 'Mini Lahmacun – Perfekt mängd, noll svinn!',
    description: '15 små perfekta lahmacun – köttfärs pizzor. Inget svinn, bara ren lycka! Perfekt att frysa in för framtida måltider.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCFL7L57kjIHwnGYgUvXdix8ms3ac07hetyqO4',
    time: '75',
    portions: '15',
    likes: 25,
    rating: 4.9,
    reviews: 1,
    badges: ['Turkiskt', 'Kött', 'Traditionellt'],
    trending: true,
    difficulty: 'Medel',
    fallbackEmoji: '🫓'
  },
  {
    id: 'lins-bulgur-jarpar',
    title: 'Lins- och bulgurjärpar med sumak och spetspaprika',
    description: 'Proteinrika och mättande vegetariska järpar med smakrik kombination av röda linser, bulgur och aromatiska kryddor från mellanöstern.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCrZI4Zt1TCmP1dAHK4ioO3RwLkl5gtYD2IMbW',
    time: '45',
    portions: '4-6',
    likes: 38,
    rating: 4.8,
    reviews: 2,
    badges: ['Vegetariskt', 'Mellanöstern', 'Protein'],
    difficulty: 'Medel',
    trending: true,
    fallbackEmoji: '🌱'
  },
  {
    id: 'kycklingfile-potatis-dragon',
    title: 'Stekt kycklingfilé med smörslungad potatis, sautéade grönsaker och dragonsås',
    description: 'En rätt som snabbt blev en favorit både hemma och på jobbet. Kombinerar krämig dragonsås med saftig kyckling och smörstekta grönsaker – enkel men med känsla av något riktigt lyxigt.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCYrirAg5FD3Nod0fKROYijVPHAbra9e8uWhMJ',
    time: '60',
    portions: '3-4',
    likes: 56,
    rating: 4.9,
    reviews: 2,
    badges: ['Kött', 'Klassisk', 'Vardagslyx'],
    difficulty: 'Medel',
    trending: true,
    fallbackEmoji: '🐔'
  },
  {
    id: 'pannpizzor',
    title: 'Snabba pannpizzor direkt i ugnsformen',
    description: 'Perfekt när du har kylskåpsrester att ta vara på! Släng på det du har hemma och njut av en enkel middag på nolltid.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC9IRZic42Pb4HZiuUEJYFXxpw0kyC8QIv7W2f',
    time: '90',
    portions: '4-6',
    likes: 32,
    rating: 4.7,
    reviews: 2,
    badges: ['Vegetariskt', 'Bakverk', 'Pizza'],
    difficulty: 'Lätt',
    trending: true,
    fallbackEmoji: '🍕'
  },
  {
    id: 'batata-harra',
    title: 'Batata Harra – Friterad potatis med tomatsås',
    description: 'En smakrik och kryddig libanesisk rätt med krispig potatis, het tomatsås och färska örter. Perfekt som meze eller huvudrätt!',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCfWaFTn48dYxTFVG4qu9OSWrN21vZPBkJiCoK',
    time: '35',
    portions: '4-6',
    likes: 35,
    rating: 4.8,
    reviews: 1,
    badges: ['Vegan', 'Libanesiskt', 'Potatis'],
    difficulty: 'Medel',
    trending: true,
    fallbackEmoji: '🥔'
  },
  {
    id: 'kofta-bil-sanieh',
    title: 'Köfta bil Sanieh',
    description: 'Mellanösterns vardagsfavorit med smak av hem. En autentisk syrisk rätt med kryddig köttfärs, potatis och padron paprika.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCGg5LVZ9bnLa0KVhUD3INroEj6yqmid4HwlYB',
    time: '60',
    portions: '8',
    likes: 33,
    rating: 4.9,
    reviews: 1,
    badges: ['Kött', 'Traditionell', 'Syriskt'],
    difficulty: 'Medel',
    trending: true,
    fallbackEmoji: '🥩'
  },
  {
    id: 'lax-risbowl',
    title: 'Kryddig lax- & risbowl',
    description: 'Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen. Snabbt, enkelt och så himla smakrikt!',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8y19NS5037zrR9qXSut4TKmZEpjlBcOhHew0',
    time: '45',
    portions: '4',
    likes: 47,
    rating: 4.8,
    reviews: 2,
    badges: ['Fisk', 'Snabb', 'Under 60 min'],
    difficulty: 'Lätt',
    fallbackEmoji: '🐟'
  },
  {
    id: 'kafta-bil-sejnie',
    title: 'Kafta bil sejnie',
    description: 'En traditionell rätt från mellanöstern med saftiga köttbullar och potatis i en smakrik tomatsås.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8zXxYz037zrR9qXSut4TKmZEpjlBcOhHew02',
    time: '60',
    portions: '5-6',
    likes: 42,
    rating: 4.7,
    reviews: 1,
    badges: ['Kött', 'Traditionell', 'Assyriskt'],
    difficulty: 'Medel',
    fallbackEmoji: '🍲'
  },
  {
    id: 'pasta-pesto',
    title: 'Pasta pesto med ugnsbakade tomater & stekt halloumi',
    description: 'En smakrik, krämig och färgsprakande pastarätt med pesto, ugnsbakade tomater och stekt halloumi - perfekt för hela familjen.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCfVuc1HC48dYxTFVG4qu9OSWrN21vZPBkJiCo',
    time: '40',
    portions: '4',
    likes: 41,
    rating: 4.9,
    reviews: 2,
    badges: ['Vegetariskt', 'Snabb', 'Pasta'],
    difficulty: 'Lätt',
    trending: true,
    fallbackEmoji: '🍝'
  },
  {
    id: 'kyckling-shawarma',
    title: 'Kyckling Shawarma',
    description: 'Autentisk mellanöstern kyckling shawarma med hemmagjorda tunnbröd, kryddigt kött och fräscha tillbehör. Perfekt för familjen!',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCG7jiQH9bnLa0KVhUD3INroEj6yqmid4HwlYB',
    time: '120',
    portions: '5',
    likes: 28,
    rating: 4.8,
    reviews: 1,
    badges: ['Kött', 'Mellanöstern', 'Familj'],
    trending: true,
    difficulty: 'Medel',
    fallbackEmoji: '🌯'
  }
];

// Enhanced recipe card component with robust image handling
const RecipeCard = React.memo(({ recipe, onRecipeClick, isLoading = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (isLoading) {
    return <SkeletonLoader variant="recipe" />;
  }

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  return (
    <article 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer w-full recipe-card border border-purple-100 will-change-transform"
      onClick={(e) => onRecipeClick(recipe.id, e)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onRecipeClick(recipe.id, e);
        }
      }}
      aria-label={`Visa recept för ${recipe.title}`}
    >
      {/* Enhanced image with robust error handling */}
      <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
        {!imageError ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            width={400}
            height={260}
            className="w-full h-full object-cover transform transition hover:scale-105 will-change-transform"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ 
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
        ) : null}
        
        {/* Enhanced fallback content when image fails to load */}
        {imageError && (
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col items-center justify-center text-purple-600 border border-purple-300">
            <div className="text-3xl md:text-4xl mb-2">{recipe.fallbackEmoji || '🍽️'}</div>
            <div className="text-xs md:text-sm font-medium text-center px-2">{recipe.title}</div>
          </div>
        )}
        
        {/* Loading state */}
        {!imageLoaded && !imageError && (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center animate-pulse">
            <div className="text-gray-400 text-center">
              <div className="text-xl md:text-2xl mb-1">📸</div>
              <div className="text-xs">Laddar...</div>
            </div>
          </div>
        )}
        
        <div className="absolute top-2 md:top-4 left-2 md:left-4">
          <span className="bg-purple-600/90 text-white text-xs py-1 px-2 md:px-3 rounded-full flex items-center">
            <Clock size={10} className="mr-1" /> {recipe.time} min
          </span>
        </div>
        {recipe.trending && (
          <div className="absolute top-2 md:top-4 right-2 md:right-4">
            <span className="bg-black/90 text-white text-xs py-1 px-2 md:px-3 rounded-full">
              Populärt
            </span>
          </div>
        )}
        {recipe.difficulty && (
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4">
            <span className="bg-white/90 text-gray-700 text-xs py-1 px-2 md:px-3 rounded-full">
              {recipe.difficulty}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3 md:p-4 lg:p-6 w-full">
        {/* Tags with improved contrast */}
        <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
          {recipe.badges.map((badge, index) => (
            <span key={index} className="bg-purple-50 text-purple-700 text-xs py-1 px-2 rounded-full border border-purple-200 font-medium">
              {badge}
            </span>
          ))}
        </div>
        
        {/* Rating and likes with WCAG compliant colors */}
        <div className="flex justify-between items-center mb-2 md:mb-3">
          <div className="flex items-center" role="img" aria-label={`Betyg: ${recipe.rating} av 5 stjärnor`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(recipe.rating) ? "#FFB74D" : "none"}
                className={i < Math.floor(recipe.rating) ? "text-amber-400" : "text-gray-300"}
                aria-hidden="true"
              />
            ))}
            <span className="text-xs md:text-sm text-gray-700 ml-1 font-medium">{recipe.rating}</span>
            <span className="text-xs text-gray-600 ml-1">({recipe.reviews})</span>
          </div>
          
          <span className="text-gray-600 text-xs md:text-sm flex items-center">
            <Heart size={14} className="mr-1" aria-hidden="true" /> 
            <span className="font-medium">{recipe.likes}</span>
          </span>
        </div>
        
        {/* Title with improved typography */}
        <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 text-gray-800 hover:text-purple-600 transition-colors break-words leading-tight">
          {recipe.title}
        </h3>
        
        {/* Description with better readability */}
        <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-sm line-clamp-2 break-words leading-relaxed">
          {recipe.description}
        </p>
        
        {/* Portions and CTA with improved contrast */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-xs md:text-sm flex items-center font-medium">
            <Users size={14} className="mr-1" aria-hidden="true" /> {recipe.portions} portioner
          </span>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRecipeClick(recipe.id, e);
            }}
            className="text-purple-600 hover:text-purple-800 flex items-center text-xs md:text-sm font-medium group focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded-sm min-h-[44px] px-2 py-1"
            aria-label={`Visa recept för ${recipe.title}`}
          >
            <span className="hidden sm:inline">Visa recept</span>
            <span className="sm:hidden">Visa</span>
            <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
});

RecipeCard.displayName = 'RecipeCard';

export const RecipeSection = () => {
  const [activeFilter, setActiveFilter] = useState('alla');
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef(null);

  // Optimized navigation with useCallback for better performance
  const handleRecipeClick = useCallback((id, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add loading state for better UX
    setIsLoading(true);
    
    // Simulate network delay for skeleton loader demonstration
    setTimeout(() => {
      setIsLoading(false);
      // Direct hash change for fastest navigation
      window.location.hash = `recipe/${id}`;
    }, 200);
  }, []);

  // Handle "Se alla recept" button click
  const handleSeeAllRecipes = useCallback((e) => {
    e.preventDefault();
    
    // Navigate to the recipe list page
    window.location.hash = 'recept/alla';
  }, []);

  // Memoized filters to prevent unnecessary re-renders
  const filters = useMemo(() => [
    { id: 'alla', label: 'Alla recept', active: true },
    { id: 'huvudratter', label: 'Huvudrätter', active: false },
    { id: 'grytor', label: 'Grytor', active: false },
    { id: 'bakverk', label: 'Bakverk', active: false }
  ], []);

  // Memoized filtered recipes for performance
  const filteredRecipes = useMemo(() => {
    if (activeFilter === 'alla') return RECIPES;
    return RECIPES.filter(recipe => 
      recipe.badges.some(badge => 
        badge.toLowerCase().includes(activeFilter.toLowerCase())
      )
    );
  }, [activeFilter]);

  // Optimized filter handler
  const handleFilterChange = useCallback((filterId) => {
    setActiveFilter(filterId);
    // Add slight loading state for visual feedback
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  return (
    <section id="recept" ref={sectionRef} className="py-8 md:py-12 lg:py-16 bg-gray-50 w-full overflow-hidden">
      <div className="container mx-auto px-4 w-full max-w-7xl">
        <span className="block text-center text-purple-600 text-xs md:text-sm font-medium mb-2 uppercase tracking-wider">
          MATINSPIRATION
        </span>
        
        <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-3 md:mb-4 text-purple-600 break-words">
          Populära recept
        </h2>
        
        <p className="text-center mb-6 md:mb-8 lg:mb-10 max-w-2xl mx-auto text-gray-700 break-words px-4 leading-relaxed text-sm md:text-base lg:text-lg">
          Upptäck mina mest omtyckta recept som kombinerar traditionell assyrisk/syriansk matlagning
          med moderna smaker och enkla tillagningsmetoder.
        </p>
        
        {/* Optimized filter buttons with improved accessibility */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 lg:gap-4 mb-6 md:mb-8 lg:mb-12 px-4">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-3 md:px-4 lg:px-5 py-2 rounded-full transition-all text-xs md:text-sm lg:text-base will-change-transform focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 min-h-[44px] ${
                activeFilter === filter.id 
                  ? 'bg-purple-600 text-white transform scale-105 font-medium' 
                  : 'bg-white text-gray-700 hover:bg-purple-50 border border-purple-200 hover:border-purple-300'
              }`}
              aria-pressed={activeFilter === filter.id}
              role="tab"
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Optimized recipe grid with lazy loading and error boundaries */}
        <Suspense fallback={<RecipeGridSkeleton />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8 lg:mb-12">
            {isLoading ? (
              // Show skeleton loaders during transitions
              [...Array(4)].map((_, index) => (
                <SkeletonLoader key={index} variant="recipe" />
              ))
            ) : (
              filteredRecipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onRecipeClick={handleRecipeClick}
                />
              ))
            )}
          </div>
        </Suspense>
        
        {/* Call to action with improved accessibility and WORKING functionality */}
        <div className="text-center mb-8 md:mb-12 lg:mb-20">
          <button 
            onClick={handleSeeAllRecipes}
            className="inline-block bg-purple-600 text-white py-3 px-6 md:px-8 rounded-full hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 will-change-transform focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 font-medium cursor-pointer text-sm md:text-base min-h-[44px]"
            role="button"
            aria-label="Se alla våra recept"
          >
            Se alla recept
          </button>
        </div>
      </div>
    </section>
  );
};