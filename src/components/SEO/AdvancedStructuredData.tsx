import React from 'react';

// Enhanced Recipe schema för AEO optimization
export const AdvancedRecipeSchema: React.FC<{
  recipe: {
    id: string;
    title: string;
    description: string;
    image: string;
    time: string;
    portions: string;
    rating: number;
    reviews: number;
    content: any;
    badges: string[];
    difficulty?: string;
    nutritionInfo?: any;
  };
}> = ({ recipe }) => {
  
  const enhancedRecipeData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "description": recipe.description,
    "image": {
      "@type": "ImageObject",
      "url": recipe.image,
      "width": 1200,
      "height": 800,
      "caption": `${recipe.title} - Autentisk ${recipe.badges.includes('Assyriskt') ? 'assyrisk' : 'syriansk'} matlagning av Mayka Gulo`
    },
    "author": {
      "@type": "Person",
      "name": "Mayka Gulo",
      "@id": "https://maykaskitchen.se/#mayka-gulo",
      "url": "https://maykaskitchen.se",
      "image": "https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCvA6O3yhwpAvKSmuXsEtqUGlWP80xMr5Ihgb4",
      "jobTitle": "Kock och Matkreatör",
      "description": "Kock och matinfluencer specialiserad på autentisk assyrisk och syriansk matlagning",
      "sameAs": [
        "https://www.instagram.com/maykaskitchen/",
        "https://www.tiktok.com/@Maykaskitchen",
        "https://www.youtube.com/@Maykaskitchen",
        "https://www.facebook.com/maykaskitchen/"
      ],
      "knowsAbout": [
        "Assyrisk matlagning",
        "Syriansk matlagning",
        "Mellanöstern kök",
        "Traditionella recept",
        "Säsongsbaserad matlagning"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "MaykasKitchen",
      "@id": "https://maykaskitchen.se/#organization",
      "url": "https://maykaskitchen.se",
      "logo": {
        "@type": "ImageObject",
        "url": "https://maykaskitchen.se/logo.svg",
        "width": 200,
        "height": 200
      },
      "foundingDate": "2019",
      "founder": {
        "@type": "Person",
        "name": "Mayka Gulo"
      }
    },
    "datePublished": "2024-01-15T00:00:00+01:00",
    "dateModified": new Date().toISOString(),
    "prepTime": `PT${Math.ceil(parseInt(recipe.time) * 0.25)}M`,
    "cookTime": `PT${Math.ceil(parseInt(recipe.time) * 0.75)}M`,
    "totalTime": `PT${recipe.time}M`,
    "recipeCategory": determineCategory(recipe.badges),
    "recipeCuisine": determineCuisine(recipe.badges), 
    "recipeYield": recipe.portions,
    "keywords": generateSEOKeywords(recipe),
    "recipeIngredient": recipe.content.ingredients.flatMap(section => 
      section.items.map(item => item.trim())
    ),
    "recipeInstructions": recipe.content.instructions.flatMap((section, sectionIndex) => 
      section.steps.map((step, stepIndex) => ({
        "@type": "HowToStep",
        "name": `Steg ${stepIndex + 1}${section.section ? ` - ${section.section}` : ''}`,
        "text": step,
        "position": stepIndex + 1,
        "image": recipe.image, // Add step images för better AEO
        "url": `https://maykaskitchen.se#recipe/${recipe.id}#step-${sectionIndex}-${stepIndex}`
      }))
    ),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": recipe.rating,
      "reviewCount": recipe.reviews,
      "bestRating": 5,
      "worstRating": 1,
      "ratingCount": recipe.reviews
    },
    "nutrition": recipe.nutritionInfo ? {
      "@type": "NutritionInformation",
      "calories": recipe.nutritionInfo.calories,
      "proteinContent": recipe.nutritionInfo.protein,
      "carbohydrateContent": recipe.nutritionInfo.carbs,
      "fatContent": recipe.nutritionInfo.fat,
      "fiberContent": recipe.nutritionInfo.fiber,
      "sodiumContent": recipe.nutritionInfo.salt,
      "servingSize": "1 portion",
      "sugarContent": "0g", // Default för savory recipes
      "unsaturatedFatContent": "Low"
    } : undefined,
    "recipeYield": `${recipe.portions} portioner`,
    "suitableForDiet": determineDietaryRestrictions(recipe.badges),
    "cookingMethod": determineCookingMethod(recipe.content.instructions),
    "recipeCuisine": [
      determineCuisine(recipe.badges),
      "Middle Eastern",
      "Swedish adapted"
    ].filter(Boolean),
    "isAccessibleForFree": true,
    "creativeWorkStatus": "Published",
    "inLanguage": "sv-SE",
    "audience": {
      "@type": "Audience",
      "audienceType": "Home Cooks, Food Enthusiasts",
      "geographicArea": {
        "@type": "Country",
        "name": "Sweden"
      }
    },
    "mentions": extractMentions(recipe.content),
    "about": [
      {
        "@type": "Thing",
        "name": "Assyrisk matlagning",
        "description": "Traditionell matlagning från Assyrien"
      },
      {
        "@type": "Thing", 
        "name": "Syriansk matlagning",
        "description": "Autentiska recept från Syrien"
      }
    ],
    "mainEntity": {
      "@type": "Question",
      "name": `Hur lagar man ${recipe.title.toLowerCase()}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${recipe.description} Tillagningstid: ${recipe.time} minuter. Antal portioner: ${recipe.portions}.`
      }
    }
  };

  React.useEffect(() => {
    let script = document.querySelector(`script[data-recipe-id="${recipe.id}"]`);
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-recipe-id', recipe.id);
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(enhancedRecipeData, null, 2);

    return () => {
      const existingScript = document.querySelector(`script[data-recipe-id="${recipe.id}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [recipe.id]);

  return null;
};

// FAQ Schema för common food questions
export const FoodBlogFAQSchema: React.FC = () => {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question", 
        "name": "Vad är assyrisk matlagning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Assyrisk matlagning är en traditionell kökskonst från Mesopotamien som använder kryddor som spiskummin, koriander, sumak och saffran. Typiska rätter inkluderar kafta bil sejnie (köttbullar i tomatsås), dolma, och olika bulgurrätter. Matlagningen fokuserar på färska ingredienser och komplexa smakkombinationer."
        }
      },
      {
        "@type": "Question",
        "name": "Hur lagar man kafta bil sejnie?", 
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kafta bil sejnie är köttbullar i tomatsås. Blanda nötfärs med finhackad lök, paprika och persilja. Forma till bollar, stek lätt, lägg i ugnsform med potatis och häll över tomatpuré blandat med vatten, kalvbuljong och kryddor som biber och koriander. Grädda i ugn i ca 45-60 minuter."
        }
      },
      {
        "@type": "Question",
        "name": "Vilka kryddor använder man i syriansk matlagning?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Syriansk matlagning använder kryddor som sumak (för syrlighet), za'atar, kanel, nejlikor, svartpeppar, vitpeppar, spiskummin, koriander, och baharat (en kryddblandning). Färska örter som persilja, mynta och koriander är också centrala."
        }
      },
      {
        "@type": "Question",
        "name": "Var kan jag köpa assyriska matvaror i Sverige?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Assyriska och mellanösternska matvaror finns i orientaliska livsmedelsbutiker i Stockholm, Göteborg, Malmö och andra större städer. Online-butiker som Orientmarket.se och lokala importörer säljer kryddor som sumak, bulgur, tahini och andra specialiteter. ICA och Coop har börjat föra vissa grundvaror som bulgur och tomatpuré från Mellanöstern."
        }
      }
    ]
  };

  React.useEffect(() => {
    let script = document.querySelector('script[data-type="faq-schema"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-type', 'faq-schema');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(faqData);
  }, []);

  return null;
};

// Helper functions
const determineCategory = (badges: string[]): string => {
  if (badges.includes('Huvudrätt')) return 'Huvudrätt';
  if (badges.includes('Fisk')) return 'Fiskrätter';
  if (badges.includes('Kött')) return 'Kötträtter'; 
  if (badges.includes('Vegetariskt')) return 'Vegetariska rätter';
  if (badges.includes('Bakverk')) return 'Bakverk';
  return 'Huvudrätt';
};

const determineCuisine = (badges: string[]): string => {
  if (badges.includes('Assyriskt')) return 'Assyrisk';
  if (badges.includes('Syriskt')) return 'Syriansk';
  if (badges.includes('Turkiskt')) return 'Turkisk';
  if (badges.includes('Libanesiskt')) return 'Libanesisk';
  if (badges.includes('Mellanöstern')) return 'Mellanöstern';
  return 'Assyrisk/Syriansk';
};

const determineDietaryRestrictions = (badges: string[]): string[] => {
  const restrictions = [];
  if (badges.includes('Vegan')) restrictions.push('VeganDiet');
  if (badges.includes('Vegetariskt')) restrictions.push('VegetarianDiet');
  if (badges.includes('Glutenfritt')) restrictions.push('GlutenFreeDiet');
  if (badges.includes('Fisk')) restrictions.push('PescatarianDiet');
  return restrictions;
};

const determineCookingMethod = (instructions: any[]): string => {
  const allSteps = instructions.flatMap(section => section.steps).join(' ').toLowerCase();
  if (allSteps.includes('ugn')) return 'Baking';
  if (allSteps.includes('stek')) return 'Frying';
  if (allSteps.includes('koka')) return 'Boiling';
  if (allSteps.includes('grilla')) return 'Grilling';
  return 'Mixed';
};

const generateSEOKeywords = (recipe: any): string => {
  const baseKeywords = [
    recipe.title,
    ...recipe.badges,
    'assyrisk mat',
    'syriansk matlagning', 
    'mellanöstern recept',
    'mayka gulo recept',
    'autentisk matlagning',
    `${recipe.time} minuter recept`,
    `recept ${recipe.portions} portioner`
  ];
  
  // Add ingredient-based keywords
  const ingredients = recipe.content.ingredients.flatMap(section => section.items);
  const commonIngredients = ingredients
    .filter(item => ['kött', 'kyckling', 'lax', 'potatis', 'tomat', 'lök', 'vitlök'].some(keyword => 
      item.toLowerCase().includes(keyword)
    ))
    .map(item => {
      if (item.toLowerCase().includes('kött')) return 'köttrecept';
      if (item.toLowerCase().includes('kyckling')) return 'kycklingrecept';
      if (item.toLowerCase().includes('lax')) return 'laxrecept';
      return null;
    })
    .filter(Boolean);
  
  return [...baseKeywords, ...commonIngredients].join(', ');
};

const extractMentions = (content: any): any[] => {
  const mentions = [];
  
  // Extract ingredient mentions for entity linking
  content.ingredients.flatMap(section => section.items).forEach(ingredient => {
    if (ingredient.toLowerCase().includes('sumak')) {
      mentions.push({
        "@type": "Thing",
        "name": "Sumak",
        "description": "Mellanösternkrydda med syrlig smak"
      });
    }
    if (ingredient.toLowerCase().includes('bulgur')) {
      mentions.push({
        "@type": "Thing", 
        "name": "Bulgur",
        "description": "Förbehandlad krossad vete från Mellanöstern"
      });
    }
  });
  
  return mentions.slice(0, 5); // Begränsa till 5 mentions
};

// HowTo schema för cooking techniques
export const CookingTechniqueSchema: React.FC<{
  technique: string;
  steps: string[];
  recipeId: string;
}> = ({ technique, steps, recipeId }) => {
  
  const howToData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Hur man ${technique.toLowerCase()}`,
    "description": `Lär dig tekniken ${technique} enligt Mayka Gulo från MaykasKitchen`,
    "image": "https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCvA6O3yhwpAvKSmuXsEtqUGlWP80xMr5Ihgb4",
    "totalTime": "PT15M",
    "estimatedCost": {
      "@type": "MonetaryAmount", 
      "currency": "SEK",
      "value": "50"
    },
    "supply": [
      "Kastrull",
      "Stekpanna", 
      "Träslev",
      "Skärbräda"
    ],
    "tool": [
      "Kniv",
      "Matberedare",
      "Ugn"
    ],
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "name": `Steg ${index + 1}`,
      "text": step,
      "position": index + 1,
      "url": `https://maykaskitchen.se#recipe/${recipeId}#technique-${index + 1}`
    }))
  };

  React.useEffect(() => {
    let script = document.querySelector(`script[data-technique="${technique}"]`);
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-technique', technique);
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(howToData);
  }, [technique, recipeId]);

  return null;
};

export { AdvancedRecipeSchema, CookingTechniqueSchema, FoodBlogFAQSchema };