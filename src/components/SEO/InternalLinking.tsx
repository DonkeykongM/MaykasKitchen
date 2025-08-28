import React from 'react';

interface InternalLink {
  text: string;
  href: string;
  context: string;
  priority: 'high' | 'medium' | 'low';
}

export const useInternalLinking = (pageId: string) => {
  // Strategic internal linking for food blog SEO
  const getContextualLinks = (): InternalLink[] => {
    const baseLinks = [
      {
        text: "alla våra assyriska recept",
        href: "#recept/alla?filter=assyriskt",
        context: "recipe-collection",
        priority: 'high' as const
      },
      {
        text: "traditionella syrianska rätter", 
        href: "#recept/alla?filter=syriskt",
        context: "cuisine-type",
        priority: 'high' as const
      },
      {
        text: "vegetariska mellanösternrecept",
        href: "#recept/alla?filter=vegetariskt", 
        context: "dietary",
        priority: 'medium' as const
      },
      {
        text: "snabba vardagsrecept",
        href: "#recept/alla?filter=snabb",
        context: "time-based",
        priority: 'medium' as const
      }
    ];

    // Page-specific contextual links
    const pageSpecificLinks: Record<string, InternalLink[]> = {
      'kafta-bil-sejnie': [
        {
          text: "fler köttrecept från mellanöstern",
          href: "#recept/alla?filter=kött",
          context: "related-protein",
          priority: 'high' as const
        },
        {
          text: "andra traditionella assyriska grytor",
          href: "#recipe/kofta-bil-sanieh",
          context: "similar-recipe",
          priority: 'high' as const
        }
      ],
      'lax-risbowl': [
        {
          text: "fler hälsosamma fiskrecept",
          href: "#recept/alla?filter=fisk",
          context: "related-protein", 
          priority: 'high' as const
        },
        {
          text: "vegetariska bowls och sallader",
          href: "#recept/alla?filter=vegetariskt",
          context: "similar-format",
          priority: 'medium' as const
        }
      ]
    };

    return [...baseLinks, ...(pageSpecificLinks[pageId] || [])];
  };

  return { getContextualLinks };
};

// Component för att automatiskt lägga till kontextuella länkar i receptbeskrivningar
export const ContextualLinkInjector: React.FC<{
  text: string;
  recipeId: string;
  className?: string;
}> = ({ text, recipeId, className = "" }) => {
  const { getContextualLinks } = useInternalLinking(recipeId);
  const links = getContextualLinks();

  // Inject high-priority links naturally into text
  let enhancedText = text;
  
  // Add contextual internal links where natural
  links
    .filter(link => link.priority === 'high')
    .forEach(link => {
      if (text.includes('traditionell') && link.context === 'cuisine-type') {
        enhancedText = enhancedText.replace(
          /traditionell[a-zA-Z\s]*/i,
          `<a href="${link.href}" class="text-purple-600 hover:text-purple-800 underline">${link.text}</a>`
        );
      }
    });

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: enhancedText }}
    />
  );
};

// Relaterade recept-sektion för bättre internal linking
export const RelatedRecipesLinks: React.FC<{
  currentRecipeId: string;
  badges: string[];
}> = ({ currentRecipeId, badges }) => {
  
  const getRelatedRecipes = () => {
    const recipeDatabase = {
      'kafta-bil-sejnie': [
        { id: 'kofta-bil-sanieh', title: 'Köfta bil Sanieh', reason: 'Liknande köttfärsrätter' },
        { id: 'kyckling-shawarma', title: 'Kyckling Shawarma', reason: 'Traditionell mellanösternmat' },
        { id: 'lins-bulgur-jarpar', title: 'Lins- och bulgurjärpar', reason: 'Assyriska traditionella rätter' }
      ],
      'lax-risbowl': [
        { id: 'pasta-pesto', title: 'Pasta pesto med halloumi', reason: 'Snabba vardagsrätter' },
        { id: 'kall-foul-medames', title: 'Kall foul medames', reason: 'Hälsosamma bowls & sallader' },
        { id: 'kikarts-channa-masala', title: 'Channa masala', reason: 'Vegetariska alternativ' }
      ],
      'kofta-bil-sanieh': [
        { id: 'kafta-bil-sejnie', title: 'Kafta bil sejnie', reason: 'Assyriska köttfärsrätter' },
        { id: 'mini-lahmacun', title: 'Mini Lahmacun', reason: 'Turkiska smaker' },
        { id: 'kyckling-shawarma', title: 'Kyckling Shawarma', reason: 'Mellanösternkött' }
      ]
    };

    return recipeDatabase[currentRecipeId] || [];
  };

  const relatedRecipes = getRelatedRecipes();
  
  if (relatedRecipes.length === 0) return null;

  return (
    <section className="bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-lg border border-purple-100 mb-8">
      <h3 className="text-xl font-bold text-purple-600 mb-4 text-center">
        Relaterade recept du kanske gillar
      </h3>
      <div className="grid gap-3">
        {relatedRecipes.map((recipe) => (
          <a
            key={recipe.id}
            href={`#recipe/${recipe.id}`}
            className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
          >
            <div>
              <h4 className="font-medium text-gray-800 group-hover:text-purple-600">
                {recipe.title}
              </h4>
              <p className="text-sm text-gray-600">{recipe.reason}</p>
            </div>
            <ChevronRight size={16} className="text-purple-400 group-hover:text-purple-600 transition-colors" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default useInternalLinking;