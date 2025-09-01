import React, { useState, useEffect, useCallback } from 'react';
import { Search, Clock, Users, Heart, Star, ChevronRight, ArrowLeft, Filter, Tag } from 'lucide-react';

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

        <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 text-gray-800 hover:text-purple-600 transition-colors break-words leading-tight font-serif">
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
    'lins-bulgur-jarpar': '🌱',
    'pannpizzor': '🍕',
    'batata-harra': '🥔',
    'kofta-bil-sanieh': '🥩',
    'kall-foul-medames': '🫘',
    'kikarts-tikka-masala': '🍛',
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
      id: 'kikarts-tikka-masala',
      title: 'Krämigaste channa masalan någonsin 🤯🔥',
      description: 'En gryta som kramar om både hjärta och smaklökar – den krämigaste channa masalan du kan tänka dig. Fullproppad med dofter, kryddor och värme, och ändå klar på bara 20 minuter. Perfekt för en mysig familjemiddag eller en kväll med vänner. Och det bästa av allt? Den är helt vegansk – men så gud att ingen ens märker det 😊',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCKJbVDrdNwFxeKMmirjvq6ZL34tbPu8S2X5Q9',
      time: '20',
      portions: '4-6',
      likes: 12,
      rating: 4.9,
      reviews: 1,
      badges: ['Vegan', 'Indiskt', 'Vegetariskt', 'Snabb'],
      trending: true,
      difficulty: 'Lätt'
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
      difficulty: 'Lätt'
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
      difficulty: 'Medel'
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
      trending: true,
      difficulty: 'Medel'
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
      trending: true,
      difficulty: 'Medel'
    },
    {
      id: 'pannpizzor',
      title: 'Snabba pannpizzor direkt i ugnsformen',
      description: 'Perfekt när du har kylskåpsrester att ta vara på! Släng på det du har hemma och njut av en enkel middag på nolltid.',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC9IRZic42Pb4HZiuUEJYFXxpw0kyC8Q',
      time: '30',
      portions: '4',
      likes: 42,
      rating: 4.7,
      reviews: 3,
      badges: ['Snabb', 'Vardagsmat', 'Restmat'],
      trending: false,
      difficulty: 'Lätt'
    }
  ];

  return (
    <div>
      {/* Recipe list content would go here */}
    </div>
  );
};

export default RecipeList;