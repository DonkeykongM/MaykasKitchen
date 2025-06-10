import React, { useState } from 'react';
import { Clock, Users, Heart, Instagram, ArrowLeft, Printer, Bookmark, Share2, AlertCircle, Star } from 'lucide-react';

interface RecipeDetailsProps {
  recipe: {
    id: string;
    title: string;
    description: string;
    image: string;
    time: string;
    portions: string;
    likes: number;
    rating: number;
    reviews: number;
    badges: string[];
    videoUrl: string;
    content: {
      ingredients: {
        section?: string;
        items: string[];
      }[];
      instructions: {
        section?: string;
        steps: string[];
      }[];
      tips?: string[];
    };
    difficulty?: string;
    nutritionInfo?: {
      calories?: string;
      protein?: string;
      carbs?: string;
      fat?: string;
      fiber?: string;
      salt?: string;
      [key: string]: string | undefined;
    };
    allergens?: string[];
  };
  onBack: () => void;
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe, onBack }) => {
  const [portionCount, setPortionCount] = useState(parseInt(recipe.portions.split(' ')[0], 10));
  const [activeTab, setActiveTab] = useState('ingredients');
  const [isSaved, setIsSaved] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showMetricUnits, setShowMetricUnits] = useState(true);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Function to adjust ingredient amounts based on portion count
  const adjustAmount = (amount: string, originalPortions: number): string => {
    // Parse the amount string
    const regex = /(\d+(?:\.\d+)?)\s*([a-zA-ZåäöÅÄÖ]+)?/;
    const match = amount.match(regex);
    
    if (match) {
      const value = parseFloat(match[1]);
      const unit = match[2] || '';
      const adjustedValue = (value / originalPortions) * portionCount;
      
      // Format the adjusted value to avoid too many decimal places
      let formattedValue: string;
      if (adjustedValue % 1 === 0) {
        formattedValue = adjustedValue.toString();
      } else {
        formattedValue = adjustedValue.toFixed(1).replace(/\.0$/, '');
      }
      
      return `${formattedValue} ${unit}`;
    }
    
    return amount; // Return original if parsing fails
  };

  // Function to convert metric to imperial (rough estimates for demonstration)
  const metricToImperial = (amount: string): string => {
    const regex = /(\d+(?:\.\d+)?)\s*([a-zA-ZåäöÅÄÖ]+)?/;
    const match = amount.match(regex);
    
    if (!match) return amount;
    
    const value = parseFloat(match[1]);
    const unit = match[2]?.toLowerCase() || '';
    
    switch(unit) {
      case 'g':
        return `${(value / 28.35).toFixed(1)} oz`;
      case 'kg':
        return `${(value * 2.2).toFixed(1)} lb`;
      case 'ml':
      case 'cl':
      case 'dl':
        let ml = value;
        if (unit === 'cl') ml = value * 10;
        if (unit === 'dl') ml = value * 100;
        
        if (ml < 15) return `${ml} ml`;
        if (ml < 240) return `${(ml / 29.57).toFixed(1)} fl oz`;
        return `${(ml / 236.59).toFixed(2)} cups`;
      case 'l':
        return `${(value * 4.227).toFixed(2)} cups`;
      case 'tsk':
        return `${value} tsp`;
      case 'msk':
        return `${value} tbsp`;
      case 'krm':
        return `${value} pinch`;
      default:
        return `${value} ${unit}`;
    }
  };

  // Handle printing the recipe
  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Here you would implement actual saving functionality
    if (!isSaved) {
      localStorage.setItem(`saved-recipe-${recipe.id}`, 'true');
    } else {
      localStorage.removeItem(`saved-recipe-${recipe.id}`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      const shareUrl = encodeURIComponent(window.location.href);
      const shareTitle = encodeURIComponent(recipe.title);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
    }
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    // Here you would implement actual rating submission
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement actual comment submission
    setCommentSubmitted(true);
    // Reset form
    setComment('');
    setUserName('');
    setUserEmail('');
  };

  // Get original portion count
  const originalPortions = parseInt(recipe.portions.split(' ')[0], 10);

  return (
    <article className="py-12 bg-white print:py-0">
      <div className="container mx-auto px-4" id="recipe-details">
        {/* Back button - hidden when printing */}
        <button 
          onClick={onBack}
          className="flex items-center text-primary-color hover:text-accent-color mb-8 group print:hidden"
          aria-label="Tillbaka till receptsamlingen"
        >
          <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
          Tillbaka till receptsamlingen
        </button>

        {/* Recipe header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-6 print:mb-2">
            {recipe.badges.map((badge, index) => (
              <span 
                key={index}
                className="bg-beige-100 text-brown-500 text-sm py-1 px-4 rounded-full print:border print:border-gray-300"
              >
                {badge}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary-color mb-6 print:text-3xl print:mb-2">
            {recipe.title}
          </h1>

          {/* Recipe meta information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-brown-500 print:mb-4 print:text-sm">
            <div className="flex items-center">
              <Clock size={18} className="mr-2 print:hidden" />
              <span className="print:before:content-['Tid:_'] print:before:font-semibold">
                {recipe.time} minuter
              </span>
            </div>
            <div className="flex items-center">
              <Users size={18} className="mr-2 print:hidden" />
              <span className="print:before:content-['Portioner:_'] print:before:font-semibold">
                {portionCount} portioner
              </span>
            </div>
            <div className="flex items-center print:hidden">
              <Heart size={18} className="mr-2" />
              {recipe.likes} gillar
            </div>
            {recipe.difficulty && (
              <div className="px-3 py-1 bg-beige-100 rounded-full text-sm print:before:content-['Svårighetsgrad:_'] print:before:font-semibold print:bg-transparent print:px-0 print:py-0">
                {recipe.difficulty}
              </div>
            )}
          </div>

          {/* Recipe image */}
          <div className="relative rounded-2xl overflow-hidden mb-12 print:mb-4">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-auto object-cover print:max-h-64"
            />
            {recipe.videoUrl && (
              <a 
                href={recipe.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-white text-primary-color px-6 py-3 rounded-full shadow-lg hover:bg-primary-color hover:text-white transition-colors flex items-center print:hidden"
              >
                <Instagram size={20} className="mr-2" />
                Se video på Instagram
              </a>
            )}
          </div>

          {/* Action buttons - hidden when printing */}
          <div className="flex flex-wrap gap-4 mb-8 print:hidden">
            <button 
              onClick={handlePrint} 
              className="flex items-center gap-2 px-4 py-2 bg-beige-100 rounded-lg text-brown-700 hover:bg-beige-200 transition-colors"
              aria-label="Skriv ut receptet"
            >
              <Printer size={18} />
              Skriv ut recept
            </button>
            <button 
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isSaved ? 'bg-primary-color text-white' : 'bg-beige-100 text-brown-700 hover:bg-beige-200'}`}
              aria-label={isSaved ? "Ta bort från sparade" : "Spara receptet"}
            >
              <Bookmark size={18} fill={isSaved ? "white" : "none"} />
              {isSaved ? 'Sparat' : 'Spara recept'}
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-beige-100 rounded-lg text-brown-700 hover:bg-beige-200 transition-colors"
              aria-label="Dela receptet"
            >
              <Share2 size={18} />
              Dela recept
            </button>
          </div>

          {/* Recipe description */}
          <div className="prose max-w-none mb-12 print:mb-4">
            <p className="text-lg text-brown-500 leading-relaxed print:text-base">
              {recipe.description}
            </p>
          </div>

          {/* Portions adjuster - hidden when printing */}
          <div className="bg-beige-50 rounded-xl p-6 mb-8 print:hidden">
            <h3 className="text-lg font-semibold mb-4">Justera portioner</h3>
            <div className="flex items-center">
              <button 
                onClick={() => setPortionCount(Math.max(1, portionCount - 1))}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:border-primary-color"
                aria-label="Minska antal portioner"
              >
                -
              </button>
              <span className="mx-4 text-lg font-medium">{portionCount} portioner</span>
              <button 
                onClick={() => setPortionCount(portionCount + 1)}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:border-primary-color"
                aria-label="Öka antal portioner"
              >
                +
              </button>

              <div className="ml-auto flex items-center">
                <span className="mr-3 text-sm">Mått:</span>
                <div className="flex border rounded-lg overflow-hidden">
                  <button 
                    className={`px-3 py-1 text-sm ${showMetricUnits ? 'bg-primary-color text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => setShowMetricUnits(true)}
                    aria-pressed={showMetricUnits}
                    aria-label="Visa metriska måttenheter"
                  >
                    Metriska
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm ${!showMetricUnits ? 'bg-primary-color text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => setShowMetricUnits(false)}
                    aria-pressed={!showMetricUnits}
                    aria-label="Visa amerikanska måttenheter"
                  >
                    Amerikanska
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recipe content with tabs - modified for print */}
          <div className="mb-12">
            <div className="border-b border-gray-200 mb-6 print:hidden">
              <div className="flex overflow-x-auto recipe-tabs space-x-6">
                <button 
                  className={`py-3 px-1 font-medium ${activeTab === 'ingredients' ? 'text-primary-color border-b-2 border-primary-color' : 'text-gray-500 hover:text-primary-color'}`}
                  onClick={() => setActiveTab('ingredients')}
                >
                  Ingredienser
                </button>
                <button 
                  className={`py-3 px-1 font-medium ${activeTab === 'instructions' ? 'text-primary-color border-b-2 border-primary-color' : 'text-gray-500 hover:text-primary-color'}`}
                  onClick={() => setActiveTab('instructions')}
                >
                  Tillagning
                </button>
                {recipe.nutritionInfo && (
                  <button 
                    className={`py-3 px-1 font-medium ${activeTab === 'nutrition' ? 'text-primary-color border-b-2 border-primary-color' : 'text-gray-500 hover:text-primary-color'}`}
                    onClick={() => setActiveTab('nutrition')}
                  >
                    Näringsvärden
                  </button>
                )}
                {recipe.tips && recipe.tips.length > 0 && (
                  <button 
                    className={`py-3 px-1 font-medium ${activeTab === 'tips' ? 'text-primary-color border-b-2 border-primary-color' : 'text-gray-500 hover:text-primary-color'}`}
                    onClick={() => setActiveTab('tips')}
                  >
                    Tips & variationer
                  </button>
                )}
              </div>
            </div>

            {/* Ingredients */}
            <div className={`${activeTab !== 'ingredients' ? 'hidden' : ''} print:block`}>
              <h2 className="text-2xl font-bold text-primary-color mb-6 print:text-xl print:page-break-after-avoid">Ingredienser</h2>
              
              {recipe.allergens && recipe.allergens.length > 0 && (
                <div className="mb-6 p-4 bg-yellow-50 rounded-lg flex items-start print:border print:border-yellow-400 print:bg-transparent">
                  <AlertCircle className="text-yellow-500 mr-3 mt-1 flex-shrink-0 print:hidden" size={20} />
                  <div>
                    <p className="font-medium text-yellow-700 print:text-black">Allergener:</p>
                    <p className="text-yellow-700 print:text-black">{recipe.allergens.join(', ')}</p>
                  </div>
                </div>
              )}
              
              {recipe.content.ingredients.map((section, index) => (
                <div key={index} className="mb-8 print:mb-4">
                  {section.section && (
                    <h3 className="text-xl font-semibold text-accent-color mb-4 print:text-lg print:mb-2">
                      {section.section}
                    </h3>
                  )}
                  <ul className="space-y-3 print:space-y-1">
                    {section.items.map((ingredient, i) => {
                      // Extract amount and ingredient name
                      const regex = /^(\d+(?:[.,]\d+)?\s*(?:\w+)?\s*(?:\w+)?)\s(.+)$/;
                      const match = ingredient.match(regex);
                      
                      // If there's a number in the ingredient, adjust it
                      if (match && match.length > 2) {
                        const originalAmount = match[1];
                        const ingredientName = match[2];
                        const adjustedAmount = adjustAmount(originalAmount, originalPortions);
                        
                        return (
                          <li key={i} className="flex items-start text-brown-500 print:text-black">
                            <span className="w-2 h-2 bg-primary-color rounded-full mr-3 mt-2 print:w-1 print:h-1"></span>
                            <span>
                              <strong>
                                {showMetricUnits ? adjustedAmount : metricToImperial(adjustedAmount)}
                              </strong> {ingredientName}
                            </span>
                          </li>
                        );
                      }
                      
                      // Otherwise return as is
                      return (
                        <li key={i} className="flex items-start text-brown-500 print:text-black">
                          <span className="w-2 h-2 bg-primary-color rounded-full mr-3 mt-2 print:w-1 print:h-1"></span>
                          {ingredient}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className={`${activeTab !== 'instructions' ? 'hidden' : ''} print:block print:mt-8`}>
              <h2 className="text-2xl font-bold text-primary-color mb-6 print:text-xl print:page-break-after-avoid">Gör såhär</h2>
              
              {recipe.content.instructions.map((section, index) => (
                <div key={index} className="mb-8 print:mb-4">
                  {section.section && (
                    <h3 className="text-xl font-semibold text-accent-color mb-4 print:text-lg print:mb-2">
                      {section.section}
                    </h3>
                  )}
                  <ol className="space-y-6 print:space-y-3">
                    {section.steps.map((step, i) => (
                      <li 
                        key={i}
                        className="flex items-start text-brown-500 print:text-black"
                      >
                        <span className="flex-shrink-0 w-8 h-8 bg-beige-100 rounded-full flex items-center justify-center text-primary-color font-semibold mr-4 print:w-6 print:h-6 print:text-sm print:bg-gray-200">
                          {i + 1}
                        </span>
                        <p className="pt-1 print:pt-0">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            {/* Nutrition */}
            <div className={`${activeTab !== 'nutrition' ? 'hidden' : ''} print:block print:mt-8 print:page-break-before-always`}>
              {recipe.nutritionInfo && (
                <>
                  <h2 className="text-2xl font-bold text-primary-color mb-6 print:text-xl">Näringsvärden</h2>
                  <p className="text-sm text-gray-500 mb-4 print:mb-2">Per portion, baserat på {portionCount} portioner</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 print:mb-4 print:gap-2 print:grid-cols-4">
                    {recipe.nutritionInfo.calories && (
                      <div className="bg-beige-50 p-4 rounded-lg text-center print:p-2 print:bg-transparent print:border print:border-gray-300">
                        <h4 className="font-medium text-brown-700 print:text-sm">Kalorier</h4>
                        <p className="text-xl font-bold text-primary-color print:text-base">{recipe.nutritionInfo.calories}</p>
                      </div>
                    )}
                    {recipe.nutritionInfo.protein && (
                      <div className="bg-beige-50 p-4 rounded-lg text-center print:p-2 print:bg-transparent print:border print:border-gray-300">
                        <h4 className="font-medium text-brown-700 print:text-sm">Protein</h4>
                        <p className="text-xl font-bold text-primary-color print:text-base">{recipe.nutritionInfo.protein}</p>
                      </div>
                    )}
                    {recipe.nutritionInfo.carbs && (
                      <div className="bg-beige-50 p-4 rounded-lg text-center print:p-2 print:bg-transparent print:border print:border-gray-300">
                        <h4 className="font-medium text-brown-700 print:text-sm">Kolhydrater</h4>
                        <p className="text-xl font-bold text-primary-color print:text-base">{recipe.nutritionInfo.carbs}</p>
                      </div>
                    )}
                    {recipe.nutritionInfo.fat && (
                      <div className="bg-beige-50 p-4 rounded-lg text-center print:p-2 print:bg-transparent print:border print:border-gray-300">
                        <h4 className="font-medium text-brown-700 print:text-sm">Fett</h4>
                        <p className="text-xl font-bold text-primary-color print:text-base">{recipe.nutritionInfo.fat}</p>
                      </div>
                    )}
                    {recipe.nutritionInfo.fiber && (
                      <div className="bg-beige-50 p-4 rounded-lg text-center print:p-2 print:bg-transparent print:border print:border-gray-300">
                        <h4 className="font-medium text-brown-700 print:text-sm">Fiber</h4>
                        <p className="text-xl font-bold text-primary-color print:text-base">{recipe.nutritionInfo.fiber}</p>
                      </div>
                    )}
                    {recipe.nutritionInfo.salt && (
                      <div className="bg-beige-50 p-4 rounded-lg text-center print:p-2 print:bg-transparent print:border print:border-gray-300">
                        <h4 className="font-medium text-brown-700 print:text-sm">Salt</h4>
                        <p className="text-xl font-bold text-primary-color print:text-base">{recipe.nutritionInfo.salt}</p>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 print:text-xs">
                    Näringsberäkningen är en uppskattning. Exakta värden kan variera beroende på specifika ingredienser och varumärken som används.
                  </p>
                </>
              )}
            </div>

            {/* Tips & Variations */}
            <div className={`${activeTab !== 'tips' ? 'hidden' : ''} print:block print:mt-8`}>
              {recipe.tips && recipe.tips.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold text-primary-color mb-6 print:text-xl">Tips & variationer</h2>
                  <div className="bg-beige-50 rounded-xl p-8 print:p-4 print:bg-transparent print:border print:border-gray-300">
                    <ul className="space-y-4 print:space-y-2">
                      {recipe.tips.map((tip, index) => (
                        <li 
                          key={index}
                          className="flex items-start text-brown-500 print:text-black"
                        >
                          <span className="w-2 h-2 bg-primary-color rounded-full mr-3 mt-2"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Rating and Comments - hidden when printing */}
          <div className="border-t border-gray-200 pt-10 print:hidden">
            <h2 className="text-2xl font-bold text-primary-color mb-6">Betygsätt receptet</h2>
            
            <div className="flex items-center mb-8">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    onClick={() => handleRating(star)}
                    className="text-2xl"
                    aria-label={`Ge ${star} stjärnor i betyg`}
                  >
                    <Star 
                      fill={userRating >= star ? "#FFB74D" : "none"} 
                      className={userRating >= star ? "text-amber-400" : "text-gray-300"}
                      size={24}
                    />
                  </button>
                ))}
              </div>
              <span className="ml-4 text-gray-500">
                {userRating > 0 
                  ? `Du gav receptet ${userRating} stjärn${userRating === 1 ? 'a' : 'or'}` 
                  : 'Klicka för att betygsätta'}
              </span>
            </div>
            
            {commentSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mb-8">
                <div className="inline-flex items-center justify-center bg-green-100 p-3 rounded-full text-green-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">Tack för din kommentar!</h4>
                <p className="text-gray-600">Din kommentar har skickats in och väntar på godkännande.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4">Lämna en kommentar</h3>
                <form onSubmit={handleSubmitComment} className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Namn <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        id="name" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color" 
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-post (visas ej) <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        id="email" 
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color" 
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Kommentar <span className="text-red-500">*</span></label>
                    <textarea 
                      id="comment" 
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color" 
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-primary-color text-white py-2 px-6 rounded-lg hover:bg-accent-color transition-colors"
                  >
                    Skicka kommentar
                  </button>
                </form>
              </>
            )}
            
            {/* Sample comments (you would normally fetch these from a database) */}
            <h3 className="text-xl font-semibold mb-4">Kommentarer</h3>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <div className="flex justify-between">
                  <h4 className="font-medium">Anna Johansson</h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        size={16}
                        fill="#FFB74D" 
                        className="text-amber-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-2">15 april 2023</p>
                <p>Helt fantastiskt recept! Majonnäsen var pricken över i. Jag gjorde med halloumi istället för lax eftersom jag är vegetarian, och det blev super gott!</p>
              </div>
              
              <div className="border-b pb-6">
                <div className="flex justify-between">
                  <h4 className="font-medium">Erik Lundgren</h4>
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <Star 
                        key={star}
                        size={16}
                        fill="#FFB74D" 
                        className="text-amber-400"
                      />
                    ))}
                    <Star size={16} className="text-gray-300" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-2">3 mars 2023</p>
                <p>Jättegod rätt som hela familjen tyckte om! Hade lite mer cayennepeppar i både majonnäsen och på laxen för vi gillar stark mat. Kommer definitivt göra igen!</p>
              </div>
            </div>
          </div>

          {/* Print-friendly footer */}
          <div className="mt-16 text-center hidden print:block text-sm">
            <p>© {new Date().getFullYear()} MaykasKitchen. Recept av Mayka Gulo.</p>
            <p className="mt-1">www.maykaskitchen.se</p>
          </div>
        </div>
      </div>
    </article>
  );
};