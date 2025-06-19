import React, { useState, useEffect } from 'react';
import { Search, Clock, Users, Heart, Star, ChevronRight, ArrowLeft, Filter, Tag } from 'lucide-react';

export const RecipeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('alla');

  const recipes = [
    {
      id: 'lax-risbowl',
      title: 'Kryddig Lax- & Risbowl',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8y19NS5037zrR9qXSut4TKmZEpjlBcOhHew0',
      time: '45 min',
      servings: '4',
      category: 'huvudratt',
      rating: 4.9,
      reviews: 78,
      likes: 124,
      description: 'En vårig smakexplosion! Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen.'
    },
    {
      id: 'kafta-bil-sejnie',
      title: 'Kafta bil sejnie - Köttbullar i tomatsås',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC2bVVcBHX4Xuw0sOU5gWozk6clEfde8bBYInQ',
      time: '60 min',
      servings: '5-6',
      category: 'huvudratt',
      rating: 4.8,
      reviews: 56,
      likes: 98,
      description: 'Köttbullar som får koka tillsammans med potatis i en smakrik tomatsås. En barndomsfavorit!'
    },
    {
      id: 'pasta-pesto',
      title: 'Pasta Pesto med Ugnsbakade Tomater & Stekt Halloumi',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCfVuc1HC48dYxTFVG4qu9OSWrN21vZPBkJiCo',
      time: '40 min',
      servings: '4',
      category: 'huvudratt',
      rating: 4.9,
      reviews: 65,
      likes: 112,
      description: 'En smakrik, krämig och färgsprakande pastarätt som snabbt blivit en favorit hos både stora och små.'
    }
  ];

  const categories = [
    { id: 'alla', name: 'Alla recept' },
    { id: 'huvudratt', name: 'Huvudrätter' },
    { id: 'vegetariskt', name: 'Vegetariskt' },
    { id: 'snabbt', name: 'Snabba rätter' }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'alla' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Snabb navigationsfunktion
  const handleRecipeClick = (recipeId, e) => {
    e.preventDefault();
    // Direkt hash-ändring för snabbast möjliga navigation
    window.location.hash = `recipe/${recipeId}`;
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-orange-50" style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fed7aa' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
    }}>
      {/* Header Section */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleBackClick}
              className="flex items-center text-orange-600 hover:text-orange-700 transition-colors font-medium"
            >
              <ArrowLeft size={20} className="mr-2" />
              Tillbaka till startsidan
            </button>
            
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/maykaskitchen" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 text-xl transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/maykaskitchen" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-xl transition-colors">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.tiktok.com/@maykaskitchen" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900 text-xl transition-colors">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20" style={{ 
        background: 'linear-gradient(135deg, #fef7ec, #fcd34d, #f97316)',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fed7aa' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Alla Recept ✨
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            Upptäck vårt kompletta bibliotek med läckra recept från assyriskt/syrianskt kök. 
            Från snabba vardagsrätter till festliga desserter - här hittar du inspiration för alla måltider.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8" style={{ boxShadow: '0 10px 25px rgba(251, 146, 60, 0.2)' }}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Sök efter recept..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-orange-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-4 border-2 border-orange-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-lg min-w-48"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Popular tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="text-sm text-gray-500 mr-2 flex items-center">
              <Tag size={14} className="mr-1" /> Populära:
            </span>
            <button 
              onClick={() => setSearchTerm('Vegetariskt')}
              className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors"
            >
              Vegetariskt
            </button>
            <button 
              onClick={() => setSearchTerm('Snabb')}
              className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors"
            >
              Snabbt
            </button>
            <button 
              onClick={() => setSearchTerm('Traditionell')}
              className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors"
            >
              Traditionellt
            </button>
            <button 
              onClick={() => setSearchTerm('Lax')}
              className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors"
            >
              Lax
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-gray-600 text-lg">
            Visar <span className="font-semibold text-orange-600">{filteredRecipes.length}</span> av <span className="font-semibold">{recipes.length}</span> recept
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <article
              key={recipe.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2"
              style={{ boxShadow: '0 10px 25px rgba(251, 146, 60, 0.2)' }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={recipe.image}
                  alt={`Bild på ${recipe.title}`}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Quick action button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => handleRecipeClick(recipe.id, e)}
                    className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors shadow-lg"
                  >
                    Visa recept
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <button 
                    onClick={(e) => handleRecipeClick(recipe.id, e)}
                    className="hover:underline text-left w-full"
                  >
                    {recipe.title}
                  </button>
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {recipe.description}
                </p>
                
                {/* Rating and stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < Math.floor(recipe.rating) ? "#fbbf24" : "none"}
                          className={i < Math.floor(recipe.rating) ? "text-amber-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">{recipe.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({recipe.reviews})</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm">
                    <Heart size={16} className="mr-1" />
                    {recipe.likes}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-orange-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="font-medium text-sm">{recipe.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="font-medium text-sm">{recipe.servings} port</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => handleRecipeClick(recipe.id, e)}
                    className="text-orange-600 hover:text-orange-700 flex items-center text-sm font-medium group"
                  >
                    Visa recept
                    <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Inga recept hittades
            </h3>
            <p className="text-gray-500 text-lg mb-6">Inga recept matchar din sökning just nu.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("alla");
              }}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              Rensa filter
            </button>
          </div>
        )}

        {/* Newsletter signup */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Få nya recept direkt i din inkorg
          </h3>
          <p className="text-gray-600 mb-6">
            Prenumerera på mitt nyhetsbrev och få exklusiva recept, säsongstips och inspiration direkt i din inkorg varje månad.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Din e-postadress"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300">
              Prenumerera
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};