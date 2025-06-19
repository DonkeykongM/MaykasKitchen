import React, { useState, useEffect, useCallback } from 'react';
import { Search, Clock, Users, Heart, Star, ChevronRight, ArrowLeft, Filter, Tag } from 'lucide-react';

export const RecipeList = () => {
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
      trending: true,
      difficulty: 'Lätt'
    },
    {
      id: 'kyckling-shawarma',
      title: 'Kyckling Shawarma',
      description: 'Autentisk mellanöstern kyckling shawarma med hemmagjorda tunnbröd, kryddigt kött och fräscha tillbehör. Perfekt för familjen!',
      image: '/image.png',
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
      recipe.badges.some(badge => badge === selectedCategory);

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
    <div className="py-12" id="recipe-list">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <button 
          onClick={handleBack}
          className="flex items-center text-primary-color hover:text-accent-color mb-8 group"
        >
          <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
          Tillbaka till startsidan
        </button>

        <span className="block text-center text-primary-color text-sm font-medium mb-2 uppercase tracking-wider">
          Matinspiration
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary-color">
          Alla våra recept
        </h2>
        <p className="text-center mb-8 max-w-2xl mx-auto text-brown-500">
          Upptäck alla våra recept som kombinerar traditionell assyrisk/syriansk matlagning med moderna smaker och enkla tillagningsmetoder.
        </p>

        {/* Search and filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Sök efter recept..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
                  aria-label="Sök recept"
                />
              </div>

              <div className="relative">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="bg-primary-color text-white px-4 py-3 rounded-lg flex items-center"
                  aria-expanded={isFilterOpen}
                >
                  <Filter size={18} className="mr-2" />
                  Filter
                  <ChevronRight size={16} className={`ml-2 transform transition-transform duration-200 ${isFilterOpen ? 'rotate-90' : ''}`} />
                </button>
                
                {isFilterOpen && (
                  <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 right-0">
                    {categories.map(category => (
                      <button 
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md mb-1 ${
                          selectedCategory === category 
                            ? 'bg-primary-color/10 text-primary-color font-medium'
                            : 'hover:bg-beige-50'
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
                onClick={() => setSearchTerm('Assyriskt')}
                className="text-xs bg-beige-50 text-brown-500 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors"
              >
                Assyriskt
              </button>
            </div>
          </div>
        </div>

        {/* Search results count */}
        {searchTerm && (
          <div className="mb-6 text-center">
            <p className="text-brown-500">
              {filteredRecipes.length === 0 
                ? `Inga recept matchar sökningen "${searchTerm}"` 
                : `Visar ${filteredRecipes.length} recept för "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Recipe grid */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md max-w-xl mx-auto">
            <div className="text-gray-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Inga recept hittades</h3>
            <p className="text-gray-500 mb-6">Vi kunde inte hitta några recept som matchar din sökning.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Alla recept');
              }}
              className="bg-primary-color text-white px-6 py-2 rounded-lg hover:bg-accent-color transition-colors"
            >
              Visa alla recept
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                onClick={(e) => handleRecipeClick(recipe.id, e)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transform transition-transform hover:scale-105"
                    loading="lazy"
                    width="400" 
                    height="260"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-primary-color/90 text-white text-xs py-1 px-3 rounded-full flex items-center">
                      <Clock size={12} className="mr-1" /> {recipe.time} min
                    </span>
                  </div>
                  
                  {recipe.trending && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-accent-color/90 text-white text-xs py-1 px-3 rounded-full">
                        Populärt
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {recipe.badges.map((badge, index) => (
                      <span key={index} className="bg-beige-100 text-brown-500 text-xs py-1 px-3 rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < Math.floor(recipe.rating) ? "#FFB74D" : "none"}
                            className={i < Math.floor(recipe.rating) ? 'text-amber-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">{recipe.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({recipe.reviews})</span>
                    </div>
                    <span className="text-gray-500 text-sm flex items-center">
                      <Heart size={16} className="mr-1" /> {recipe.likes}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-brown-700 hover:text-primary-color transition-colors">
                    {recipe.title}
                  </h3>
                  
                  <p className="text-brown-500 mb-4 text-sm line-clamp-2">
                    {recipe.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-brown-400 text-sm flex items-center">
                      <Users size={16} className="mr-1" /> {recipe.portions} portioner
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRecipeClick(recipe.id, e);
                      }}
                      className="text-primary-color hover:text-accent-color flex items-center text-sm font-medium group"
                    >
                      Visa recept <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Newsletter signup */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto">
          <h3 className="text-2xl font-bold text-primary-color mb-3">
            Få nya recept direkt i din inkorg
          </h3>
          <p className="text-brown-500 mb-6">
            Prenumerera på mitt nyhetsbrev och få exklusiva recept, säsongstips och inspiration direkt i din inkorg varje månad.
          </p>
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Din e-postadress"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
            />
            <button
              type="submit"
              className="bg-primary-color text-white px-6 py-2 rounded-lg hover:bg-accent-color transition-colors"
            >
              Prenumerera
            </button>
          </form>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-brown-500">
              <span className="w-2 h-2 bg-primary-color rounded-full mr-2"></span>
              Nya recept varje månad
            </div>
            <div className="flex items-center text-brown-500">
              <span className="w-2 h-2 bg-primary-color rounded-full mr-2"></span>
              Säsongsbaserade tips
            </div>
            <div className="flex items-center text-brown-500">
              <span className="w-2 h-2 bg-primary-color rounded-full mr-2"></span>
              Exklusiva recept
            </div>
            <div className="flex items-center text-brown-500">
              <span className="w-2 h-2 bg-primary-color rounded-full mr-2"></span>
              Matlagningstekniker
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};