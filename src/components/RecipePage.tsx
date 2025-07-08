import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, Search, Filter, Clock, Users, Heart, Star, Tag, ArrowRight, ChevronDown } from 'lucide-react';

export const RecipePage = () => {
  const [initialRecipes, setInitialRecipes] = useState([
    {
      id: 'lax-risbowl',
      title: 'Kryddig lax- & risbowl',
      description: 'Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen. Snabbt, enkelt och så himla smakrikt!',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8y19NS5037zrR9qXSut4TKmZEpjlBcOhHew0',
      time: '45',
      category: 'huvudratt',
      likes: 124,
      rating: 4.9,
      reviews: 78,
      portions: '4',
      badges: ['Fisk', 'Snabb', 'Under 60 min'],
      tags: ['lax', 'ris', 'fisk', 'snabb middag', 'hälsosam', 'vardagsmat'],
      trending: true,
      featured: true,
      videoUrl: 'https://www.instagram.com/reel/DJXHMYpCoaR/'
    },
    {
      id: 'kafta-bil-sejnie',
      title: 'Kafta bil sejnie',
      description: 'En traditionell rätt från mellanöstern med saftiga köttbullar och potatis i en smakrik tomatsås.',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC2bVVcBHX4Xuw0sOU5gWozk6clEfde8bBYInQ',
      time: '60',
      category: 'huvudratt',
      likes: 98,
      rating: 4.8,
      reviews: 56,
      portions: '5-6',
      badges: ['Kött', 'Traditionell', 'Assyriskt'],
      tags: ['köttbullar', 'tomatsås', 'mellanöstern', 'assyrisk mat', 'traditionell'],
      featured: true,
      videoUrl: 'https://www.instagram.com/reel/DJT6lr7iPsV/'
    },
    {
      id: 'pasta-pesto',
      title: 'Pasta pesto med ugnsbakade tomater & stekt halloumi',
      description: 'En smakrik, krämig och färgsprakande pastarätt med pesto, ugnsbakade tomater och stekt halloumi - perfekt för hela familjen.',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCfVuc1HC48dYxTFVG4qu9OSWrN21vZPBkJiCo',
      time: '40',
      category: 'huvudratt',
      likes: 112,
      rating: 4.9,
      reviews: 65,
      portions: '4',
      badges: ['Vegetariskt', 'Snabb', 'Pasta'],
      tags: ['pasta', 'pesto', 'halloumi', 'vegetariskt', 'snabb middag', 'vardagsmat'],
      trending: true,
      featured: true,
      videoUrl: 'https://www.instagram.com/'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('alla');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const pageRef = useRef(null);

  // Remove duplicates based on title, keeping the first occurrence
  const recipes = initialRecipes.filter((recipe, index, self) =>
    index === self.findIndex((r) => (
      r.title.toLowerCase() === recipe.title.toLowerCase()
    ))
  );

  // Check for saved search from localStorage on mount
  useEffect(() => {
    const savedSearch = localStorage.getItem('lastSearch');
    if (savedSearch) {
      setSearchTerm(savedSearch);
      localStorage.removeItem('lastSearch');
    }
  }, []);

  // Function to handle recipe link clicks - using useCallback to memoize
  const handleRecipeClick = useCallback((id, e) => {
    e.preventDefault();
    // Direct navigation instead of changing hash
    window.location.hash = `recipe/${id}`;
  }, []);

  // Handle filter button click - memoized with useCallback
  const handleFilterClick = useCallback((filter) => {
    setActiveFilter(filter);
    setIsFilterOpen(false);
  }, []);

  // Filter and search recipes
  const filteredRecipes = activeFilter === 'alla' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === activeFilter);

  const searchedRecipes = searchTerm.trim() === '' 
    ? filteredRecipes 
    : filteredRecipes.filter(recipe => {
        const searchLower = searchTerm.toLowerCase();
        return (
          recipe.title.toLowerCase().includes(searchLower) ||
          recipe.description.toLowerCase().includes(searchLower) ||
          recipe.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
          recipe.badges?.some(badge => badge.toLowerCase().includes(searchLower))
        );
      });

  // Handle back button click - memoized
  const handleBackClick = useCallback((e) => {
    e.preventDefault();
    window.location.hash = '';
  }, []);

  return (
    <section className="py-16 bg-beige-50" ref={pageRef}>
      <div className="container mx-auto px-4">
        {/* Back button */}
        <a 
          href="#" 
          onClick={handleBackClick} 
          className="inline-flex items-center text-primary-color hover:text-accent-color mb-8"
        >
          <ChevronLeft size={20} className="mr-1" />
          <span>Tillbaka till startsidan</span>
        </a>

        {/* Page header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary-color">Receptsamling</h1>
          <p className="text-brown-500 max-w-2xl mx-auto">
            Upptäck en samling av autentiska recept med assyriska och syrianska rötter, 
            anpassade för det moderna köket. Enkla, smakrika recept med tydliga instruktioner.
          </p>
        </div>

        {/* Search and filter bar */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Sök efter recept, ingredienser..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Sök recept och ingredienser"
                  id="recipe-page-search-input"
                />
              </div>
              
              <div className="relative">
                <button 
                  className="bg-primary-color text-white px-4 py-2 rounded-lg flex items-center"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  aria-expanded={isFilterOpen}
                  aria-controls="recipe-page-filter-options"
                >
                  <Filter size={18} className="mr-2" aria-hidden="true" />
                  Filter
                  <ChevronDown size={16} className={`ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                
                {isFilterOpen && (
                  <div id="recipe-page-filter-options" role="listbox" className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg z-10 w-48 p-2">
                    <button
                      onClick={() => handleFilterClick('alla')}
                      role="option"
                      aria-selected={activeFilter === 'alla'}
                      className={`block w-full text-left px-3 py-2 rounded-md ${activeFilter === 'alla' ? 'bg-beige-50 text-primary-color' : 'hover:bg-beige-50'}`}
                    >
                      Alla recept
                    </button>
                    <button
                      onClick={() => handleFilterClick('huvudratt')}
                      role="option"
                      aria-selected={activeFilter === 'huvudratt'}
                      className={`block w-full text-left px-3 py-2 rounded-md ${activeFilter === 'huvudratt' ? 'bg-beige-50 text-primary-color' : 'hover:bg-beige-50'}`}
                    >
                      Huvudrätter
                    </button>
                    <button
                      onClick={() => handleFilterClick('gryta')}
                      role="option"
                      aria-selected={activeFilter === 'gryta'}
                      className={`block w-full text-left px-3 py-2 rounded-md ${activeFilter === 'gryta' ? 'bg-beige-50 text-primary-color' : 'hover:bg-beige-50'}`}
                    >
                      Grytor
                    </button>
                    <button
                      onClick={() => handleFilterClick('bakverk')}
                      role="option"
                      aria-selected={activeFilter === 'bakverk'}
                      className={`block w-full text-left px-3 py-2 rounded-md ${activeFilter === 'bakverk' ? 'bg-beige-50 text-primary-color' : 'hover:bg-beige-50'}`}
                    >
                      Bakverk
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Popular tags/filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-brown-500 mr-1 flex items-center">
                <Tag size={14} className="mr-1" /> Populära:
              </span>
              <button 
                onClick={() => setSearchTerm('Fisk')}
                className="text-xs bg-beige-50 text-brown-500 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors"
              >
                Fisk
              </button>
              <button 
                onClick={() => setSearchTerm('Vegetariskt')}
                className="text-xs bg-beige-50 text-brown-500 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors"
              >
                Vegetariskt
              </button>
              <button 
                onClick={() => setSearchTerm('Snabb')}
                className="text-xs bg-beige-50 text-brown-500 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors"
              >
                Snabbt
              </button>
              <button 
                onClick={() => setSearchTerm('Traditionell')}
                className="text-xs bg-beige-50 text-brown-500 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors"
              >
                Traditionellt
              </button>
              <button 
                onClick={() => setSearchTerm('vardagsmat')}
                className="text-xs bg-beige-50 text-brown-500 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors"
              >
                Vardagsmat
              </button>
            </div>
          </div>
        </div>

        {/* Search results */}
        {searchTerm && (
          <div className="mb-8 text-center">
            <p className="text-brown-500">
              {searchedRecipes.length === 0 
                ? `Inga recept matchar sökningen "${searchTerm}"` 
                : `Visar ${searchedRecipes.length} recept för "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Recipe grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {searchedRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              id={recipe.id}
              className="recipe-card bg-white rounded-xl overflow-hidden shadow-soft group hover:shadow-xl transition-all"
            >
              <a 
                href={`#recipe/${recipe.id}`} 
                onClick={(e) => handleRecipeClick(recipe.id, e)} 
                className="block"
              >
                <div className="relative h-52 bg-beige-200 overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width="400"
                    height="208" // Assuming aspect ratio for h-52, adjust if needed
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.target as HTMLImageElement;
                      // Fallback to a colored div with emoji if image fails
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-600 text-4xl';
                      fallback.innerHTML = '🍽️';
                      target.parentNode?.appendChild(fallback);
                    }}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
                    <span className="bg-primary-color/90 text-white text-xs py-1 px-3 rounded-full flex items-center shadow-sm">
                      <Clock size={12} className="mr-1" /> {recipe.time} min
                    </span>
                    
                    {recipe.trending && (
                      <span className="bg-accent-color/90 text-white text-xs py-1 px-3 rounded-full font-medium shadow-sm">
                        Populärt
                      </span>
                    )}
                  </div>
                </div>
              </a>
              
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {recipe.badges?.map((badge, index) => (
                    <span key={index} className="bg-beige-100 text-brown-500 text-xs py-1 px-3 rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>
                
                {/* Rating and likes */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={`${i < Math.floor(recipe.rating) ? 'text-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">{recipe.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({recipe.reviews})</span>
                  </div>
                  
                  <span className="text-gray-500 text-sm flex items-center">
                    <Heart size={16} className="mr-1" /> 
                    {recipe.likes}
                  </span>
                </div>
                
                {/* Title and description */}
                <h3 className="text-xl font-semibold mb-2 text-brown-700 group-hover:text-primary-color transition-colors">
                  <a 
                    href={`#recipe/${recipe.id}`} 
                    onClick={(e) => handleRecipeClick(recipe.id, e)}
                  >
                    {recipe.title}
                  </a>
                </h3>
                <p className="text-brown-500 mb-4 text-sm line-clamp-2">{recipe.description}</p>
                
                {/* Recipe details and CTA */}
                <div className="flex justify-between items-center">
                  <span className="text-brown-400 text-sm flex items-center">
                    <Users size={16} className="mr-1" /> {recipe.portions} portioner
                  </span>
                  <a 
                    href={`#recipe/${recipe.id}`} 
                    onClick={(e) => handleRecipeClick(recipe.id, e)}
                    className="text-primary-color hover:text-accent-color flex items-center text-sm font-medium group"
                  >
                    Visa recept 
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon section for more recipes */}
        <div className="text-center mb-10">
          <p className="text-brown-500 mb-4">Fler recept kommer att läggas till snart!</p>
          <a 
            href="#" 
            onClick={handleBackClick} 
            className="btn-secondary inline-flex items-center"
          >
            <ChevronLeft size={18} className="mr-1" />
            Tillbaka till startsidan
          </a>
        </div>
      </div>
    </section>
  );
};