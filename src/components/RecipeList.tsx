import React, { useState, useEffect, useCallback } from 'react';
import { Search, Clock, Users, Heart, Star, ChevronRight, ArrowLeft, Filter, Tag } from 'lucide-react';
import FoodBlogBackground from './ui/food-blog-background';
import { useTranslation } from '../lib/i18n';

// Enhanced recipe card component with robust image handling
const RecipeCard = React.memo(({ recipe, onRecipeClick }) => {
  const { t } = useTranslation();
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
              <div className="text-xs">{t.common.loading}</div>
            </div>
          </div>
        )}

        <div className="absolute top-3 md:top-4 left-3 md:left-4 flex gap-2">
          <span className="bg-purple-600/90 text-white text-xs py-1 px-2 md:px-3 rounded-full flex items-center">
            <Clock size={12} className="mr-1" /> {recipe.time} {t.recipes.minutes}
          </span>
        </div>
        
        {recipe.trending && (
          <div className="absolute top-3 md:top-4 right-3 md:right-4">
            <span className="bg-orange-500/90 text-white text-xs py-1 px-2 md:px-3 rounded-full">
              {t.recipes.popular}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6">
        <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
          {recipe.badges.map((badge, index) => (
            <span key={index} className="bg-purple-50 text-purple-700 text-xs py-1 px-2 rounded-full">
              {recipe.translatedBadges[badge] || badge}
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
          {recipe.translatedTitle || recipe.title}
        </h3>
        
        <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-sm line-clamp-2">
          {recipe.translatedDescription || recipe.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-xs md:text-sm flex items-center">
            <Users size={14} className="mr-1" /> {recipe.portions} {t.recipes.portions}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRecipeClick(recipe.id, e);
            }}
            className="text-purple-600 hover:text-purple-800 flex items-center text-xs md:text-sm font-medium group min-h-[44px] px-2 py-1"
          >
            <span className="hidden sm:inline">{t.recipes.showRecipe}</span>
            <span className="sm:hidden">{t.recipes.show}</span>
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
    'qrimyothe-munkar': '🍩',
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
  const { t, language } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(t.recipes.categories.all);
  }, [language, t.recipes.categories.all]);

  useEffect(() => {
    const savedSearch = localStorage.getItem('lastSearch');
    if (savedSearch) {
      setSearchTerm(savedSearch);
      localStorage.removeItem('lastSearch');
    }
  }, []);

  const recipes = [
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
      difficulty: language === 'en' ? 'Medium' : 'Medel'
    },
    {
      id: 'kikarts-tikka-masala',
      title: 'Krämigaste kikärts-tikka masalan någonsin 🤯🔥',
      translatedTitle: language === 'en' ? 'The Creamiest Chickpea Tikka Masala Ever 🤯🔥' : undefined,
      description: 'En gryta som kramar om både hjärta och smaklökar – den krämigaste kikärts tikka masalan du kan tänka dig. Fullproppad med dofter, kryddor och värme, och ändå klar på bara 20 minuter.',
      translatedDescription: language === 'en' ? 'A stew that embraces both heart and taste buds – the creamiest chickpea tikka masala you can imagine. Packed with aromas, spices and warmth, yet ready in just 20 minutes.' : undefined,
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
      difficulty: language === 'en' ? 'Easy' : 'Lätt'
    },
    {
      id: 'kall-foul-medames',
      title: 'Kall foul medames',
      translatedTitle: language === 'en' ? 'Cold Foul Medames' : undefined,
      description: 'En fräsch och proteinrik sallad med kokta bruna bönor eller favabönor, färska örter och citron. Perfekt som meze eller lätt måltid!',
      translatedDescription: language === 'en' ? 'A fresh and protein-rich salad with cooked brown beans or fava beans, fresh herbs and lemon. Perfect as meze or a light meal!' : undefined,
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCzNWv2DP9mAtjTsb7I6ZNyREunpVPwDz3h850',
      time: '15',
      portions: '4',
      likes: 15,
      rating: 4.8,
      reviews: 1,
      badges: ['Vegan', 'Mellanöstern', 'Snabb', 'Sallad'],
      translatedBadges: language === 'en' ? {
        'Vegan': 'Vegan',
        'Mellanöstern': 'Middle Eastern',
        'Snabb': 'Quick',
        'Sallad': 'Salad'
      } : {},
      trending: true,
      difficulty: language === 'en' ? 'Easy' : 'Lätt'
    },
    {
      id: 'mini-lahmacun',
      title: 'Mini Lahmacun – Perfekt mängd, noll svinn!',
      translatedTitle: language === 'en' ? 'Mini Lahmacun – Perfect Amount, Zero Waste!' : undefined,
      description: '15 små perfekta lahmacun – köttfärs pizzor. Inget svinn, bara ren lycka! Perfekt att frysa in för framtida måltider.',
      translatedDescription: language === 'en' ? '15 small perfect lahmacun – ground meat pizzas. No waste, just pure joy! Perfect to freeze for future meals.' : undefined,
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCFL7L57kjIHwnGYgUvXdix8ms3ac07hetyqO4',
      time: '75',
      portions: '15',
      likes: 25,
      rating: 4.9,
      reviews: 1,
      badges: ['Turkiskt', 'Kött', 'Traditionellt'],
      translatedBadges: language === 'en' ? {
        'Turkiskt': 'Turkish',
        'Kött': 'Meat',
        'Traditionellt': 'Traditional'
      } : {},
      trending: true,
      difficulty: language === 'en' ? 'Medium' : 'Medel'
    },
    {
      id: 'lins-bulgur-jarpar',
      title: 'Lins- och bulgurjärpar med sumak och spetspaprika',
      translatedTitle: language === 'en' ? 'Lentil and Bulgur Patties with Sumac and Sweet Pepper' : undefined,
      description: 'Proteinrika och mättande vegetariska järpar med smakrik kombination av röda linser, bulgur och aromatiska kryddor från mellanöstern.',
      translatedDescription: language === 'en' ? 'Protein-rich and filling vegetarian patties with a flavorful combination of red lentils, bulgur and aromatic spices from the Middle East.' : undefined,
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCrZI4Zt1TCmP1dAHK4ioO3RwLkl5gtYD2IMbW',
      time: '45',
      portions: '4-6',
      likes: 38,
      rating: 4.8,
      reviews: 2,
      badges: ['Vegetariskt', 'Mellanöstern', 'Protein'],
      translatedBadges: language === 'en' ? {
        'Vegetariskt': 'Vegetarian',
        'Mellanöstern': 'Middle Eastern',
        'Protein': 'Protein'
      } : {},
      trending: true,
      difficulty: language === 'en' ? 'Medium' : 'Medel'
    },
    {
      id: 'kycklingfile-potatis-dragon',
      title: 'Stekt kycklingfilé med smörslungad potatis, sautéade grönsaker och dragonsås',
      translatedTitle: language === 'en' ? 'Pan-fried Chicken Fillet with Butter-tossed Potatoes, Sautéed Vegetables and Tarragon Sauce' : undefined,
      description: 'En rätt som snabbt blev en favorit både hemma och på jobbet. Kombinerar krämig dragonsås med saftig kyckling och smörstekta grönsaker – enkel men med känsla av något riktigt lyxigt.',
      translatedDescription: language === 'en' ? 'A dish that quickly became a favorite both at home and at work. Combines creamy tarragon sauce with juicy chicken and butter-sautéed vegetables – simple but with a feeling of something truly luxurious.' : undefined,
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCYrirAg5FD3Nod0fKROYijVPHAbra9e8uWhMJ',
      time: '60',
      portions: '3-4',
      likes: 56,
      rating: 4.9,
      reviews: 2,
      badges: ['Kött', 'Klassisk', 'Vardagslyx'],
      translatedBadges: language === 'en' ? {
        'Kött': 'Meat',
        'Klassisk': 'Classic',
        'Vardagslyx': 'Everyday Luxury'
      } : {},
      trending: true,
      difficulty: language === 'en' ? 'Medium' : 'Medel'
    },
    {
      id: 'pannpizzor',
      title: 'Snabba pannpizzor direkt i ugnsformen',
      translatedTitle: language === 'en' ? 'Quick Pan Pizzas Straight in the Baking Dish' : undefined,
      description: 'Perfekt när du har kylskåpsrester att ta vara på! Släng på det du har hemma och njut av en enkel middag på nolltid.',
      translatedDescription: language === 'en' ? 'Perfect when you have refrigerator leftovers to use up! Throw on what you have at home and enjoy a simple dinner in no time.' : undefined,
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC9IRZic42Pb4HZiuUEJYFXxpw0kyC8QIv7W2f',
      time: '90',
      portions: '4-6',
      likes: 32,
      rating: 4.7,
      reviews: 2,
      badges: ['Vegetariskt', 'Bakverk', 'Pizza'],
      translatedBadges: language === 'en' ? {
        'Vegetariskt': 'Vegetarian',
        'Bakverk': 'Baking',
        'Pizza': 'Pizza'
      } : {},
      trending: true,
      difficulty: language === 'en' ? 'Easy' : 'Lätt'
    },
    {
      id: 'batata-harra',
      title: 'Batata Harra – Friterad potatis med tomatsås',
      translatedTitle: language === 'en' ? 'Batata Harra – Fried Potatoes with Tomato Sauce' : undefined,
      description: 'En smakrik och kryddig libanesisk rätt med krispig potatis, het tomatsås och färska örter. Perfekt som meze eller huvudrätt!',
      translatedDescription: language === 'en' ? 'A flavorful and spicy Lebanese dish with crispy potatoes, hot tomato sauce and fresh herbs. Perfect as meze or main course!' : undefined,
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCfWaFTn48dYxTFVG4qu9OSWrN21vZPBkJiCoK',
      time: '35',
      portions: '4-6',
      likes: 35,
      rating: 4.8,
      reviews: 1,
      badges: ['Vegan', 'Libanesiskt', 'Potatis'],
      translatedBadges: language === 'en' ? {
        'Vegan': 'Vegan',
        'Libanesiskt': 'Lebanese',
        'Potatis': 'Potato'
      } : {},
      trending: true,
      difficulty: language === 'en' ? 'Medium' : 'Medel'
    },
    {
      id: 'kofta-bil-sanieh',
      title: 'Köfta bil Sanieh',
      translatedTitle: language === 'en' ? 'Köfta bil Sanieh' : undefined,
      description: 'Mellanösterns vardagsfavorit med smak av hem. En autentisk syrisk rätt med kryddig köttfärs, potatis och padron paprika.',
      translatedDescription: language === 'en' ? 'Middle East\'s everyday favorite with the taste of home. An authentic Syrian dish with spicy ground meat, potatoes and padron peppers.' : undefined,
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCGg5LVZ9bnLa0KVhUD3INroEj6yqmid4HwlYB',
      time: '60',
      portions: '8',
      likes: 33,
      rating: 4.9,
      reviews: 1,
      badges: ['Kött', 'Traditionell', 'Syriskt', 'Mellanöstern'],
      translatedBadges: language === 'en' ? {
        'Kött': 'Meat',
        'Traditionell': 'Traditional',
        'Syriskt': 'Syrian',
        'Mellanöstern': 'Middle Eastern'
      } : {},
      trending: true,
      difficulty: language === 'en' ? 'Medium' : 'Medel'
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
      trending: true,
      difficulty: language === 'en' ? 'Easy' : 'Lätt'
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
      difficulty: language === 'en' ? 'Medium' : 'Medel'
    },
    {
      id: 'pasta-pesto',
      title: 'Pasta pesto med ugnsbakade tomater & stekt halloumi',
      translatedTitle: language === 'en' ? 'Pasta Pesto with Roasted Tomatoes & Fried Halloumi' : undefined,
      description: 'En smakrik, krämig och färgsprakande pastarätt med pesto, ugnsbakade tomater och stekt halloumi - perfekt för hela familjen.',
      translatedDescription: language === 'en' ? 'A flavorful, creamy and colorful pasta dish with pesto, roasted tomatoes and fried halloumi - perfect for the whole family.' : undefined,
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCfVuc1HC48dYxTFVG4qu9OSWrN21vZPBkJiCo',
      time: '40',
      portions: '4',
      likes: 41,
      rating: 4.9,
      reviews: 2,
      badges: ['Vegetariskt', 'Snabb', 'Pasta'],
      translatedBadges: language === 'en' ? {
        'Vegetariskt': 'Vegetarian',
        'Snabb': 'Quick',
        'Pasta': 'Pasta'
      } : {},
      trending: true,
      difficulty: language === 'en' ? 'Easy' : 'Lätt'
    },
    {
      id: 'kyckling-shawarma',
      title: 'Kyckling Shawarma',
      translatedTitle: language === 'en' ? 'Chicken Shawarma' : undefined,
      description: 'Autentisk mellanöstern kyckling shawarma med hemmagjorda tunnbröd, kryddigt kött och fräscha tillbehör. Perfekt för familjen!',
      translatedDescription: language === 'en' ? 'Authentic Middle Eastern chicken shawarma with homemade flatbread, spiced meat and fresh accompaniments. Perfect for the family!' : undefined,
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCG7jiQH9bnLa0KVhUD3INroEj6yqmid4HwlYB',
      time: '120',
      portions: '5',
      likes: 28,
      rating: 4.8,
      reviews: 1,
      badges: ['Kött', 'Mellanöstern', 'Familj'],
      translatedBadges: language === 'en' ? {
        'Kött': 'Meat',
        'Mellanöstern': 'Middle Eastern',
        'Familj': 'Family'
      } : {},
      trending: true,
      difficulty: language === 'en' ? 'Medium' : 'Medel'
    }
  ];

  const categories = [
    t.recipes.categories.all,
    t.recipes.categories.vegetarian,
    t.recipes.categories.quick,
    t.recipes.categories.assyrian,
    t.recipes.categories.syrian,
    t.recipes.categories.middleEastern,
    t.recipes.categories.glutenFree,
    t.recipes.categories.meat,
    t.recipes.categories.fish
  ];

  // Optimerad navigation med useCallback
  const handleRecipeClick = useCallback((id, e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.hash = `recipe/${id}`;
  }, []);

  // Back button handler
  const handleBack = useCallback(() => {
    window.location.hash = '';
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    const currentTitle = recipe.translatedTitle || recipe.title;
    const currentDescription = recipe.translatedDescription || recipe.description;
    const currentBadges = Object.values(recipe.translatedBadges || {}).concat(recipe.badges);
    
    const matchesSearch = currentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currentDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currentBadges.some(badge => badge.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === t.recipes.categories.all ||
      currentBadges.some(badge => badge === selectedCategory) ||
      (selectedCategory === t.recipes.categories.quick && parseInt(recipe.time) <= 30);

    return matchesSearch && matchesCategory;
  });

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      alert(t.newsletter.validEmail);
      return;
    }
    
    try {
      const response = await fetch('https://hook.eu2.make.com/sfjfkezizhjh4x7r1rrjmjwyei2sufj2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'newsletter',
          email,
          source: 'recipe_list' 
        })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      emailInput.value = '';
      alert(t.newsletter.subscribed);
      
    } catch (error) {
      console.error("Error sending to webhook:", error);
      alert(t.newsletter.errorMessage);
    }
  };

  return (
    <FoodBlogBackground className="min-h-screen" variant="recipes">
      <div className="py-8 md:py-12 relative z-10" id="recipe-list">
        <div className="container mx-auto px-4">
          <button 
            onClick={handleBack}
            className="flex items-center text-purple-300 hover:text-white mb-6 md:mb-8 group bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full transition-all hover:bg-white/20 min-h-[44px]"
          >
            <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">{t.recipes.backToHome}</span>
            <span className="sm:hidden">{t.common.back}</span>
          </button>

          <span className="block text-center text-purple-300 text-xs md:text-sm font-medium mb-2 uppercase tracking-wider">
            {t.recipes.tagline}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 md:mb-4 text-white">
            {t.recipes.allRecipes}
          </h2>
          <p className="text-center mb-6 md:mb-8 max-w-2xl mx-auto text-purple-100 text-sm md:text-base lg:text-lg">
            {t.recipes.description}
          </p>

          <div className="max-w-4xl mx-auto mb-8 md:mb-12">
            <div className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder={t.recipes.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 pl-10 md:pl-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base min-h-[44px]"
                    aria-label={t.recipes.searchPlaceholder}
                  />
                </div>

                <div className="relative">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="bg-purple-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg flex items-center text-sm md:text-base min-h-[44px] w-full md:w-auto justify-center"
                    aria-expanded={isFilterOpen}
                  >
                    <Filter size={16} className="mr-2" />
                    {t.recipes.filter}
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

              <div className="flex flex-wrap gap-2 mt-3 md:mt-4">
                <span className="text-xs md:text-sm text-gray-600 mr-1 flex items-center">
                  <Tag size={12} className="mr-1" /> {t.recipes.popularSearches}
                </span>
                <button 
                  onClick={() => setSearchTerm(t.recipes.filters.fish)}
                  className="text-xs bg-gray-100 text-gray-600 px-2 md:px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors min-h-[32px] cursor-pointer"
                >
                  {t.recipes.filters.fish}
                </button>
                <button 
                  onClick={() => setSearchTerm(t.recipes.filters.vegetarian)}
                  className="text-xs bg-gray-100 text-gray-600 px-2 md:px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors min-h-[32px]"
                >
                  {t.recipes.filters.vegetarian}
                </button>
                <button 
                  onClick={() => setSearchTerm(t.recipes.filters.quick)}
                  className="text-xs bg-gray-100 text-gray-600 px-2 md:px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors min-h-[32px]"
                >
                  {t.recipes.filters.quick}
                </button>
                <button 
                  onClick={() => setSearchTerm(t.recipes.filters.traditional)}
                  className="text-xs bg-gray-100 text-gray-600 px-2 md:px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors min-h-[32px]"
                >
                  {t.recipes.filters.traditional}
                </button>
                <button 
                  onClick={() => setSearchTerm(t.recipes.filters.assyrian)}
                  className="text-xs bg-gray-100 text-gray-600 px-2 md:px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors min-h-[32px]"
                >
                  {t.recipes.filters.assyrian}
                </button>
                <button 
                  onClick={() => setSearchTerm(t.recipes.filters.syrian)}
                  className="text-xs bg-gray-100 text-gray-600 px-2 md:px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors min-h-[32px]"
                >
                  {t.recipes.filters.syrian}
                </button>
              </div>
            </div>
          </div>

          {searchTerm && (
            <div className="mb-4 md:mb-6 text-center">
              <p className="text-purple-100 text-sm md:text-base">
                {filteredRecipes.length === 0 
                  ? `${t.recipes.noMatch} "${searchTerm}"` 
                  : `${t.recipes.showing} ${filteredRecipes.length} ${t.recipes.resultsFor} "${searchTerm}"`}
              </p>
            </div>
          )}

          {filteredRecipes.length === 0 ? (
            <div className="text-center py-8 md:py-12 bg-white/90 backdrop-blur-md rounded-lg shadow-md max-w-xl mx-auto">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">{t.recipes.noResults}</h3>
              <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">{t.recipes.noResultsDesc}</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(t.recipes.categories.all);
                }}
                className="bg-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-purple-700 transition-colors text-sm md:text-base min-h-[44px]"
              >
                {t.recipes.showAll}
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

          <div className="mt-12 md:mt-16 bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-md max-w-xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-purple-600 mb-3">
              {t.recipes.getNewsletter}
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
              {t.recipes.getNewRecipes}
            </p>
            <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder={t.newsletter.emailPlaceholder}
                className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base min-h-[44px] max-w-full box-border"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-purple-700 transition-colors text-sm md:text-base min-h-[44px] max-w-full"
              >
                {t.newsletter.subscribe}
              </button>
            </form>
            <div className="mt-3 md:mt-4 grid grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
              <div className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                {t.newsletter.benefits.newRecipes}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                {t.newsletter.benefits.seasonalTips}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                {t.newsletter.benefits.exclusiveRecipes}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                {t.newsletter.benefits.techniques}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FoodBlogBackground>
  );
};

export { RecipeList };