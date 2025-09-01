import React from 'react';

// Component för Featured Snippet Optimization
export const FeaturedSnippetOptimization: React.FC<{
  question: string;
  answer: string;
  recipe?: any;
}> = ({ question, answer, recipe }) => {
  
  return (
    <div className="featured-snippet-content bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
      <h3 className="text-lg font-semibold text-blue-900 mb-2">{question}</h3>
      <div className="prose text-gray-700">
        <p className="mb-3">{answer}</p>
        {recipe && (
          <div className="bg-white p-3 rounded border">
            <p><strong>Tillagningstid:</strong> {recipe.time} minuter</p>
            <p><strong>Portioner:</strong> {recipe.portions}</p>
            <p><strong>Svårighetsgrad:</strong> {recipe.difficulty || 'Medel'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Voice Search Optimization
export const VoiceSearchOptimization: React.FC<{
  recipeTitle: string;
  cookingTime: string;
  servings: string;
}> = ({ recipeTitle, cookingTime, servings }) => {
  
  React.useEffect(() => {
    // Add voice search optimized meta tags
    const voiceSearchMeta = [
      { name: 'voice-search-question-1', content: `Hur lagar man ${recipeTitle.toLowerCase()}?` },
      { name: 'voice-search-question-2', content: `Vad är ingredienserna i ${recipeTitle.toLowerCase()}?` },
      { name: 'voice-search-question-3', content: `Hur lång tid tar det att laga ${recipeTitle.toLowerCase()}?` },
      { name: 'voice-search-answer-time', content: `${cookingTime} minuter` },
      { name: 'voice-search-answer-servings', content: `${servings} portioner` }
    ];

    voiceSearchMeta.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });
  }, [recipeTitle, cookingTime, servings]);

  return null;
};

// Recipe Summary Box för Featured Snippets
export const RecipeSummaryBox: React.FC<{
  recipe: any;
}> = ({ recipe }) => {
  
  return (
    <div className="recipe-summary-box bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200 my-8">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Receptsammanfattning</h2>
      
      {/* Structured för Featured Snippets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{recipe.time}</div>
          <div className="text-sm text-gray-600">Minuter</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{recipe.portions}</div>
          <div className="text-sm text-gray-600">Portioner</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{recipe.difficulty || 'Medel'}</div>
          <div className="text-sm text-gray-600">Svårighet</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{recipe.rating}</div>
          <div className="text-sm text-gray-600">Betyg</div>
        </div>
      </div>

      {/* Quick answer format */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold mb-2">Snabb beskrivning:</h3>
        <p className="text-gray-700">{recipe.description}</p>
        
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <strong>Huvudingredienser:</strong> {
              recipe.content.ingredients
                .flatMap(section => section.items.slice(0, 3))
                .map(item => item.split(' ').slice(1).join(' '))
                .join(', ')
            }
          </div>
          <div>
            <strong>Teknik:</strong> {
              recipe.content.instructions
                .flatMap(section => section.steps)
                .find(step => step.includes('stek') || step.includes('koka') || step.includes('ugn'))
                ?.split(' ')
                .find(word => ['stek', 'koka', 'grädda', 'blanda'].some(method => word.toLowerCase().includes(method))) || 'Blandteknik'
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export { FeaturedSnippetOptimization, VoiceSearchOptimization, RecipeSummaryBox };