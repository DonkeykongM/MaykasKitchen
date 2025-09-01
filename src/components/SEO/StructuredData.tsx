import React from 'react';

interface RecipeStructuredDataProps {
  recipe: {
    id: string;
    title: string;
    description: string;
    image: string;
    time: string;
    portions: string;
    rating: number;
    reviews: number;
    ingredients: string[];
    instructions: string[];
    author: string;
    datePublished: string;
    prepTime?: string;
    cookTime?: string;
    totalTime?: string;
    recipeCategory?: string;
    recipeCuisine?: string;
    keywords?: string;
    nutritionInfo?: {
      calories?: string;
      protein?: string;
      carbs?: string;
      fat?: string;
    };
  };
}

export const RecipeStructuredData: React.FC<RecipeStructuredDataProps> = ({ recipe }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "description": recipe.description,
    "image": [recipe.image],
    "author": {
      "@type": "Person",
      "name": recipe.author || "Mayka Gulo",
      "url": "https://maykaskitchen.se"
    },
    "datePublished": recipe.datePublished,
    "prepTime": recipe.prepTime || `PT${Math.round(parseInt(recipe.time) * 0.3)}M`,
    "cookTime": recipe.cookTime || `PT${Math.round(parseInt(recipe.time) * 0.7)}M`,
    "totalTime": `PT${recipe.time}M`,
    "recipeCategory": recipe.recipeCategory || "Huvudrätt",
    "recipeCuisine": recipe.recipeCuisine || "Assyrisk/Syriansk",
    "recipeYield": recipe.portions,
    "keywords": recipe.keywords || "assyrisk mat, syriansk matlagning, mellanöstern recept",
    "recipeIngredient": recipe.ingredients,
    "recipeInstructions": recipe.instructions.map((instruction, index) => ({
      "@type": "HowToStep",
      "name": `Steg ${index + 1}`,
      "text": instruction,
      "position": index + 1
    })),
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
      "fatContent": recipe.nutritionInfo.fat
    } : undefined,
    "video": recipe.id === 'lax-risbowl' ? {
      "@type": "VideoObject",
      "name": recipe.title,
      "description": recipe.description,
      "thumbnailUrl": recipe.image,
      "contentUrl": "https://www.instagram.com/reel/DJXHMYpCoaR/",
      "embedUrl": "https://www.instagram.com/reel/DJXHMYpCoaR/",
      "uploadDate": recipe.datePublished
    } : undefined
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

interface PersonStructuredDataProps {
  person: {
    name: string;
    jobTitle: string;
    url: string;
    image: string;
    sameAs: string[];
    description: string;
    email?: string;
    telephone?: string;
    address?: {
      addressRegion: string;
      addressCountry: string;
    };
  };
}

export const PersonStructuredData: React.FC<PersonStructuredDataProps> = ({ person }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "jobTitle": person.jobTitle,
    "url": person.url,
    "image": {
      "@type": "ImageObject",
      "url": person.image,
      "width": 800,
      "height": 800
    },
    "sameAs": person.sameAs,
    "description": person.description,
    "email": person.email,
    "telephone": person.telephone,
    "address": person.address ? {
      "@type": "PostalAddress",
      "addressRegion": person.address.addressRegion,
      "addressCountry": person.address.addressCountry
    } : undefined,
    "knowsAbout": [
      "Assyrisk matlagning",
      "Syriansk matlagning",
      "Mellanöstern kök",
      "Säsongsbaserad matlagning",
      "Traditionella recept"
    ]
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

interface ArticleStructuredDataProps {
  article: {
    headline: string;
    description: string;
    image: string;
    author: string;
    datePublished: string;
    dateModified: string;
    publisher: string;
    url: string;
  };
}

export const ArticleStructuredData: React.FC<ArticleStructuredDataProps> = ({ article }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "image": [article.image],
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": "https://maykaskitchen.se"
    },
    "publisher": {
      "@type": "Organization",
      "name": article.publisher,
      "logo": {
        "@type": "ImageObject",
        "url": "https://maykaskitchen.se/logo.svg"
      }
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
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