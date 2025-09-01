import React from 'react';

interface EnhancedMetaTagsProps {
  page: 'home' | 'recipe' | 'about' | 'contact' | 'recipes';
  recipe?: {
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
    badges: string[];
  };
}

export const EnhancedMetaTags: React.FC<EnhancedMetaTagsProps> = ({ page, recipe }) => {
  const getPageMeta = () => {
    switch (page) {
      case 'home':
        return {
          title: "Assyrisk & Syriansk Matlagning | Autentiska Recept | MaykasKitchen",
          description: "Upptäck 50+ autentiska assyriska & syrianska recept med Mayka Gulo. Från kafta bil sejnie till lax-risbowl. ⭐ 4.8/5 betyg • 125k följare • Gratis recept med steg-för-steg instruktioner.",
          keywords: "assyrisk mat, syriansk matlagning, mellanöstern recept, mayka gulo, kafta bil sejnie, traditionella recept, matblogg, köttbullar tomatsås, autentisk matlagning",
          canonical: "https://maykaskitchen.se",
          breadcrumb: []
        };
      
      case 'recipe':
        if (!recipe) {
          // Return recipes page meta instead of recursion
          return {
            title: "Alla Recept - Assyrisk & Syriansk Matlagning | MaykasKitchen",
            description: "Bläddra bland 50+ autentiska assyriska & syrianska recept. Filtrera på kött, vegetariskt, snabbt. Från traditionell kafta bil sejnie till moderna bowls.",
            keywords: "alla recept, assyriska recept, syrianska recept, receptsamling, mellanöstern mat, vegetariska recept, köttrecept",
            canonical: "https://maykaskitchen.se#recept",
            breadcrumb: [
              { name: "Hem", url: "https://maykaskitchen.se" },
              { name: "Alla Recept", url: "https://maykaskitchen.se#recept" }
            ]
          };
        }
        
        return {
          title: `${recipe.title} - Recept | MaykasKitchen`,
          description: `${recipe.description} ⏱️ ${recipe.time} min | 👥 ${recipe.portions} portioner | ⭐ ${recipe.rating}/5 från ${recipe.reviews} recensioner. Steg-för-steg guide.`,
          keywords: `${recipe.title}, ${recipe.badges.join(', ')}, assyrisk mat, syriansk matlagning, mayka gulo, ${recipe.time} minuter recept`,
          canonical: `https://maykaskitchen.se#recipe/${recipe.id}`,
          breadcrumb: [
            { name: "Hem", url: "https://maykaskitchen.se" },
            { name: "Recept", url: "https://maykaskitchen.se#recept" },
            { name: recipe.title, url: `https://maykaskitchen.se#recipe/${recipe.id}` }
          ]
        };
      
      case 'about':
        return {
          title: "Om Mayka Gulo - Kock & Matkreatör | Assyrisk/Syriansk Matlagning",
          description: "Lär känna Mayka Gulo, kock och matinfluencer med 125k+ följare. Specialiserad på autentisk assyrisk/syriansk matlagning med moderna tolkningar. 📍 Skåne, Sverige.",
          keywords: "mayka gulo, om mayka, assyrisk kock, syriansk matkreatör, matinfluencer, 125k följare, skåne kock",
          canonical: "https://maykaskitchen.se#om-mig",
          breadcrumb: [
            { name: "Hem", url: "https://maykaskitchen.se" },
            { name: "Om mig", url: "https://maykaskitchen.se#om-mig" }
          ]
        };
      
      case 'recipes':
        return {
          title: "Alla Recept - Assyrisk & Syriansk Matlagning | MaykasKitchen",
          description: "Bläddra bland 50+ autentiska assyriska & syrianska recept. Filtrera på kött, vegetariskt, snabbt. Från traditionell kafta bil sejnie till moderna bowls.",
          keywords: "alla recept, assyriska recept, syrianska recept, receptsamling, mellanöstern mat, vegetariska recept, köttrecept",
          canonical: "https://maykaskitchen.se#recept",
          breadcrumb: [
            { name: "Hem", url: "https://maykaskitchen.se" },
            { name: "Alla Recept", url: "https://maykaskitchen.se#recept" }
          ]
        };
      
      case 'contact':
        return {
          title: "Kontakta Mayka Gulo - Samarbeten & Matlagningsworkshops | MaykasKitchen", 
          description: "Kontakta Mayka Gulo för samarbeten, matlagningsworkshops eller frågor. 📧 info@maykaskitchen.se | 📱 125k+ följare | 📍 Skåne, Sverige.",
          keywords: "kontakta mayka gulo, samarbeten, matlagningsworkshops, matkreatör kontakt, influencer samarbete",
          canonical: "https://maykaskitchen.se#kontakt",
          breadcrumb: [
            { name: "Hem", url: "https://maykaskitchen.se" },
            { name: "Kontakt", url: "https://maykaskitchen.se#kontakt" }
          ]
        };
      
      default:
        return {
          title: "Assyrisk & Syriansk Matlagning | Autentiska Recept | MaykasKitchen",
          description: "Upptäck 50+ autentiska assyriska & syrianska recept med Mayka Gulo. Från kafta bil sejnie till lax-risbowl. ⭐ 4.8/5 betyg • 125k följare • Gratis recept med steg-för-steg instruktioner.",
          keywords: "assyrisk mat, syriansk matlagning, mellanöstern recept, mayka gulo, kafta bil sejnie, traditionella recept, matblogg, köttbullar tomatsås, autentisk matlagning",
          canonical: "https://maykaskitchen.se",
          breadcrumb: []
        };
    }
  };

  const meta = getPageMeta();

  // Dynamic meta tag injection
  React.useEffect(() => {
    // Update title
    document.title = meta.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', meta.description);
    }
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', meta.keywords);
    
    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', meta.canonical);
    
    // Update Open Graph
    const updateOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    
    updateOGTag('og:title', meta.title);
    updateOGTag('og:description', meta.description);
    updateOGTag('og:url', meta.canonical);
    
    // Recipe specific Open Graph
    if (recipe) {
      updateOGTag('og:type', 'article');
      updateOGTag('og:image', recipe.image);
      updateOGTag('article:author', 'Mayka Gulo');
      updateOGTag('article:section', 'Recept');
      updateOGTag('article:tag', recipe.badges.join(', '));
    }

  }, [meta, recipe]);

  return null; // This component only manages meta tags
};

export default EnhancedMetaTags;