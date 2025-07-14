import React, { useState, useEffect, useCallback } from 'react';
import { Search, Clock, Users, Heart, Star, ChevronRight, ArrowLeft, Filter, Tag } from 'lucide-react';
import FoodBlogBackground from './ui/food-blog-background';

// Enhanced recipe card component with robust image handling
const RecipeCard = React.memo(({ recipe, onRecipeClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  return (
    <div
      className="bg-white/95 backdrop-blur-md rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer recipe-card"
      onClick={(e) => onRecipeClick(recipe.id, e)}
    >
      <div className="relative h-40 sm:h-48 overflow-hidden">
        {!imageError ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transform transition-transform hover:scale-105"
            loading="lazy"
            width="400" 
            height="260"
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
            <div className="text-3xl md:text-4xl mb-2">{getRecipeEmoji(recipe.id)}</div>
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

        <div className="absolute top-3 md:top-4 left-3 md:left-4 flex gap-2">
          <span className="bg-purple-600/90 text-white text-xs py-1 px-2 md:px-3 rounded-full flex items-center">
            <Clock size={12} className="mr-1" /> {recipe.time} min
          </span>
        </div>
        
        {recipe.trending && (
          <div className="absolute top-3 md:top-4 right-3 md:right-4">
            <span className="bg-orange-500/90 text-white text-xs py-1 px-2 md:px-3 rounded-full">
              Populärt
            </span>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6">
        <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
          {recipe.badges.map((badge, index) => (
            <span key={index} className="bg-purple-50 text-purple-700 text-xs py-1 px-2 rounded-full">
              {badge}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-2 md:mb-3">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(recipe.rating) ? "#FFB74D" : "none"}
                  className={i < Math.floor(recipe.rating) ? 'text-amber-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs md:text-sm text-gray-600 ml-1">{recipe.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({recipe.reviews})</span>
          </div>
          <span className="text-gray-500 text-xs md:text-sm flex items-center">
            <Heart size={14} className="mr-1" /> {recipe.likes}
          </span>
        </div>

        <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 text-gray-800 hover:text-purple-600 transition-colors">
          {recipe.title}
        </h3>
        
        <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-sm line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-xs md:text-sm flex items-center">
            <Users size={14} className="mr-1" /> {recipe.portions} portioner
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRecipeClick(recipe.id, e);
            }}
            className="text-purple-600 hover:text-purple-800 flex items-center text-xs md:text-sm font-medium group min-h-[44px] px-2 py-1"
          >
            <span className="hidden sm:inline">Visa recept</span>
            <span className="sm:hidden">Visa</span>
            <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
});

// Helper function to get recipe emoji
const getRecipeEmoji = (recipeId) => {
  const emojiMap = {
    'pannpizzor': '🍕',
    'batata-harra': '🥔',
    'kofta-bil-sanieh': '🥩',
    'lax-risbowl': '🐟',
    'kafta-bil-sejnie': '🍲',
    'pasta-pesto': '🍝',
    'kyckling-shawarma': '🌯'
  };
  return emojiMap[recipeId] || '🍽️';
};

const RecipeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alla recept');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const savedSearch = localStorage.getItem('lastSearch');
    if (savedSearch) {
      setSearchTerm(savedSearch);
      localStorage.removeItem('lastSearch');
    }
  }, []);

  const recipes = [
    {
      id: 'kycklingfile-potatis-dragon',
      title: 'Stekt kycklingfilé med smörslungad potatis, sautéade grönsaker och dragonsås',
      description: 'En rätt som snabbt blev en favorit både hemma och på jobbet. Kombinerar krämig dragonsås med saftig kyckling och smörstekta grönsaker – enkel men med känsla av något riktigt lyxigt.',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8m7bPB037zrR9qXSut4TKmZEpjlBcOhHew02',
      time: '60',
      portions: '3-4',
      likes: 156,
      rating: 4.9,
      reviews: 67,
      badges: ['Kött', 'Klassisk', 'Vardagslyx'],
      trending: true,
      difficulty: 'Medel'
    },
    {
      id: 'pannpizzor',
      title: 'Snabba pannpizzor direkt i ugnsformen',
      description: 'Perfekt när du har kylskåpsrester att ta vara på! Släng på det du har hemma och njut av en enkel middag på nolltid.',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC9IRZic42Pb4HZiuUEJYFXxpw0kyC8QIv7W2f',
      time: '90',
      portions: '4-6',
      likes: 78,
      rating: 4.8,
      reviews: 32,
      badges: ['Vegetariskt', 'Bakverk', 'Pizza'],
      trending: true,
      difficulty: 'Lätt'
    },
    {
      id: 'batata-harra',
      title: 'Batata Harra – Friterad potatis med tomatsås',
      description: 'En smakrik och kryddig libanesisk rätt med krispig potatis, het tomatsås och färska örter. Perfekt som meze eller huvudrätt!',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCfWaFTn48dYxTFVG4qu9OSWrN21vZPBkJiCoK',
      time: '35',
      portions: '4-6',
      likes: 95,
      rating: 4.9,
      reviews: 41,
      badges: ['Vegan', 'Libanesiskt', 'Potatis'],
      trending: true,
      difficulty: 'Medel'
    },
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
      badges: ['Kött', 'Traditionell', 'Syriskt', 'Mellanöstern'],
      trending: true,
      difficulty: 'Medel'
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
      trending: true,
      difficulty: 'Lätt'
    },
    {
      id: 'kafta-bil-sejnie',
      title: 'Kafta bil sejnie',
      description: 'En traditionell rätt från mellanöstern med saftiga köttbullar och potatis i en smakrik tomatsås.',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8zXxYz037zrR9qXSut4TKmZEpjlBcOhHew02',
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
      trending: true,
      difficulty: 'Lätt'
    },
    {
      id: 'kyckling-shawarma',
      title: 'Kyckling Shawarma',
      description: 'Autentisk mellanöstern kyckling shawarma med hemmagjorda tunnbröd, kryddigt kött och fräscha tillbehör. Perfekt för familjen!',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCG7jiQH9bnLa0KVhUD3INroEj6yqmid4HwlYB',
      time: '120',
      portions: '5',
      likes: 89,
      rating: 5.0,
      reviews: 23,
      badges: ['Kött', 'Mellanöstern', 'Familj'],
      trending: true,
      difficulty: 'Medel'
    }
  ];

  const categories = [
    'Alla recept',
    'Vegetariskt',
    'Snabbt (under 30 min)',
    'Assyriskt',
    'Syriskt',
    'Mellanöstern',
    'Glutenfritt',
    'Kött',
    'Fisk'
  ];

  // Optimerad navigation med useCallback
  const handleRecipeClick = useCallback((id, e) => {
    e.preventDefault();
    e.stopPropagation();
    // Direkt hash-ändring för snabbast möjliga navigation
    window.location.hash = `recipe/${id}`;
  }, []);

  // Back button handler
  const handleBack = useCallback(() => {
    window.location.hash = '';
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.badges.some(badge => badge.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'Alla recept' ||
      recipe.badges.some(badge => badge === selectedCategory) ||
      (selectedCategory === 'Snabbt (under 30 min)' && parseInt(recipe.time) <= 30);

    return matchesSearch && matchesCategory;
  });

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      alert('Vänligen ange en giltig e-postadress.');
      return;
    }
    
    try {
      // Send directly to Make webhook
      const response = await fetch('https://hook.eu2.make.com/sfjfkezizhjh4x7r1rrjmjwyei2sufj2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email,
          source: 'recipe_list' 
        })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Success - clear input
      emailInput.value = '';
      alert('Tack för din prenumeration!');
      
    } catch (error) {
      console.error("Error sending to webhook:", error);
      alert('Något gick fel. Försök igen senare.');
    }
  };

  return (
    <FoodBlogBackground className="min-h-screen" variant="recipes">
      <div className="py-8 md:py-12 relative z-10" id="recipe-list">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <button 
            onClick={handleBack}
            className="flex items-center text-purple-300 hover:text-white mb-6 md:mb-8 group bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full transition-all hover:bg-white/20 min-h-[44px]"
          >
            <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Tillbaka till startsidan</span>
            <span className="sm:hidden">Tillbaka</span>
          </button>

          <span className="block text-center text-purple-300 text-xs md:text-sm font-medium mb-2 uppercase tracking-wider">
            Matinspiration
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 md:mb-4 text-white">
            Alla våra recept
          </h2>
          <p className="text-center mb-6 md:mb-8 max-w-2xl mx-auto text-purple-100 text-sm md:text-base lg:text-lg">
            Upptäck alla våra recept som kombinerar traditionell assyrisk/syriansk matlagning med moderna smaker och enkla tillagningsmetoder.
          </p>

          {/* Search and filters */}
          <div className="max-w-4xl mx-auto mb-8 md:mb-12">
            <div className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Sök efter recept..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 pl-10 md:pl-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base min-h-[44px]"
                    aria-label="Sök recept"
                  />
                </div>

                <div className="relative">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="bg-purple-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg flex items-center text-sm md:text-base min-h-[44px] w-full md:w-auto justify-center"
                    aria-expanded={isFilterOpen}
                  >
                    <Filter size={16} className="mr-2" />
                    Filter
                    <ChevronRight size={14} className={`ml-2 transform transition-transform duration-200 ${isFilterOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {isFilterOpen && (
                    <div className="absolute z-10 mt-2 w-full md:w-48 bg-white rounded-lg shadow-lg p-2 right-0">
                      {categories.map(category => (
                        <button 
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md mb-1 text-sm min-h-[44px] flex items-center ${
                            selectedCategory === category 
                              ? 'bg-purple-100 text-purple-600 font-medium'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Popular tags as quick filters */}
              <div className="flex flex-wrap gap-2 mt-3 md:mt-4">
                <span className="text-xs md:text-sm text-gray-600 mr-1 flex items-center">
                  <Tag size={12} className="mr-1" /> Populära:
                </span>
                <button 
                  onClick={() => setSearchTerm('Fisk')}
                  className="text-xs bg-gray-100 text-gray-600 px-2 md:px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors min-h-[32px]"
                >
                  Fisk
                </button>
                <button 
                  onClick={() => setSearchTerm('Vegetariskt')}
                  className="text-xs bg-gray-100 text-gray-600 px-2 md:px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors min-h-[32px]"
                >
                  Vegetariskt
                </button>
                <button 
                  onClick={() => setSearchTerm('Snabb')}
                  className="text-xs bg-gray-100 text-gray-600 px-2 md:px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors min-h-[32px]"
                >
                  Snabbt
                </button>
                <button 
                  onClick={() => setSearchTerm('Traditionell')}
                  className="text-xs bg-gray-100 text-gray-600 px-2 md:px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors min-h-[32px]"
                >
                  Traditionellt
                </button>
                <button 
                  onClick={() => setSearchTerm('Assyriskt')}
                  className="text-xs bg-gray-100 text-gray-600 px-2 md:px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors min-h-[32px]"
                >
                  Assyriskt
                </button>
                <button 
                  onClick={() => setSearchTerm('Syriskt')}
                  className="text-xs bg-gray-100 text-gray-600 px-2 md:px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors min-h-[32px]"
                >
                  Syriskt
                </button>
              </div>
            </div>
          </div>

          {/* Search results count */}
          {searchTerm && (
            <div className="mb-4 md:mb-6 text-center">
              <p className="text-purple-100 text-sm md:text-base">
                {filteredRecipes.length === 0 
                  ? `Inga recept matchar sökningen "${searchTerm}"` 
                  : `Visar ${filteredRecipes.length} recept för "${searchTerm}"`}
              </p>
            </div>
          )}

          {/* Recipe grid */}
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-8 md:py-12 bg-white/90 backdrop-blur-md rounded-lg shadow-md max-w-xl mx-auto">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Inga recept hittades</h3>
              <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">Vi kunde inte hitta några recept som matchar din sökning.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Alla recept');
                }}
                className="bg-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-purple-700 transition-colors text-sm md:text-base min-h-[44px]"
              >
                Visa alla recept
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {filteredRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onRecipeClick={handleRecipeClick}
                />
              ))}
            </div>
          )}

          {/* Newsletter signup */}
          <div className="mt-12 md:mt-16 bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-md max-w-xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-purple-600 mb-3">
              Få nya recept direkt i din inkorg
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
              Prenumerera på mitt nyhetsbrev och få exklusiva recept, säsongstips och inspiration direkt i din inkorg varje månad.
            </p>
            <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Din e-postadress"
                className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base min-h-[44px]"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-purple-700 transition-colors text-sm md:text-base min-h-[44px]"
              >
                Prenumerera
              </button>
            </form>
            <div className="mt-3 md:mt-4 grid grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
              <div className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                Nya recept varje månad
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                Säsongsbaserade tips
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                Exklusiva recept
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                Matlagningstekniker
              </div>
            </div>
          </div>
        </div>
      </div>
    </FoodBlogBackground>
  );
};

export { RecipeList };