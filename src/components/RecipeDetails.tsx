import React, { useState } from 'react';
import { Clock, Users, Heart, Instagram, ArrowLeft, Printer, Bookmark, Share2, AlertCircle, Star, MessageCircle, Send } from 'lucide-react';

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
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Anna Johansson",
      rating: 5,
      date: "15 april 2023",
      text: "Helt fantastiskt recept! Majonnäsen var pricken över i. Jag gjorde med halloumi istället för lax eftersom jag är vegetarian, och det blev super gott!"
    },
    {
      id: 2,
      name: "Erik Lundgren", 
      rating: 4,
      date: "3 mars 2023",
      text: "Jättegod rätt som hela familjen tyckte om! Hade lite mer cayennepeppar i både majonnäsen och på laxen för vi gillar stark mat. Kommer definitivt göra igen!"
    }
  ]);

  // Function to adjust ingredient amounts based on portion count
  const adjustAmount = (amount: string, originalPortions: number): string => {
    const regex = /(\d+(?:\.\d+)?)\s*([a-zA-ZåäöÅÄÖ]+)?/;
    const match = amount.match(regex);
    
    if (match) {
      const value = parseFloat(match[1]);
      const unit = match[2] || '';
      const adjustedValue = (value / originalPortions) * portionCount;
      
      let formattedValue: string;
      if (adjustedValue % 1 === 0) {
        formattedValue = adjustedValue.toString();
      } else {
        formattedValue = adjustedValue.toFixed(1).replace(/\.0$/, '');
      }
      
      return `${formattedValue} ${unit}`;
    }
    
    return amount;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
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
      }).catch((error) => console.log('Error sharing', error));
    } else {
      const shareUrl = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
    }
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() && comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        name: userName,
        rating: userRating,
        date: new Date().toLocaleDateString('sv-SE', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        text: comment
      };
      setComments([newComment, ...comments]);
      setComment('');
      setUserName('');
      setUserEmail('');
      setUserRating(0);
    }
  };

  const originalPortions = parseInt(recipe.portions.split(' ')[0], 10);

  return (
    <div className="min-h-screen bg-orange-50" style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fed7aa' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
    }}>
      <article className="py-12 print:py-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <button 
            onClick={onBack}
            className="flex items-center text-orange-600 hover:text-orange-700 mb-8 group print:hidden transition-colors"
          >
            <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
            Tillbaka till receptsamlingen
          </button>

          {/* Recipe header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/2 h-96 md:h-auto">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {recipe.badges.map((badge, index) => (
                    <span 
                      key={index}
                      className="bg-orange-100 text-orange-800 text-sm py-1 px-3 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {recipe.title}
                </h1>

                {/* Recipe meta */}
                <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600">
                  <div className="flex items-center">
                    <Clock size={18} className="mr-2" />
                    <span>{recipe.time} minuter</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={18} className="mr-2" />
                    <span>{portionCount} portioner</span>
                  </div>
                  <div className="flex items-center">
                    <Heart size={18} className="mr-2" />
                    {recipe.likes} gillar
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        fill={i < Math.floor(recipe.rating) ? "#fbbf24" : "none"}
                        className={i < Math.floor(recipe.rating) ? "text-amber-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">({recipe.rating}/5 • {recipe.reviews} recensioner)</span>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {recipe.description}
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={handlePrint} 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <Printer size={18} />
                    Skriv ut
                  </button>
                  
                  {recipe.videoUrl && (
                    <a 
                      href={recipe.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                    >
                      <Instagram size={18} />
                      Se på Instagram
                    </a>
                  )}
                  
                  <button 
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isSaved ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Bookmark size={18} fill={isSaved ? "white" : "none"} />
                    {isSaved ? 'Sparat' : 'Spara'}
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <Share2 size={18} />
                    Dela
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Portions adjuster */}
          <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Justera portioner</h3>
            <div className="flex items-center">
              <button 
                onClick={() => setPortionCount(Math.max(1, portionCount - 1))}
                className="w-10 h-10 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center text-orange-700 hover:bg-orange-200 transition-colors"
              >
                -
              </button>
              <span className="mx-4 text-lg font-medium">{portionCount} portioner</span>
              <button 
                onClick={() => setPortionCount(portionCount + 1)}
                className="w-10 h-10 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center text-orange-700 hover:bg-orange-200 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Recipe content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Ingredients */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg sticky top-8">
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Ingredienser
                </h2>
                
                {recipe.allergens && recipe.allergens.length > 0 && (
                  <div className="mb-6 p-4 bg-yellow-50 rounded-lg flex items-start">
                    <AlertCircle className="text-yellow-500 mr-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-yellow-700">Allergener:</p>
                      <p className="text-yellow-700">{recipe.allergens.join(', ')}</p>
                    </div>
                  </div>
                )}
                
                {recipe.content.ingredients.map((section, index) => (
                  <div key={index} className="mb-6">
                    {section.section && (
                      <h3 className="text-lg font-semibold text-orange-600 mb-3">
                        {section.section}
                      </h3>
                    )}
                    <ul className="space-y-2">
                      {section.items.map((ingredient, i) => {
                        const regex = /^(\d+(?:[.,]\d+)?\s*(?:\w+)?\s*(?:\w+)?)\s(.+)$/;
                        const match = ingredient.match(regex);
                        
                        if (match && match.length > 2) {
                          const originalAmount = match[1];
                          const ingredientName = match[2];
                          const adjustedAmount = adjustAmount(originalAmount, originalPortions);
                          
                          return (
                            <li key={i} className="flex items-start">
                              <input type="checkbox" className="mt-1 mr-3 text-orange-500" />
                              <span>
                                <strong className="text-orange-600">{adjustedAmount}</strong> {ingredientName}
                              </span>
                            </li>
                          );
                        }
                        
                        return (
                          <li key={i} className="flex items-start">
                            <input type="checkbox" className="mt-1 mr-3 text-orange-500" />
                            {ingredient}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Gör såhär
                </h2>
                
                {recipe.content.instructions.map((section, index) => (
                  <div key={index} className="mb-8">
                    {section.section && (
                      <h3 className="text-xl font-semibold text-orange-600 mb-4">
                        {section.section}
                      </h3>
                    )}
                    <ol className="space-y-6">
                      {section.steps.map((step, i) => (
                        <li key={i} className="flex items-start">
                          <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold mr-4 text-sm">
                            {i + 1}
                          </span>
                          <p className="pt-1">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>

              {/* Tips */}
              {recipe.content.tips && recipe.content.tips.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                  <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Tips & variationer
                  </h2>
                  <ul className="space-y-3">
                    {recipe.content.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Rating and Comments */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Betygsätt & kommentera
            </h2>
            
            {/* Rating */}
            <div className="flex items-center mb-8">
              <span className="mr-4">Ditt betyg:</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    onClick={() => handleRating(star)}
                    className="text-2xl transition-colors"
                  >
                    <Star 
                      fill={userRating >= star ? "#fbbf24" : "none"} 
                      className={userRating >= star ? "text-amber-400" : "text-gray-300"}
                      size={28}
                    />
                  </button>
                ))}
              </div>
              {userRating > 0 && (
                <span className="ml-4 text-gray-600">
                  {userRating} stjärn{userRating === 1 ? 'a' : 'or'}
                </span>
              )}
            </div>
            
            {/* Comment form */}
            <form onSubmit={handleSubmitComment} className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Ditt namn"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Din e-post (visas ej)"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              
              <textarea
                placeholder="Skriv din kommentar här..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
                required
              />
              
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center"
              >
                <Send size={16} className="mr-2" />
                Skicka kommentar
              </button>
            </form>
            
            {/* Comments list */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center">
                <MessageCircle size={20} className="mr-2" />
                Kommentarer ({comments.length})
              </h3>
              
              {comments.map((comment) => (
                <div key={comment.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{comment.name}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={16}
                          fill={i < comment.rating ? "#fbbf24" : "none"}
                          className={i < comment.rating ? "text-amber-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">{comment.date}</p>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};