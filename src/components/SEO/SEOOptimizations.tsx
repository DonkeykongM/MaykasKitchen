import React from 'react';

// Advanced SEO component för food blogs
export const FoodBlogSEO: React.FC<{
  recipeId?: string;
  recipeName?: string;
  cookingTime?: string;
  servings?: string;
}> = ({ recipeId, recipeName, cookingTime, servings }) => {
  
  React.useEffect(() => {
    // Advanced title optimization for food content
    const optimizeTitle = () => {
      if (recipeName && cookingTime && servings) {
        // SEO-optimized title format för recept
        const optimizedTitle = `${recipeName} Recept (${cookingTime} min) | Assyrisk Matlagning | MaykasKitchen`;
        document.title = optimizedTitle;
      }
    };

    // Add hreflang för internationell SEO
    const addHreflang = () => {
      const hreflangTags = [
        { lang: 'sv', href: window.location.href },
        { lang: 'sv-SE', href: window.location.href },
        { lang: 'x-default', href: window.location.href }
      ];

      hreflangTags.forEach(({ lang, href }) => {
        let link = document.querySelector(`link[hreflang="${lang}"]`);
        if (!link) {
          link = document.createElement('link');
          link.setAttribute('rel', 'alternate');
          link.setAttribute('hreflang', lang);
          document.head.appendChild(link);
        }
        link.setAttribute('href', href);
      });
    };

    // Add recipe-specific meta tags
    const addRecipeMetaTags = () => {
      if (!recipeId) return;

      const metaTags = [
        { name: 'recipe:prep_time', content: `${Math.floor(parseInt(cookingTime || '30') * 0.3)} minutes` },
        { name: 'recipe:cook_time', content: `${Math.floor(parseInt(cookingTime || '30') * 0.7)} minutes` },
        { name: 'recipe:total_time', content: `${cookingTime} minutes` },
        { name: 'recipe:servings', content: servings || '4' },
        { name: 'recipe:difficulty', content: 'medium' },
        { name: 'recipe:cuisine', content: 'Assyrian, Syrian, Middle Eastern' },
        { name: 'recipe:category', content: 'Main Course' }
      ];

      metaTags.forEach(({ name, content }) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      });
    };

    optimizeTitle();
    addHreflang();
    addRecipeMetaTags();
  }, [recipeId, recipeName, cookingTime, servings]);

  return null;
};

// Component för breadcrumb SEO
export const BreadcrumbSEO: React.FC<{
  items: Array<{ name: string; href: string; current?: boolean }>;
}> = ({ items }) => {
  
  React.useEffect(() => {
    // Inject breadcrumb structured data
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": {
          "@type": "WebPage",
          "@id": `https://maykaskitchen.se${item.href}`
        }
      }))
    };

    let script = document.querySelector('script[data-type="breadcrumb"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-type', 'breadcrumb');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(breadcrumbData);
  }, [items]);

  return null;
};

// Local Business SEO för matkreatörer
export const LocalBusinessSEO: React.FC = () => {
  
  React.useEffect(() => {
    const localBusinessData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://maykaskitchen.se/#organization",
      "name": "MaykasKitchen",
      "alternateName": "Mayka Gulo Matlagning",
      "description": "Autentisk assyrisk och syriansk matlagning med Mayka Gulo. Matlagningsworkshops, receptutveckling och kulinarisk konsultation.",
      "url": "https://maykaskitchen.se",
      "telephone": "0734339908",
      "email": "info@maykaskitchen.se",
      "founder": {
        "@type": "Person",
        "name": "Mayka Gulo"
      },
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Skåne",
        "addressCountry": "Sweden",
        "postalCode": null,
        "streetAddress": null
      },
      "geo": {
        "@type": "GeoCoordinates", 
        "latitude": "55.60587",
        "longitude": "13.00073"
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "Sweden"
        },
        {
          "@type": "State", 
          "name": "Skåne"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Matlagningsworkshops och Receptkonsultation",
        "itemListElement": [
          {
            "@type": "Service",
            "name": "Matlagningsworkshops",
            "description": "Lär dig autentisk assyrisk och syriansk matlagning"
          },
          {
            "@type": "Service", 
            "name": "Receptutveckling",
            "description": "Anpassade recept för restauranger och företag"
          }
        ]
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      },
      "priceRange": "$$",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "currenciesAccepted": "SEK"
    };

    let script = document.querySelector('script[data-type="local-business"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-type', 'local-business');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(localBusinessData);
  }, []);

  return null;
};

export default FoodBlogSEO;