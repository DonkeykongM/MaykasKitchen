import React, { useState, useRef, useCallback, useMemo, Suspense } from 'react';
import { Clock, Users, Heart, Star, ChevronRight } from 'lucide-react';
import { SkeletonLoader, RecipeGridSkeleton } from './LoadingStates/SkeletonLoader';

// Memoized recipe data with working image URLs
const RECIPES = [
  {
    id: 'kofta-bil-sanieh',
    title: 'Köfta bil Sanieh',
    description: 'Mellanösterns vardagsfavorit med smak av hem. En autentisk syrisk rätt med kryddig köttfärs, potatis och padron paprika.',
    image: 'https://images.pexels.com/photos/3026801/pexels-photo-3026801.jpeg?auto=compress&cs=tinysrgb&w=800',
    time: '60',
    portions: '8',
    likes: 89,
    rating: 4.9,
    reviews: 45,
    badges: ['Kött', 'Traditionell', 'Syriskt'],
    difficulty: 'Medel',
    trending: true
  },
  {
    id: 'lax-risbowl',
    title: 'Kryddig lax- & risbowl',
    description: 'Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen. Snabbt, enkelt och så himla smakrikt!',
    image: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=800',
    time: '45',
    portions: '4',
    likes: 156,
    rating: 4.9,
    reviews: 87,
    badges: ['Fisk', 'Snabb', 'Under 60 min'],
    difficulty: 'Lätt'
  },
  {
    id: 'kafta-bil-sejnie',
    title: 'Kafta bil sejnie',
    description: 'En traditionell rätt från mellanöstern med saftiga köttbullar och potatis i en smakrik tomatsås.',
    image: 'https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg?auto=compress&cs=tinysrgb&w=800',
    time: '60',
    portions: '5-6',
    likes: 134,
    rating: 4.8,
    reviews: 73,
    badges: ['Kött', 'Traditionell', 'Assyriskt'],
    difficulty: 'Medel'
  },
  {
    id: 'pasta-pesto',
    title: 'Pasta pesto med ugnsbakade tomater & stekt halloumi',
    description: 'En smakrik, krämig och färgsprakande pastarätt med pesto, ugnsbakade tomater och stekt halloumi - perfekt för hela familjen.',
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800',
    time: '40',
    portions: '4',
    likes: 142,
    rating: 4.9,
    reviews: 79,
    badges: ['Vegetariskt', 'Snabb', 'Pasta'],
    difficulty: 'Lätt',
    trending: true
  }
];

// Memoized recipe card component for better performance
const RecipeCard = React.memo(({ recipe, onRecipeClick, isLoading = false }) => {
  if (isLoading) {
    return <SkeletonLoader variant="recipe" />;
  }

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
      {/* Optimized image with proper lazy loading */}
      <div className="relative h-48 md:h-52 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          width={400}
          height={260}
          className="w-full h-full object-cover transform transition hover:scale-105 will-change-transform"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-purple-600/90 text-white text-xs py-1 px-3 rounded-full flex items-center">
            <Clock size={12} className="mr-1" /> {recipe.time} min
          </span>
        </div>
        {recipe.trending && (
          <div className="absolute top-4 right-4">
            <span className="bg-black/90 text-white text-xs py-1 px-3 rounded-full">
              Populärt
            </span>
          </div>
        )}
        {recipe.difficulty && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-white/90 text-gray-700 text-xs py-1 px-3 rounded-full">
              {recipe.difficulty}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 md:p-6 w-full">
        {/* Tags with improved contrast */}
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.badges.map((badge, index) => (
            <span key={index} className="bg-purple-50 text-purple-700 text-xs py-1 px-2 rounded-full border border-purple-200 font-medium">
              {badge}
            </span>
          ))}
        </div>
        
        {/* Rating and likes with WCAG compliant colors */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center" role="img" aria-label={`Betyg: ${recipe.rating} av 5 stjärnor`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(recipe.rating) ? "#FFB74D" : "none"}
                className={i < Math.floor(recipe.rating) ? "text-amber-400" : "text-gray-300"}
                aria-hidden="true"
              />
            ))}
            <span className="text-sm text-gray-700 ml-1 font-medium">{recipe.rating}</span>
            <span className="text-xs text-gray-600 ml-1">({recipe.reviews})</span>
          </div>
          
          <span className="text-gray-600 text-sm flex items-center">
            <Heart size={16} className="mr-1" aria-hidden="true" /> 
            <span className="font-medium">{recipe.likes}</span>
          </span>
        </div>
        
        {/* Title with improved typography */}
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800 hover:text-purple-600 transition-colors break-words leading-tight">
          {recipe.title}
        </h3>
        
        {/* Description with better readability */}
        <p className="text-gray-600 mb-4 text-sm line-clamp-2 break-words leading-relaxed">
          {recipe.description}
        </p>
        
        {/* Portions and CTA with improved contrast */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm flex items-center font-medium">
            <Users size={16} className="mr-1" aria-hidden="true" /> {recipe.portions} portioner
          </span>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRecipeClick(recipe.id, e);
            }}
            className="text-purple-600 hover:text-purple-800 flex items-center text-sm font-medium group focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded-sm"
            aria-label={`Visa recept för ${recipe.title}`}
          >
            Visa recept
            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
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
    <section id="recept" ref={sectionRef} className="py-12 md:py-16 bg-gray-50 w-full overflow-hidden">
      <div className="container mx-auto px-4 w-full max-w-7xl">
        <span className="block text-center text-purple-600 text-sm font-medium mb-2 uppercase tracking-wider">
          MATINSPIRATION
        </span>
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 text-purple-600 break-words">
          Populära recept
        </h2>
        
        <p className="text-center mb-8 md:mb-10 max-w-2xl mx-auto text-gray-700 break-words px-4 leading-relaxed">
          Upptäck mina mest omtyckta recept som kombinerar traditionell assyrisk/syriansk matlagning
          med moderna smaker och enkla tillagningsmetoder.
        </p>
        
        {/* Optimized filter buttons with improved accessibility */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-4 md:px-5 py-2 rounded-full transition-all text-sm md:text-base will-change-transform focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 min-h-[44px] ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
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
        
        {/* Call to action with improved accessibility */}
        <div className="text-center mb-16 md:mb-20">
          <a 
            href="#recept/alla"
            className="inline-block bg-purple-600 text-white py-3 px-6 md:px-8 rounded-full hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 will-change-transform focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 font-medium"
            role="button"
          >
            Se alla recept
          </a>
        </div>
      </div>
    </section>
  );
};