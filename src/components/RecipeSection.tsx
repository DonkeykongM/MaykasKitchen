import React, { useState, useRef, useCallback } from 'react';
import { Clock, Users, Heart, Star, ChevronRight } from 'lucide-react';

// Receptdata - direkt i komponenten för snabbare laddning
const RECIPES = [
  {
    id: 'lax-risbowl',
    title: 'Kryddig lax- & risbowl',
    description: 'Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen. Snabbt, enkelt och så himla smakrikt!',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8y19NS5037zrR9qXSut4TKmZEpjlBcOhHew0',
    time: '45',
    portions: '4',
    likes: 124,
    rating: 4.9,
    reviews: 78,
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
    likes: 98,
    rating: 4.8,
    reviews: 56,
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
    likes: 112,
    rating: 4.9,
    reviews: 65,
    badges: ['Vegetariskt', 'Snabb', 'Pasta'],
    difficulty: 'Lätt'
  }
];

export const RecipeSection = () => {
  const [activeFilter, setActiveFilter] = useState('alla');
  const sectionRef = useRef(null);

  // Optimerad navigation med useCallback
  const handleRecipeClick = useCallback((id, e) => {
    e.preventDefault();
    e.stopPropagation();
    // Direkt hash-ändring för snabbast möjliga navigation
    window.location.hash = `recipe/${id}`;
  }, []);

  // Förenklade kategorier för bättre prestanda
  const filters = [
    { id: 'alla', label: 'Alla recept', active: true },
    { id: 'huvudratter', label: 'Huvudrätter', active: false },
    { id: 'grytor', label: 'Grytor', active: false },
    { id: 'bakverk', label: 'Bakverk', active: false }
  ];

  return (
    <section id="recept" ref={sectionRef} className="py-16 bg-beige-50">
      <div className="container mx-auto px-4">
        <span className="block text-center text-primary-color text-sm font-medium mb-2 uppercase tracking-wider">
          MATINSPIRATION
        </span>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary-color">
          Populära recept
        </h2>
        
        <p className="text-center mb-10 max-w-2xl mx-auto text-brown-500">
          Upptäck mina mest omtyckta recept som kombinerar traditionell assyrisk/syriansk matlagning
          med moderna smaker och enkla tillagningsmetoder.
        </p>
        
        {/* Förenklade kategorier för bättre prestanda */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-full transition-colors ${
                activeFilter === filter.id ? 'bg-primary-color text-white' : 'bg-white text-brown-500 hover:bg-beige-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Receptgrid - optimerad struktur med direktklick */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {RECIPES.map(recipe => (
            <article 
              key={recipe.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer"
              onClick={(e) => handleRecipeClick(recipe.id, e)}
            >
              {/* Receptbild med direkt klickevent */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  width="400"
                  height="260"
                  className="w-full h-full object-cover transform transition hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-color/90 text-white text-xs py-1 px-3 rounded-full flex items-center">
                    <Clock size={12} className="mr-1" /> {recipe.time} min
                  </span>
                </div>
                {recipe.difficulty && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent-color/90 text-white text-xs py-1 px-3 rounded-full">
                      {recipe.difficulty}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                {/* Taggar */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {recipe.badges.map((badge, index) => (
                    <span key={index} className="bg-beige-100 text-brown-500 text-xs py-1 px-2 rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>
                
                {/* Betyg och likes */}
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
                
                {/* Titel med direkt klickbarhet */}
                <h3 className="text-xl font-semibold mb-2 text-brown-700 hover:text-primary-color transition-colors">
                  {recipe.title}
                </h3>
                
                {/* Beskrivning */}
                <p className="text-brown-500 mb-4 text-sm line-clamp-2">
                  {recipe.description}
                </p>
                
                {/* Portioner och visa recept */}
                <div className="flex justify-between items-center">
                  <span className="text-brown-400 text-sm flex items-center">
                    <Users size={16} className="mr-1" /> {recipe.portions} portioner
                  </span>
                  
                  {/* Tydlig och direkt knapp för att visa recept */}
                  <button
                    onClick={(e) => handleRecipeClick(recipe.id, e)}
                    className="text-primary-color hover:text-accent-color flex items-center text-sm font-medium group"
                  >
                    Visa recept
                    <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Se alla recept-knapp */}
        <div className="text-center mb-20">
          <a 
            href="#recept/alla"
            className="inline-block bg-primary-color text-white py-3 px-8 rounded-full hover:bg-accent-color transition-colors"
          >
            Se alla recept
          </a>
        </div>
      </div>
    </section>
  );
};