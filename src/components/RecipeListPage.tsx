import React, { useState } from 'react';
import { Search, Clock, Users, Filter, ArrowLeft, Tag } from 'lucide-react';

export const RecipeListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("alla");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const recipes = [
    {
      id: "lax-risbowl",
      title: "Kryddig Lax- & Risbowl",
      image: "https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8y19NS5037zrR9qXSut4TKmZEpjlBcOhHew0",
      time: "45 min",
      servings: "4",
      category: "huvudratt",
      description: "En vårig smakexplosion! Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen.",
      rating: 4.9,
      reviews: 78,
      likes: 124,
      badges: ['Fisk', 'Snabb', 'Under 60 min'],
      difficulty: 'Lätt'
    },
    {
      id: "kafta-bil-sejnie",
      title: "Kafta bil sejnie - Köttbullar i tomatsås",
      image: "https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC2bVVcBHX4Xuw0sOU5gWozk6clEfde8bBYInQ",
      time: "60 min",
      servings: "5-6",
      category: "huvudratt",
      description: "Köttbullar som får koka tillsammans med potatis i en smakrik tomatsås. En barndomsfavorit!",
      rating: 4.8,
      reviews: 56,
      likes: 98,
      badges: ['Kött', 'Traditionell', 'Assyriskt'],
      difficulty: 'Medel'
    },
    {
      id: "pasta-pesto",
      title: "Pasta Pesto med Ugnsbakade Tomater & Stekt Halloumi",
      image: "https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCfVuc1HC48dYxTFVG4qu9OSWrN21vZPBkJiCo",
      time: "40 min",
      servings: "4",
      category: "huvudratt",
      description: "En smakrik, krämig och färgsprakande pastarätt som snabbt blivit en favorit hos både stora och små.",
      rating: 4.9,
      reviews: 65,
      likes: 112,
      badges: ['Vegetariskt', 'Snabb', 'Pasta'],
      difficulty: 'Lätt'
    }
  ];

  const categories = [
    { id: "alla", name: "Alla recept" },
    { id: "huvudratt", name: "Huvudrätter" },
    { id: "vegetariskt", name: "Vegetariskt" },
    { id: "snabbt", name: "Snabbt (under 30 min)" },
    { id: "traditionell", name: "Traditionellt" }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.badges.some(badge => badge.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "alla" || 
      recipe.category === selectedCategory ||
      recipe.badges.some(badge => badge.toLowerCase().includes(selectedCategory.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  const handleRecipeClick = (id: string) => {
    window.location.hash = `recipe/${id}`;
  };

  const handleBack = () => {
    window.location.hash = '';
  };

  return (
    <div className="py-12 bg-light-bg min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <button 
          onClick={handleBack}
          className="flex items-center text-primary-color hover:text-accent-color mb-8 group"
        >
          <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
          Tillbaka till startsidan
        </button>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <span className="block text-center text-primary-color text-sm font-medium mb-2 uppercase tracking-wider">
            Matinspiration
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-color mb-4 leading-tight">
            Alla våra recept ✨
          </h1>
          <p className="text-xl text-brown-500 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upptäck vårt kompletta bibliotek med läckra recept från assyriskt/syrianskt kök. 
            Från snabba vardagsrätter till festliga desserter - här hittar du inspiration för alla måltider.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Sök efter recept..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-beige-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-4 border-2 border-beige-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent bg-white text-lg min-w-48"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick filter tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="text-sm text-brown-500 mr-2 flex items-center">
              <Tag size={14} className="mr-1" /> Populära:
            </span>
            {['Fisk', 'Vegetariskt', 'Snabb', 'Traditionell', 'Assyriskt'].map(tag => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="text-xs bg-beige-100 text-brown-500 px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-brown-500 text-lg">
            Visar <span className="font-semibold text-primary-color">{filteredRecipes.length}</span> av <span className="font-semibold">{recipes.length}</span> recept
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <article
              key={recipe.id}
              className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 group transform hover:-translate-y-2 cursor-pointer"
              onClick={() => handleRecipeClick(recipe.id)}
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={recipe.image}
                  alt={`Bild på ${recipe.title}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-color/90 text-white text-xs py-1 px-3 rounded-full flex items-center">
                    <Clock size={12} className="mr-1" /> {recipe.time}
                  </span>
                </div>
                {recipe.difficulty && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent-color/90 text-white text-xs py-1 px-3 rounded-full">
                      {recipe.difficulty}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {recipe.badges.map((badge, index) => (
                    <span key={index} className="bg-beige-100 text-brown-500 text-xs py-1 px-2 rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-3 text-brown-700 group-hover:text-primary-color transition-colors">
                  {recipe.title}
                </h3>
                
                <p className="text-brown-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {recipe.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-primary-color">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{recipe.servings} port</span>
                  </div>
                  <div className="text-brown-400 text-sm">
                    ⭐ {recipe.rating} ({recipe.reviews})
                  </div>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRecipeClick(recipe.id);
                  }}
                  className="w-full bg-primary-color text-white py-3 rounded-full font-semibold hover:bg-accent-color transition-all duration-300 text-center"
                >
                  Visa recept
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* No results */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-soft">
            <div className="w-24 h-24 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-primary-color" />
            </div>
            <h3 className="text-2xl font-bold text-primary-color mb-4">
              Inga recept hittades
            </h3>
            <p className="text-brown-500 text-lg mb-6">Inga recept matchar din sökning just nu.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("alla");
              }}
              className="bg-primary-color text-white px-8 py-4 rounded-full font-semibold hover:bg-accent-color transition-all duration-300"
            >
              Rensa filter
            </button>
          </div>
        )}

        {/* Newsletter signup */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-soft max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-primary-color mb-4">
            Få nya recept direkt i din inkorg
          </h3>
          <p className="text-brown-500 mb-6">
            Prenumerera på mitt nyhetsbrev och få exklusiva recept, säsongstips och inspiration direkt i din inkorg varje månad.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Din e-postadress"
              className="flex-1 px-4 py-3 border border-beige-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-color"
            />
            <button className="bg-primary-color text-white px-8 py-3 rounded-full hover:bg-accent-color transition-colors font-semibold">
              Prenumerera
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};