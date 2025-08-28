import React from 'react';

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
  portions: string;
  rating: number;
  reviews: number;
  badges: string[];
  content: {
    ingredients: { section?: string; items: string[] }[];
    instructions: { section?: string; steps: string[] }[];
    tips?: string[];
  };
  nutritionInfo?: {
    calories?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
  };
}

export const RecipeStructuredData: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "description": recipe.description,
    "image": {
      "@type": "ImageObject",
      "url": recipe.image,
      "width": 1200,
      "height": 800
    },
    "author": {
      "@type": "Person",
      "name": "Mayka Gulo",
      "url": "https://maykaskitchen.se",
      "image": "https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCvA6O3yhwpAvKSmuXsEtqUGlWP80xMr5Ihgb4",
      "sameAs": [
        "https://www.instagram.com/maykaskitchen/",
        "https://www.tiktok.com/@Maykaskitchen",
        "https://www.youtube.com/@Maykaskitchen",
        "https://www.facebook.com/maykaskitchen/"
      ],
      "jobTitle": "Kock och Matkreatör"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "MaykasKitchen",
      "logo": {
        "@type": "ImageObject",
        "url": "https://maykaskitchen.se/logo.svg"
      }
    },
    "datePublished": "2024-01-15",
    "dateModified": new Date().toISOString(),
    "prepTime": `PT${Math.ceil(parseInt(recipe.time) * 0.3)}M`,
    "cookTime": `PT${Math.ceil(parseInt(recipe.time) * 0.7)}M`, 
    "totalTime": `PT${recipe.time}M`,
    "recipeCategory": recipe.badges.includes('Huvudrätt') ? 'Huvudrätt' : 'Huvudrätt',
    "recipeCuisine": recipe.badges.includes('Assyriskt') ? 'Assyrisk' : 
                     recipe.badges.includes('Syriskt') ? 'Syriansk' : 
                     recipe.badges.includes('Mellanöstern') ? 'Mellanöstern' : 'Assyrisk/Syriansk',
    "recipeYield": recipe.portions,
    "keywords": [recipe.title, ...recipe.badges, "assyrisk mat", "syriansk matlagning"].join(", "),
    "recipeIngredient": recipe.content.ingredients.flatMap(section => section.items),
    "recipeInstructions": recipe.content.instructions.flatMap(section => 
      section.steps.map((step, index) => ({
        "@type": "HowToStep",
        "name": section.section ? `${section.section} - Steg ${index + 1}` : `Steg ${index + 1}`,
        "text": step,
        "position": index + 1,
        "url": `https://maykaskitchen.se#recipe/${recipe.id}#step-${index + 1}`
      }))
    ),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": recipe.rating,
      "reviewCount": recipe.reviews,
      "bestRating": 5,
      "worstRating": 1
    },
    "nutrition": recipe.nutritionInfo ? {
      "@type": "NutritionInformation",
      "calories": recipe.nutritionInfo.calories,
      "proteinContent": recipe.nutritionInfo.protein,
      "carbohydrateContent": recipe.nutritionInfo.carbs,
      "fatContent": recipe.nutritionInfo.fat,
      "servingSize": "1 portion"
    } : undefined,
    "recipeInstructions": recipe.content.instructions.flatMap(section => 
      section.steps.map((step, index) => ({
        "@type": "HowToStep",
        "name": `Steg ${index + 1}`,
        "text": step,
        "position": index + 1
      }))
    ),
    "video": recipe.id === 'lax-risbowl' ? {
      "@type": "VideoObject",
      "name": recipe.title,
      "description": recipe.description,
      "thumbnailUrl": recipe.image,
      "contentUrl": "https://www.instagram.com/reel/DJXHMYpCoaR/",
      "uploadDate": "2024-01-15"
    } : undefined,
    "suitableForDiet": recipe.badges.includes('Vegan') ? 'VeganDiet' :
                       recipe.badges.includes('Vegetariskt') ? 'VegetarianDiet' :
                       recipe.badges.includes('Fisk') ? 'PescatarianDiet' : undefined
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
};

export const WebsiteStructuredData: React.FC = () => {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MaykasKitchen",
    "alternateName": "Mayka Gulo Matblogg",
    "url": "https://maykaskitchen.se",
    "description": "Autentisk assyrisk och syriansk matlagning med Mayka Gulo. Traditionella recept för moderna kök med över 125 000 följare på sociala medier.",
    "inLanguage": "sv-SE",
    "author": {
      "@type": "Person",
      "name": "Mayka Gulo",
      "url": "https://maykaskitchen.se",
      "sameAs": [
        "https://www.instagram.com/maykaskitchen/",
        "https://www.tiktok.com/@Maykaskitchen", 
        "https://www.youtube.com/@Maykaskitchen",
        "https://www.facebook.com/maykaskitchen/"
      ]
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://maykaskitchen.se#recept?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Assyriska och Syrianska Recept",
      "description": "Samling av autentiska recept från assyrisk och syriansk matlagning",
      "numberOfItems": 12,
      "itemListElement": [
        {
          "@type": "Recipe",
          "position": 1,
          "name": "Kafta bil sejnie - Köttbullar i tomatsås",
          "url": "https://maykaskitchen.se#recipe/kafta-bil-sejnie"
        },
        {
          "@type": "Recipe", 
          "position": 2,
          "name": "Kryddig lax- & risbowl",
          "url": "https://maykaskitchen.se#recipe/lax-risbowl"
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteData, null, 2)
      }}
    />
  );
};

export const PersonStructuredData: React.FC = () => {
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mayka Gulo",
    "alternateName": "MaykasKitchen",
    "description": "Kock, kreatör och matinfluencer med assyrisk/syriansk bakgrund. Specialiserad på säsongsbaserad mat, traditionella recept och modern matlagning.",
    "url": "https://maykaskitchen.se",
    "image": "https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCvA6O3yhwpAvKSmuXsEtqUGlWP80xMr5Ihgb4",
    "sameAs": [
      "https://www.instagram.com/maykaskitchen/",
      "https://www.tiktok.com/@Maykaskitchen",
      "https://www.youtube.com/@Maykaskitchen", 
      "https://www.facebook.com/maykaskitchen/"
    ],
    "jobTitle": "Kock och Matkreatör",
    "worksFor": {
      "@type": "Organization",
      "name": "MaykasKitchen"
    },
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Skåne",
      "addressCountry": "SE"
    },
    "email": "info@maykaskitchen.se",
    "telephone": "0734339908",
    "knowsAbout": [
      "Assyrisk matlagning",
      "Syriansk matlagning", 
      "Mellanöstern kök",
      "Säsongsbaserad matlagning",
      "Traditionella recept",
      "Modern matlagning",
      "Matfotografering",
      "Receptutveckling"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Professionell Kock",
        "description": "Över 10 års erfarenhet av professionell matlagning"
      }
    ],
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/FollowAction",
        "userInteractionCount": 125000,
        "description": "Instagram följare"
      },
      {
        "@type": "InteractionCounter", 
        "interactionType": "https://schema.org/LikeAction",
        "userInteractionCount": 62000,
        "description": "TikTok följare"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personData, null, 2)
      }}
    />
  );
};

export const FAQStructuredData: React.FC = () => {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Vad är assyrisk och syriansk matlagning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Assyrisk och syriansk matlagning är traditionell matlagning från Mellanöstern med rötter som sträcker sig tusentals år tillbaka. Den kännetecknas av rika smaker, kryddblandningar som spiskummin, koriander och sumak, samt användning av ingredienser som bulgur, linser, lamm och färska örter."
        }
      },
      {
        "@type": "Question",
        "name": "Var kan jag hitta ingredienser till assyriska recept?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De flesta ingredienser hittar du i vanliga matbutiker. För specialkryddor som sumak, bulgur och mellanösternkryddor kan du besöka orientaliska livsmedelsbutiker eller beställa online. Många ingredienser som tomatpuré, lök, kött och grönsaker finns i alla svenska matbutiker."
        }
      },
      {
        "@type": "Question",
        "name": "Kan jag anpassa recepten för vegetarianer?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Ja, många recept kan enkelt anpassas! Köttbullar kan göras med linser eller kikärtor, kött kan bytas mot halloumi eller tofu, och många traditionella rätter är naturligt vegetariska som hummus, baba ganoush och olika sallader."
        }
      },
      {
        "@type": "Question",
        "name": "Hur lagar jag kafta bil sejnie?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kafta bil sejnie är köttbullar i tomatsås. Blanda nötfärs med finhackad lök, paprika och persilja. Forma till bollar, stek lätt, lägg i ugnsform med potatis och häll över tomatpuré blandat med vatten och kryddor. Grädda i ugn tills genomkokt."
        }
      },
      {
        "@type": "Question", 
        "name": "Kan jag boka Mayka Gulo för matlagningsworkshops?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, Mayka Gulo erbjuder matlagningsworkshops och samarbeten. Kontakta via info@maykaskitchen.se eller genom kontaktformuläret på webbplatsen för mer information om tillgänglighet och priser."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData, null, 2)
      }}
    />
  );
};

export const BreadcrumbStructuredData: React.FC<{
  breadcrumbs: Array<{ name: string; url: string }>
}> = ({ breadcrumbs }) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData, null, 2)
      }}
    />
  );
};