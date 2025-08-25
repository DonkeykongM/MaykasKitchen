import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Clock, Users, Heart, Instagram, ArrowLeft, Printer, Bookmark, Share2, AlertCircle, Star, MessageCircle, Send } from 'lucide-react';
import { getRecipeStats, getRecipeComments, submitComment, submitRating, type RecipeComment } from '../lib/recipeService';

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
    personalStory?: string;
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
  const [isSaved, setIsSaved] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Real-time data from database
  const [liveComments, setLiveComments] = useState<RecipeComment[]>([]);
  const [liveRating, setLiveRating] = useState(recipe.rating);
  const [liveReviewCount, setLiveReviewCount] = useState(recipe.reviews);
  const [loading, setLoading] = useState(true);

  // Load real-time data on component mount
  useEffect(() => {
    const loadRecipeData = async () => {
      setLoading(true);
      try {
        // Load comments
        const comments = await getRecipeComments(recipe.id);
        setLiveComments(comments);
        
        // Load statistics
        const stats = await getRecipeStats(recipe.id);
        setLiveRating(stats.average_rating);
        setLiveReviewCount(stats.total_comments);
      } catch (error) {
        console.error('Error loading recipe data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipeData();
  }, [recipe.id]);

  // Fallback comments for display while loading
  const fallbackComments = useMemo(() => {
    const commentsByRecipe = {
      'lins-bulgur-jarpar': [
        {
          id: 1,
          name: "Erik Lindqvist",
          rating: 4,
          date: "4 december 2024",
          text: "Som vegetarian är jag så tacksam för såna här proteinrika recept! Blev så mättad och smaken var fantastisk. Serverade i libabröd med citron - perfekt!"
        },
        {
          id: 2,
          name: "Miriam Öberg",
          rating: 4,
          date: "2 december 2024",
          text: "Supergott! Tog lite tid att hitta sumak men det var värt det. Gjorde extra och frös in - funkar perfekt att värma upp senare!"
        }
      ],
      'kycklingfile-potatis-dragon': [
        {
          id: 1,
          name: "Anders Nilsson",
          rating: 4,
          date: "3 december 2024",
          text: "Följde receptet exakt och resultatet var riktigt bra. Dragonsåsen var krämig och smakrik. Tog lite tid men värt det."
        }
      ],
      'pannpizzor': [
        {
          id: 1,
          name: "Sofia Andersson",
          rating: 4,
          date: "4 december 2024",
          text: "Så genialt enkelt! Användde kylskåpsrester som jag annars skulle kasta - blev helt perfekt. Barnen älskade sina egna små pizzor"
        }
      ],
      'batata-harra': [
        {
          id: 1,
          name: "Lina Pettersson",
          rating: 4,
          date: "1 december 2024",
          text: "Så krispig potatis och sådan smakrik sås! Serverade som tillbehör till grillat men kunde lätt ätit det som huvudrätt."
        }
      ],
      'lax-risbowl': [
        {
          id: 1,
          name: "Marcus Andersson",
          rating: 4,
          date: "28 november 2024",
          text: "Så enkelt och så gott! Älskar hur det blev så fräscht med alla primörgrönsaker. Honungs- och senapsmajonnäsen var pricken över i!"
        }
      ],
      'kafta-bil-sejnie': [
        {
          id: 1,
          name: "David Eriksson",
          rating: 4,
          date: "25 november 2024",
          text: "Första gången jag provat assyrisk mat och nu är jag helt såld. Köttbullarna var så saftiga och tomatsåsen var riktigt god."
        }
      ],
      'kofta-bil-sanieh': [
        {
          id: 1,
          name: "Carl Magnusson",
          rating: 4,
          date: "30 november 2024",
          text: "Gjorde detta över helgerna och hela familjen var förälskad! Padron paprikorna var ett genialt tillskott. Så mycket smak i varje tugga"
        }
      ],
      'pasta-pesto': [
        {
          id: 1,
          name: "Lisa Holm",
          rating: 4,
          date: "1 december 2024",
          text: "Så färgglatt och gott! Perfekt när man vill ha något snabbt men ändå festligt. Halloumin var ett genialt tillskott som gjorde rätten komplett!"
        },
        {
          id: 2,
          name: "Sarah Johansson",
          rating: 5,
          date: "15 november 2024",
          text: "Fantastiskt recept! Perfekt balans av smaker och så mättande. Sumaken ger verkligen den där extra smaken som gör skillnad."
        },
        {
          id: 3,
          name: "Carl Magnusson",
          rating: 4,
          date: "30 december 2024",
          text: "Gjorde detta över helgerna och hela familjen var förälskad! Padron paprikorna var ett genialt tillskott. Så mycket smak i varje tugga"
        },
        {
          id: 4,
          name: "Marcus Andersson",
          rating: 5,
          date: "28 november 2024",
          text: "Gjorde detta till hela familjen och alla älskade det! Så enkelt att laga och resultatet var verkligen professionellt. Kommer definitivt göra igen."
        }
      ]
    };
    
    return commentsByRecipe[recipe.id] || [];
  }, [recipe.id]);

  // Use live comments if available, otherwise fallback
  const displayComments = loading ? fallbackComments : liveComments.map(comment => ({
    id: comment.id,
    name: comment.user_name,
    rating: comment.rating || 4,
    date: new Date(comment.created_at).toLocaleDateString('sv-SE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    text: comment.comment_text
  }));

  const adjustAmount = useCallback((amount: string, originalPortions: number) => {
    const regex = /(\d+(?:\.\d+)?)\s*([a-zA-ZåäöÅÄÖ]+)?/;
    const match = amount.match(regex);
    
    if (match) {
      const value = parseFloat(match[1]);
      const unit = match[2] || '';
      const adjustedValue = (value * portionCount) / originalPortions;
      
      let formattedValue: string;
      if (adjustedValue % 1 === 0) {
        formattedValue = adjustedValue.toString();
      } else {
        formattedValue = adjustedValue.toFixed(1).replace(/\.0$/, '');
      }
      
      return `${formattedValue} ${unit}`.trim();
    }
    
    return amount;
  }, [portionCount]);

  // Optimized handlers with useCallback
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleSave = useCallback(() => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      localStorage.setItem(`saved-recipe-${recipe.id}`, 'true');
    } else {
      localStorage.removeItem(`saved-recipe-${recipe.id}`);
    }
  }, [isSaved, recipe.id]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href,
      });
    } else {
      const shareUrl = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
    }
  }, [recipe.title, recipe.description]);

  const handleRating = useCallback((rating: number) => {
    setUserRating(rating);
  }, []);

  const handleSubmitComment = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      setSubmitError('Namn är obligatoriskt');
      return;
    }
    
    if (!comment.trim()) {
      setSubmitError('Kommentar är obligatorisk');
      return;
    }
    
    if (userRating === 0) {
      setSubmitError('Vänligen sätt ett betyg');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const result = await submitComment(
        recipe.id,
        userName,
        comment,
        userRating,
        userEmail || undefined
      );
      
      if (result.success) {
        setSubmitSuccess(true);
        setComment('');
        setUserName('');
        setUserEmail('');
        setUserRating(0);
        
        // Reload data to show new comment and updated rating
        const newComments = await getRecipeComments(recipe.id);
        setLiveComments(newComments);
        
        const newStats = await getRecipeStats(recipe.id);
        setLiveRating(newStats.average_rating);
        setLiveReviewCount(newStats.total_comments);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        setSubmitError(result.error || 'Något gick fel');
      }
    } catch (error) {
      setSubmitError('Något gick fel. Försök igen.');
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [recipe.id, userName, comment, userRating, userEmail]);

  const originalPortions = parseInt(recipe.portions.split(' ')[0], 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <article className="py-4 md:py-8 print:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <button 
            onClick={onBack}
            className="flex items-center text-purple-600 hover:text-purple-700 mb-6 md:mb-8 group print:hidden transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg min-h-[44px]"
          >
            <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Tillbaka till receptsamlingen</span>
            <span className="sm:hidden">Tillbaka</span>
          </button>

          {/* Personal story section */}
          {recipe.personalStory && (
            <div className="bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl shadow-lg overflow-hidden mb-6 md:mb-8 p-4 md:p-8 border border-purple-100">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-600 rounded-full flex items-center justify-center mr-3 md:mr-4">
                  <Heart className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-purple-600">En personlig berättelse</h2>
                  <p className="text-gray-600 text-sm md:text-base">Från Maykas hjärta</p>
                </div>
              </div>
              <div className="prose prose-sm md:prose-lg max-w-none">
                {recipe.personalStory.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-3 md:mb-4 last:mb-0 text-sm md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Recipe header */}
          <div className="bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl shadow-lg overflow-hidden mb-6 md:mb-8 border border-purple-100">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  width="600"
                  height="400"
                />
              </div>
              <div className="p-4 md:p-6 lg:p-8 w-full lg:w-1/2">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {recipe.badges.map((badge, index) => (
                    <span 
                      key={index}
                      className="bg-purple-100 text-purple-800 text-xs md:text-sm py-1 px-2 md:px-3 rounded-full font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 font-serif leading-tight select-text cursor-text">
                  {recipe.title}
                </h1>

                {/* Recipe meta */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-4 md:mb-6 text-gray-600 text-sm md:text-base">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-purple-600" />
                    <span>{recipe.time} minuter</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-2 text-purple-600" />
                    <span>{portionCount} portioner</span>
                  </div>
                  <div className="flex items-center">
                    <Heart size={16} className="mr-2 text-purple-600" />
                    <span>{recipe.likes} gillar</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(liveRating) ? "#fbbf24" : "none"}
                        className={i < Math.floor(liveRating) ? "text-amber-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 text-sm md:text-base">({liveRating}/5 • {liveReviewCount} recensioner)</span>
                </div>

                <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base select-text cursor-text">
                  {recipe.description}
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <button 
                    onClick={handlePrint} 
                    className="flex items-center gap-2 px-3 md:px-4 py-2 bg-purple-100 rounded-lg text-purple-700 hover:bg-purple-200 transition-colors text-sm min-h-[44px]"
                  >
                    <Printer size={16} />
                    <span className="hidden sm:inline">Skriv ut</span>
                  </button>
                  
                  {recipe.videoUrl && (
                    <a 
                      href={recipe.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 md:px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm min-h-[44px]"
                    >
                      <Instagram size={16} />
                      <span className="hidden sm:inline">Se på Instagram</span>
                    </a>
                  )}
                  
                  <button 
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm min-h-[44px] ${
                      isSaved ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
                  >
                    <Bookmark size={16} fill={isSaved ? "white" : "none"} />
                    <span className="hidden sm:inline">{isSaved ? 'Sparat' : 'Spara'}</span>
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 px-3 md:px-4 py-2 bg-purple-100 rounded-lg text-purple-700 hover:bg-purple-200 transition-colors text-sm min-h-[44px]"
                  >
                    <Share2 size={16} />
                    <span className="hidden sm:inline">Dela</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Portions adjuster */}
          <div className="bg-white/90 backdrop-blur-md rounded-lg md:rounded-xl p-4 md:p-6 mb-6 md:mb-8 shadow-lg border border-purple-100">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-center text-purple-600">Justera portioner</h3>
            <div className="flex items-center justify-center">
              <button 
                onClick={() => setPortionCount(Math.max(1, portionCount - 1))}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 hover:bg-purple-200 transition-colors font-semibold text-lg min-h-[44px]"
              >
                -
              </button>
              <span className="mx-4 md:mx-6 text-lg md:text-xl font-semibold text-purple-600">{portionCount} portioner</span>
              <button 
                onClick={() => setPortionCount(portionCount + 1)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 hover:bg-purple-200 transition-colors font-semibold text-lg min-h-[44px]"
              >
                +
              </button>
            </div>
          </div>

          {/* Recipe content - SWAPPED: Instructions left, Ingredients right */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Instructions - NOW ON LEFT (3/4 width on desktop) */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="bg-white/90 backdrop-blur-md rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg mb-6 md:mb-8 border border-purple-100">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-purple-600 font-serif">
                  Gör såhär
                </h2>
                
                {recipe.content.instructions.map((section, index) => (
                  <div key={index} className="mb-6 md:mb-8">
                    {section.section && (
                      <h3 className="text-lg md:text-xl font-semibold text-purple-600 mb-3 md:mb-4 text-center">
                        {section.section}
                      </h3>
                    )}
                    <ol className="space-y-4 md:space-y-6">
                      {section.steps.map((step, i) => (
                        <li key={i} className="flex items-start">
                          <span className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-semibold mr-3 md:mr-4 text-xs md:text-sm">
                            {i + 1}
                          </span>
                          <p className="pt-1 text-gray-700 leading-relaxed text-sm md:text-base select-text cursor-text">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>

              {/* Tips */}
              {recipe.content.tips && recipe.content.tips.length > 0 && (
                <div className="bg-white/90 backdrop-blur-md rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg mb-6 md:mb-8 border border-purple-100">
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-center text-purple-600 font-serif">
                    Tips & variationer
                  </h2>
                  <ul className="space-y-2 md:space-y-3">
                    {recipe.content.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full mr-2 md:mr-3 mt-2"></span>
                        <span className="text-gray-700 leading-relaxed text-sm md:text-base select-text cursor-text">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Ingredients - NOW ON RIGHT (1/4 width on desktop, MUCH SMALLER & BETTER ALIGNED) */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg sticky top-8 border border-purple-100 p-4">
                <h2 className="text-base md:text-lg font-bold mb-4 text-center text-purple-600 font-serif">
                  Ingredienser
                </h2>
                
                {recipe.allergens && recipe.allergens.length > 0 && (
                  <div className="mb-4 p-3 bg-yellow-50 rounded-lg flex items-start text-sm border border-yellow-200">
                    <AlertCircle className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" size={14} />
                    <div>
                      <p className="font-medium text-yellow-700 text-xs">Allergener:</p>
                      <p className="text-yellow-700 text-xs">{recipe.allergens.join(', ')}</p>
                    </div>
                  </div>
                )}
                
                {recipe.content.ingredients.map((section, index) => (
                  <div key={index} className="mb-4">
                    {section.section && (
                      <h3 className="text-sm font-semibold text-purple-600 mb-3 text-center border-b border-purple-200 pb-2">
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
                            <li key={i} className="flex items-center text-sm">
                              <div className="flex items-center justify-center w-full">
                                <input 
                                  type="checkbox" 
                                  className="mr-3 text-purple-500 w-3 h-3 rounded focus:ring-purple-500 focus:ring-2" 
                                />
                                <div className="flex-1 text-center">
                                  <span className="block select-text cursor-text">
                                    <strong className="text-purple-600 font-semibold text-sm">{adjustedAmount}</strong>
                                  </span>
                                  <span className="block text-gray-700 text-sm leading-tight select-text cursor-text">{ingredientName}</span>
                                </div>
                              </div>
                            </li>
                          );
                        }
                        
                        return (
                          <li key={i} className="flex items-center text-sm">
                            <div className="flex items-center justify-center w-full">
                              <input 
                                type="checkbox" 
                                className="mr-3 text-purple-500 w-3 h-3 rounded focus:ring-purple-500 focus:ring-2" 
                              />
                              <div className="flex-1 text-center">
                                <span className="text-gray-700 text-sm leading-tight select-text cursor-text">{ingredient}</span>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rating and Comments */}
          <div className="bg-white/90 backdrop-blur-md rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg border border-purple-100">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-purple-600 font-serif">
              Betygsätt & kommentera
            </h2>
            
            {/* Rating */}
            <div className="flex items-center justify-center mb-6 md:mb-8">
              <span className="mr-3 md:mr-4 text-gray-700 text-sm md:text-base">Ditt betyg:</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    onClick={() => handleRating(star)}
                    className="text-xl md:text-2xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <Star 
                      fill={userRating >= star ? "#fbbf24" : "none"} 
                      className={userRating >= star ? "text-amber-400" : "text-gray-300"}
                      size={24}
                    />
                  </button>
                ))}
              </div>
              {userRating > 0 && (
                <span className="ml-3 md:ml-4 text-gray-600 text-sm md:text-base">
                  {userRating} stjärn{userRating === 1 ? 'a' : 'or'}
                </span>
              )}
            </div>
            
            {/* Comment form */}
            <form onSubmit={handleSubmitComment} className="mb-6 md:mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                <input
                  type="text"
                  placeholder="Ditt namn"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="px-3 md:px-4 py-2 md:py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/90 text-sm md:text-base min-h-[44px]"
                  required
                />
                <input
                  type="email"
                  placeholder="Din e-post (visas ej)"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="px-3 md:px-4 py-2 md:py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/90 text-sm md:text-base min-h-[44px]"
                />
              </div>
              
              <textarea
                placeholder="Skriv din kommentar här..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3 md:mb-4 bg-white/90 text-sm md:text-base"
                required
              />
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center mx-auto text-sm md:text-base min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Skickar...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Skicka kommentar
                    </>
                  )}
                </button>
              </div>
              
              {submitError && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-center text-sm">
                  {submitError}
                </div>
              )}
              
              {submitSuccess && (
                <div className="mt-4 p-3 bg-green-50 text-green-600 rounded-lg text-center text-sm">
                  Tack för din kommentar! Den visas nu på sidan.
                </div>
              )}
            </form>
            
            {/* Comments list */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-lg md:text-xl font-semibold flex items-center justify-center">
                <MessageCircle size={18} className="mr-2 text-purple-600" />
                Kommentarer ({displayComments.length})
              </h3>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Laddar kommentarer...</p>
                </div>
              ) : displayComments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Inga kommentarer än. Bli först att kommentera!</p>
                </div>
              ) : (
                displayComments.map((comment) => (
                  <div key={comment.id} className="border-b border-purple-100 pb-4 md:pb-6 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800 text-sm md:text-base">{comment.name}</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            size={14}
                            fill={i < comment.rating ? "#fbbf24" : "none"}
                            className={i < comment.rating ? "text-amber-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs md:text-sm mb-2 md:mb-3">{comment.date}</p>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">{comment.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};