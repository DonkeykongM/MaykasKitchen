import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, Heart, Star, Share2, Printer, Instagram, ChevronRight } from 'lucide-react';
import { useTranslation } from '../lib/i18n';

interface Recipe {
  id: string;
  title: string;
  translatedTitle?: string;
  description: string;
  translatedDescription?: string;
  image: string;
  time: string;
  portions: string;
  likes: number;
  rating: number;
  reviews: number;
  badges: string[];
  translatedBadges?: { [key: string]: string };
  ingredients: string[];
  ingredientsEn?: string[];
  steps: string[];
  stepsEn?: string[];
  tips?: string;
  tipsEn?: string;
  personalStory?: string;
  personalStoryEn?: string;
}

interface RecipeDetailsProps {
  recipeId: string;
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipeId }) => {
  const { t, language } = useTranslation();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const recipes: { [key: string]: Recipe } = {
    'qrimyothe-munkar': {
      id: 'qrimyothe-munkar',
      title: 'Qrimyothe – Mormors munkar 🍩',
      translatedTitle: 'Qrimyothe – Grandma\'s Donuts 🍩',
      description: 'Mamma berättar om mormors kärlek i varje tugga ♥️ Det här receptet på Qrimyothe är mer än bara ingredienser – det är ett stycke historia från mitt hem, min kultur och framför allt från mitt hjärta.',
      translatedDescription: 'Mom tells about grandma\'s love in every bite ♥️ This recipe for Qrimyothe is more than just ingredients – it\'s a piece of history from my home, my culture and above all from my heart.',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCMH3uifMpaES95dj1pBAJ4iwc3fNXxvqYhzGT',
      time: '120',
      portions: '20',
      likes: 8,
      rating: 4.9,
      reviews: 1,
      badges: ['Traditionellt', 'Bakverk', 'Assyriskt', 'Dessert'],
      translatedBadges: {
        'Traditionellt': 'Traditional',
        'Bakverk': 'Baking',
        'Assyriskt': 'Assyrian',
        'Dessert': 'Dessert'
      },
      ingredients: [
        '500g vetemjöl',
        '250ml ljummet vatten',
        '1 tsk torrjäst',
        '1 msk socker',
        '1 tsk salt',
        '2 msk olivolja',
        'Olja för fritering',
        'Florsocker för pudring'
      ],
      ingredientsEn: [
        '500g wheat flour',
        '250ml lukewarm water',
        '1 tsp dry yeast',
        '1 tbsp sugar',
        '1 tsp salt',
        '2 tbsp olive oil',
        'Oil for frying',
        'Powdered sugar for dusting'
      ],
      steps: [
        'Lös upp jästen i det ljumma vattnet tillsammans med sockret.',
        'Blanda mjöl och salt i en stor skål.',
        'Tillsätt jästblandningen och olivoljan till mjölet.',
        'Knåda degen i cirka 10 minuter tills den blir smidig och elastisk.',
        'Låt degen jäsa i 1 timme under en fuktig handduk.',
        'Dela degen i små bitar och forma till munkar med ett hål i mitten.',
        'Fritera munkarna i het olja tills de är gyllene.',
        'Pudra med florsocker innan servering.'
      ],
      stepsEn: [
        'Dissolve yeast in lukewarm water together with sugar.',
        'Mix flour and salt in a large bowl.',
        'Add yeast mixture and olive oil to the flour.',
        'Knead dough for about 10 minutes until smooth and elastic.',
        'Let dough rise for 1 hour under a damp towel.',
        'Divide dough into small pieces and shape into donuts with a hole in the center.',
        'Deep fry donuts in hot oil until golden.',
        'Dust with powdered sugar before serving.'
      ],
      personalStory: 'Mamma berättar om mormors kärlek i varje tugga ♥️ Det här receptet på Qrimyothe är mer än bara ingredienser – det är ett stycke historia från mitt hem, min kultur och framför allt från mitt hjärta.',
      personalStoryEn: 'Mom tells about grandma\'s love in every bite ♥️ This recipe for Qrimyothe is more than just ingredients – it\'s a piece of history from my home, my culture and above all from my heart.',
      tips: 'Tips: Servera varma för bästa smak. Kan förvaras i flera dagar i lufttät behållare.',
      tipsEn: 'Tips: Serve warm for best taste. Can be stored for several days in airtight container.'
    },
    'kikarts-tikka-masala': {
      id: 'kikarts-tikka-masala',
      title: 'Krämigaste kikärts-tikka masalan någonsin 🤯🔥',
      translatedTitle: 'The Creamiest Chickpea Tikka Masala Ever 🤯🔥',
      description: 'En gryta som kramar om både hjärta och smaklökar – den krämigaste kikärts tikka masalan du kan tänka dig.',
      translatedDescription: 'A stew that embraces both heart and taste buds – the creamiest chickpea tikka masala you can imagine.',
      image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCKJbVDrdNwFxeKMmirjvq6ZL34tbPu8S2X5Q9',
      time: '20',
      portions: '4-6',
      likes: 12,
      rating: 4.9,
      reviews: 1,
      badges: ['Vegan', 'Indiskt', 'Vegetariskt', 'Snabb'],
      translatedBadges: {
        'Vegan': 'Vegan',
        'Indiskt': 'Indian',
        'Vegetariskt': 'Vegetarian',
        'Snabb': 'Quick'
      },
      ingredients: [
        '2 burkar kokta kikärtor (800g)',
        '1 stor gul lök',
        '3 vitlöksklyftor',
        '2 cm färsk ingefära',
        '400ml kokosmjölk',
        '400g krossade tomater',
        '2 msk tomatpuré',
        '2 tsk garam masala',
        '1 tsk gurkmeja',
        '1 tsk spiskummin',
        'Salt och peppar efter smak'
      ],
      ingredientsEn: [
        '2 cans cooked chickpeas (800g)',
        '1 large yellow onion',
        '3 garlic cloves',
        '2 cm fresh ginger',
        '400ml coconut milk',
        '400g crushed tomatoes',
        '2 tbsp tomato paste',
        '2 tsp garam masala',
        '1 tsp turmeric',
        '1 tsp cumin',
        'Salt and pepper to taste'
      ],
      steps: [
        'Hacka löken fint och stek i olja tills den blir mjuk.',
        'Tillsätt hackad vitlök och ingefära, stek ytterligare 1 minut.',
        'Lägg i tomatpuré och alla kryddor, stek 2 minuter.',
        'Häll i krossade tomater och koka upp.',
        'Tillsätt kokta kikärtor och kokosmjölk.',
        'Låt puttra på låg värme i 15 minuter.',
        'Smaka av med salt och peppar.',
        'Servera med ris eller naanbröd.'
      ],
      stepsEn: [
        'Finely chop onion and fry in oil until soft.',
        'Add minced garlic and ginger, fry for another 1 minute.',
        'Add tomato paste and all spices, fry for 2 minutes.',
        'Pour in crushed tomatoes and bring to boil.',
        'Add cooked chickpeas and coconut milk.',
        'Let simmer on low heat for 15 minutes.',
        'Season with salt and pepper.',
        'Serve with rice or naan bread.'
      ],
      personalStory: 'En gryta som kramar om både hjärta och smaklökar – den krämigaste kikärts tikka masalan du kan tänka dig.',
      personalStoryEn: 'A stew that embraces both heart and taste buds – the creamiest chickpea tikka masala you can imagine.',
      tips: 'Tips: För extra krämig konsistens, mixa hälften av kikärtorna innan du tillsätter dem.',
      tipsEn: 'Tips: For extra creamy consistency, blend half of the chickpeas before adding them.'
    }
    // Add more recipes as needed...
  };

  useEffect(() => {
    const foundRecipe = recipes[recipeId];
    if (foundRecipe) {
      setRecipe(foundRecipe);
    }
  }, [recipeId]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Recept hittades inte / Recipe not found</p>
      </div>
    );
  }

  const currentTitle = language === 'en' && recipe.translatedTitle ? recipe.translatedTitle : recipe.title;
  const currentDescription = language === 'en' && recipe.translatedDescription ? recipe.translatedDescription : recipe.description;
  const currentIngredients = language === 'en' && recipe.ingredientsEn ? recipe.ingredientsEn : recipe.ingredients;
  const currentSteps = language === 'en' && recipe.stepsEn ? recipe.stepsEn : recipe.steps;
  const currentPersonalStory = language === 'en' && recipe.personalStoryEn ? recipe.personalStoryEn : recipe.personalStory;
  const currentTips = language === 'en' && recipe.tipsEn ? recipe.tipsEn : recipe.tips;

  const handleBack = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back button */}
        <button 
          onClick={handleBack}
          className="flex items-center text-purple-600 hover:text-purple-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          {language === 'en' ? 'Back to recipes' : 'Tillbaka till recept'}
        </button>

        {/* Recipe header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            <img 
              src={recipe.image} 
              alt={currentTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.badges.map((badge, index) => (
                <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  {language === 'en' && recipe.translatedBadges?.[badge] || badge}
                </span>
              ))}
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
              {currentTitle}
            </h1>
            
            <p className="text-gray-600 mb-6 text-lg">
              {currentDescription}
            </p>

            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center">
                <Clock className="text-purple-600 mr-2" size={20} />
                <span>{recipe.time} {language === 'en' ? 'min' : 'min'}</span>
              </div>
              <div className="flex items-center">
                <Users className="text-purple-600 mr-2" size={20} />
                <span>{recipe.portions} {language === 'en' ? 'portions' : 'portioner'}</span>
              </div>
              <div className="flex items-center">
                <Star className="text-yellow-500 mr-2" size={20} fill="currentColor" />
                <span>{recipe.rating} ({recipe.reviews} {language === 'en' ? 'reviews' : 'recensioner'})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal story */}
        {currentPersonalStory && (
          <div className="bg-purple-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-purple-600 mb-3">
              {language === 'en' ? 'From Mayka\'s Heart' : 'Från Maykas hjärta'}
            </h3>
            <p className="text-gray-700 italic">
              {currentPersonalStory}
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {language === 'en' ? 'Ingredients' : 'Ingredienser'}
            </h3>
            <ul className="space-y-2">
              {currentIngredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {language === 'en' ? 'Instructions' : 'Gör såhär'}
            </h3>
            <ol className="space-y-4">
              {currentSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-4 mt-1 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Tips */}
        {currentTips && (
          <div className="bg-yellow-50 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-semibold text-yellow-700 mb-3">
              {language === 'en' ? 'Tips & Variations' : 'Tips & variationer'}
            </h3>
            <p className="text-gray-700">
              {currentTips}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          <button className="flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            <Heart size={20} className="mr-2" />
            {language === 'en' ? 'Like' : 'Gilla'}
          </button>
          <button className="flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            <Share2 size={20} className="mr-2" />
            {language === 'en' ? 'Share' : 'Dela'}
          </button>
          <button className="flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            <Printer size={20} className="mr-2" />
            {language === 'en' ? 'Print' : 'Skriv ut'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;