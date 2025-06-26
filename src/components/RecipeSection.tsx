import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Clock, Users, Heart, Star, ChevronRight } from 'lucide-react';
import { LazyImage } from './Performance/LazyImage';

// Memoized recipe data to prevent unnecessary re-renders
const RECIPES = [
  {
    id: 'kofta-bil-sanieh',
    title: 'Köfta bil Sanieh',
    description: 'Mellanösterns vardagsfavorit med smak av hem. En autentisk syrisk rätt med kryddig köttfärs, potatis och padron paprika.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCGg5LVZ9bnLa0KVhUD3INroEj6yqmid4HwlYB',
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
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8y19NS5037zrR9qXSut4TKmZEpjlBcOhHew0',
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
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC2bVVcBHX4Xuw0sOU5gWozk6clEfde8bBYInQ',
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
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCfVuc1HC48dYxTFVG4qu9OSWrN21vZPBkJiCo',
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
const RecipeCard = React.memo(({ recipe, onRecipeClick }) => (
  <article 
    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer w-full recipe-card border border-purple-100 will-change-transform"
    onClick={(e) => onRecipeClick(recipe.id, e)}
  >
    {/* Optimized image with lazy loading */}
    <div className="relative h-48 md:h-52 overflow-hidden">
      <LazyImage
        src={recipe.image}
        alt={recipe.title}
        width={400}
        height={260}
        className="w-full h-full object-cover transform transition hover:scale-105 will-change-transform"
        loading="lazy"
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
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {recipe.badges.map((badge, index) => (
          <span key={index} className="bg-purple-50 text-purple-600 text-xs py-1 px-2 rounded-full border border-purple-200">
            {badge}
          </span>
        ))}
      </div>
      
      {/* Rating and likes */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < Math.floor(recipe.rating) ? "#FFB74D" : "none"}
              className={i < Math.floor(recipe.rating) ? "text-amber-400" : "text-gray-300"}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">{recipe.rating}</span>
          <span className="text-xs text-gray-500 ml-1">({recipe.reviews})</span>
        </div>
        
        <span className="text-gray-500 text-sm flex items-center">
          <Heart size={16} className="mr-1" /> {recipe.likes}
        </span>
      </div>
      
      {/* Title */}
      <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800 hover:text-purple-600 transition-colors break-words">
        {recipe.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 mb-4 text-sm line-clamp-2 break-words">
        {recipe.description}
      </p>
      
      {/* Portions and CTA */}
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm flex items-center">
          <Users size={16} className="mr-1" /> {recipe.portions} portioner
        </span>
        
        <button
          onClick={(e) => onRecipeClick(recipe.id, e)}
          className="text-purple-600 hover:text-black flex items-center text-sm font-medium group"
        >
          Visa recept
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </article>
));

RecipeCard.displayName = 'RecipeCard';

export const RecipeSection = () => {
  const [activeFilter, setActiveFilter] = useState('alla');
  const sectionRef = useRef(null);

  // Optimized navigation with useCallback for better performance
  const handleRecipeClick = useCallback((id, e) => {
    e.preventDefault();
    e.stopPropagation();
    // Direct hash change for fastest navigation
    window.location.hash = `recipe/${id}`;
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

  return (
    <section id="recept" ref={sectionRef} className="py-12 md:py-16 bg-gray-50 w-full overflow-hidden">
      <div className="container mx-auto px-4 w-full max-w-7xl">
        <span className="block text-center text-purple-600 text-sm font-medium mb-2 uppercase tracking-wider">
          MATINSPIRATION
        </span>
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 text-purple-600 break-words">
          Populära recept
        </h2>
        
        <p className="text-center mb-8 md:mb-10 max-w-2xl mx-auto text-gray-600 break-words px-4">
          Upptäck mina mest omtyckta recept som kombinerar traditionell assyrisk/syriansk matlagning
          med moderna smaker och enkla tillagningsmetoder.
        </p>
        
        {/* Optimized filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 md:px-5 py-2 rounded-full transition-all text-sm md:text-base will-change-transform ${
                activeFilter === filter.id ? 'bg-purple-600 text-white transform scale-105' : 'bg-white text-gray-600 hover:bg-purple-50 border border-purple-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Optimized recipe grid with lazy loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {filteredRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onRecipeClick={handleRecipeClick}
            />
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mb-16 md:mb-20">
          <a 
            href="#recept/alla"
            className="inline-block bg-purple-600 text-white py-3 px-6 md:px-8 rounded-full hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 will-change-transform"
          >
            Se alla recept
          </a>
        </div>
      </div>
    </section>
  );
};