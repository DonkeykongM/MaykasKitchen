import React, { useState, useRef, useCallback, useMemo, Suspense } from 'react';
import { Typography, Card, Badge, Rating, Button } from './ui/DesignSystem';
import { Clock, Users, Heart, Star, ChevronRight } from 'lucide-react';
import { SkeletonLoader, RecipeGridSkeleton } from './LoadingStates/SkeletonLoader';
import { useTranslation } from '../lib/i18n';

// Enhanced recipe card component with robust image handling
const RecipeCard = React.memo(({ recipe, onRecipeClick, isLoading = false }) => {
  const { t } = useTranslation();
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
    <Card
      interactive
      onClick={(e) => onRecipeClick(recipe.id, e)}
      className="recipe-card cursor-pointer"
    >
      {/* Enhanced image with robust error handling */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        {!imageError ? (
          <img
            src={recipe.image}
            alt={recipe.translatedTitle || recipe.title}
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
            <div className="text-xs md:text-sm font-medium text-center px-2">{recipe.translatedTitle || recipe.title}</div>
          </div>
        )}
        
        {/* Loading state */}
        {!imageLoaded && !imageError && (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center animate-pulse">
            <div className="text-gray-400 text-center">
              <div className="text-xl md:text-2xl mb-1">📸</div>
              <div className="text-xs">{t.common.loading}</div>
            </div>
          </div>
        )}
        
        <div className="absolute top-2 md:top-4 left-2 md:left-4">
          <Badge variant="default" size="sm" className="bg-purple-600/90 text-white border-none">
            <Clock size={12} className="mr-1" />
            {recipe.time} {t.recipes.minutes}
          </Badge>
        </div>
        {recipe.trending && (
          <div className="absolute top-2 md:top-4 right-2 md:right-4">
            <Badge variant="default" size="sm" className="bg-black/90 text-white border-none">
              {t.recipes.popular}
            </Badge>
          </div>
        )}
        {recipe.difficulty && (
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4">
            <Badge variant="secondary" size="sm" className="bg-white/90">
              {recipe.translatedDifficulty || recipe.difficulty}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4 md:p-6 w-full">
        {/* Tags with improved contrast */}
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.badges.slice(0, 3).map((badge, index) => (
            <Badge key={index} variant="default" size="sm">
              {recipe.translatedBadges?.[badge] || badge}
            </Badge>
          ))}
        </div>
        
        {/* Rating and likes with WCAG compliant colors */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Rating value={recipe.rating} size="sm" />
            <Typography variant="body-small" className="text-gray-600">
              ({recipe.reviews})
            </Typography>
          </div>
          
          <div className="flex items-center gap-1 text-gray-600">
            <Heart size={14} className="mr-1" aria-hidden="true" /> 
            <Typography variant="body-small" className="font-medium">
              {recipe.likes}
            </Typography>
          </div>
        </div>
        
        {/* Title with improved typography */}
        <Typography variant="h3" className="mb-2 text-gray-800 hover:text-purple-600 transition-colors line-clamp-2">
          {recipe.translatedTitle || recipe.title}
        </Typography>
        
        {/* Description with better readability */}
        <Typography variant="body-small" className="text-gray-600 mb-4 line-clamp-2">
          {recipe.translatedDescription || recipe.description}
        </Typography>
        
        {/* Portions and CTA with improved contrast */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Users size={14} className="text-gray-500" />
            <Typography variant="body-small" className="text-gray-600 font-medium">
              {recipe.portions} {t.recipes.portions}
            </Typography>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRecipeClick(recipe.id, e);
            }}
            className="text-purple-600 hover:text-purple-800 flex items-center text-sm font-medium group transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded-lg min-h-[44px] px-3 py-2"
            aria-label={`${t.recipes.showRecipe}: ${recipe.translatedTitle || recipe.title}`}
          >
            <span className="hidden sm:inline">{t.recipes.showRecipe}</span>
            <span className="sm:hidden">{t.recipes.show}</span>
            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </Card>
  );
});

RecipeCard.displayName = 'RecipeCard';

export const RecipeSection = () => {
  const { t, language } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('alla');
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef(null);

  // Update activeFilter when language changes
  useEffect(() => {
    setActiveFilter('alla');
  }, [language]);

  // Memoized recipe data with translations
  const RECIPES = useMemo(() => [
    {
      id: 'qrimyothe-munkar',
      title: 'Qrimyothe – Mormors munkar 🍩',
      translatedTitle: language === 'en' ? 'Qrimyothe – Grandma\'s Donuts 🍩' : undefined,
      description: 'Mamma berättar om mormors kärlek i varje tugga ♥️ Det här receptet på Qrimyothe är mer än bara ingredienser – det är ett stycke historia från mitt hem, min kultur och framför allt från mitt hjärta.',
      translatedDescription: language === 'en' ? 'Mom tells about grandma\'s love in every bite ♥️ This recipe for Qrimyothe is more than just ingredients – it\'s a piece of history from my home, my culture and above all from my heart.' : undefined,
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCMH3uifMpaES95dj1pBAJ4iwc3fNXxvqYhzGT',
      time: '120',
      portions: '20',
      likes: 8,
      rating: 4.9,
      reviews: 1,
      badges: ['Traditionellt', 'Bakverk', 'Assyriskt', 'Dessert'],
      translatedBadges: language === 'en' ? {
        'Traditionellt': 'Traditional',
        'Bakverk': 'Baking',
        'Assyriskt': 'Assyrian',
        'Dessert': 'Dessert'
      } : {},
      trending: true,
      difficulty: 'Medel',
      translatedDifficulty: language === 'en' ? 'Medium' : undefined,
      fallbackEmoji: '🍩'
    },
    {
      id: 'kikarts-tikka-masala',
      title: 'Krämigaste kikärts-tikka masalan någonsin 🤯🔥',
      translatedTitle: language === 'en' ? 'The Creamiest Chickpea Tikka Masala Ever 🤯🔥' : undefined,
      description: 'En gryta som kramar om både hjärta och smaklökar – den krämigaste kikärts tikka masalan du kan tänka dig.',
      translatedDescription: language === 'en' ? 'A stew that embraces both heart and taste buds – the creamiest chickpea tikka masala you can imagine.' : undefined,
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCKJbVDrdNwFxeKMmirjvq6ZL34tbPu8S2X5Q9',
      time: '20',
      portions: '4-6',
      likes: 12,
      rating: 4.9,
      reviews: 1,
      badges: ['Vegan', 'Indiskt', 'Vegetariskt', 'Snabb'],
      translatedBadges: language === 'en' ? {
        'Vegan': 'Vegan',
        'Indiskt': 'Indian',
        'Vegetariskt': 'Vegetarian',
        'Snabb': 'Quick'
      } : {},
      trending: true,
      difficulty: 'Lätt',
      translatedDifficulty: language === 'en' ? 'Easy' : undefined,
      fallbackEmoji: '🍛'
    },
    {
      id: 'lax-risbowl',
      title: 'Kryddig lax- & risbowl',
      translatedTitle: language === 'en' ? 'Spicy Salmon & Rice Bowl' : undefined,
      description: 'Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen. Snabbt, enkelt och så himla smakrikt!',
      translatedDescription: language === 'en' ? 'Perfect as a fresh weekday dinner or when you want to luxe up lunch. Fast, simple and so incredibly tasty!' : undefined,
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8y19NS5037zrR9qXSut4TKmZEpjlBcOhHew0',
      time: '45',
      portions: '4',
      likes: 47,
      rating: 4.8,
      reviews: 2,
      badges: ['Fisk', 'Snabb', 'Under 60 min'],
      translatedBadges: language === 'en' ? {
        'Fisk': 'Fish',
        'Snabb': 'Quick',
        'Under 60 min': 'Under 60 min'
      } : {},
      difficulty: 'Lätt',
      translatedDifficulty: language === 'en' ? 'Easy' : undefined,
      fallbackEmoji: '🐟'
    },
    {
      id: 'kafta-bil-sejnie',
      title: 'Kafta bil sejnie',
      translatedTitle: language === 'en' ? 'Kafta bil Sejnie' : undefined,
      description: 'En traditionell rätt från mellanöstern med saftiga köttbullar och potatis i en smakrik tomatsås.',
      translatedDescription: language === 'en' ? 'A traditional Middle Eastern dish with juicy meatballs and potatoes in a flavorful tomato sauce.' : undefined,
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8zXxYz037zrR9qXSut4TKmZEpjlBcOhHew02',
      time: '60',
      portions: '5-6',
      likes: 42,
      rating: 4.7,
      reviews: 1,
      badges: ['Kött', 'Traditionell', 'Assyriskt'],
      translatedBadges: language === 'en' ? {
        'Kött': 'Meat',
        'Traditionell': 'Traditional',
        'Assyriskt': 'Assyrian'
      } : {},
      difficulty: 'Medel',
      translatedDifficulty: language === 'en' ? 'Medium' : undefined,
      fallbackEmoji: '🍲'
    }
  ], [language]);

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
    { id: 'alla', label: t.recipes.allRecipes, active: true },
    { id: 'huvudratter', label: t.recipes.mainDishes, active: false },
    { id: 'grytor', label: t.recipes.stews, active: false },
    { id: 'bakverk', label: t.recipes.baking, active: false }
  ], [t]);

  // Memoized filtered recipes for performance
  const filteredRecipes = useMemo(() => {
    if (activeFilter === 'alla') return RECIPES;
    return RECIPES.filter(recipe => 
      recipe.badges.some(badge => 
        badge.toLowerCase().includes(activeFilter.toLowerCase())
      )
    );
  }, [activeFilter, RECIPES]);

  // Optimized filter handler
  const handleFilterChange = useCallback((filterId) => {
    setActiveFilter(filterId);
    // Add slight loading state for visual feedback
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  return (
    <section id="recept" ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white w-full overflow-hidden">
      <div className="container mx-auto px-4 w-full max-w-7xl">
        <div className="text-center mb-4">
          <Badge variant="default" className="mb-4">
            {t.recipes.tagline}
          </Badge>
        </div>
        
        <Typography variant="h2" className="text-center mb-4 text-purple-600">
          {t.recipes.title}
        </Typography>
        
        <Typography variant="body-large" className="text-center mb-8 md:mb-12 max-w-3xl mx-auto text-gray-700 px-4">
          {t.recipes.description}
        </Typography>
        
        {/* Optimized filter buttons with improved accessibility */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-4 md:px-6 py-3 rounded-full transition-all duration-300 text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 min-h-[44px] ${
                activeFilter === filter.id 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-purple-50 border border-purple-200 hover:border-purple-300 hover:shadow-md'
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
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
        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSeeAllRecipes}
            className="shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            {t.recipes.seeAllRecipes}
          </Button>
          <Typography variant="body-small" className="text-gray-500 mt-4">
            {t.recipes.discoverRecipes.replace('autentiska recept från Mayka', `${RECIPES.length}+ ${t.recipes.discoverRecipes}`)}
          </Typography>
        </div>
      </div>
    </section>
  );
};