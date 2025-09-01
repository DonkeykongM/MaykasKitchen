import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title = "MaykasKitchen - Autentisk Assyrisk & Syriansk Matlagning | Mayka Gulo",
  description = "Upptäck autentiska assyriska och syrianska recept med Mayka Gulo. 125k+ följare. Traditionella rätter för moderna kök. Säsongsbaserad matlagning med hjärta och själ.",
  keywords = "assyrisk mat, syriansk matlagning, mellanöstern recept, mayka gulo, maykaskitchen, traditionella recept",
  image = "https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCvA6O3yhwpAvKSmuXsEtqUGlWP80xMr5Ihgb4",
  url = "https://maykaskitchen.se",
  type = "website",
  author = "Mayka Gulo",
  publishedTime,
  modifiedTime,
  section,
  tags,
  noindex = false,
  canonical
}) => {
  // Ensure description is within optimal length (150-160 characters)
  const optimizedDescription = description.length > 160 
    ? description.substring(0, 157) + "..." 
    : description;

  // Ensure title is within optimal length (50-60 characters)
  const optimizedTitle = title.length > 60 
    ? title.substring(0, 57) + "..." 
    : title;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Robots meta */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - MaykasKitchen`} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="MaykasKitchen" />
      <meta property="og:locale" content="sv_SE" />
      
      {/* Article specific Open Graph tags */}
      {type === "article" && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@maykaskitchen" />
      <meta name="twitter:creator" content="@maykaskitchen" />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${title} - MaykasKitchen`} />
      
      {/* Additional SEO tags */}
      <meta name="theme-color" content="#8A2BE2" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Hreflang for international SEO */}
      <link rel="alternate" hreflang="sv" href={url} />
      <link rel="alternate" hreflang="sv-SE" href={url} />
      <link rel="alternate" hreflang="x-default" href={url} />
    </Helmet>
  );
};

// Specific meta tag components for different page types
export const RecipeMetaTags: React.FC<{
  recipe: {
    title: string;
    description: string;
    image: string;
    time: string;
    portions: string;
    rating: number;
    reviews: number;
  };
  url: string;
}> = ({ recipe, url }) => {
  const title = `${recipe.title} - MaykasKitchen`;
  const description = `${recipe.description} ⏱️ ${recipe.time} min | 👥 ${recipe.portions} portioner | ⭐ ${recipe.rating}/5 (${recipe.reviews} recensioner)`.substring(0, 160);
  const keywords = `${recipe.title}, recept, assyrisk mat, syriansk matlagning, mayka gulo, maykaskitchen, ${recipe.time} minuter, ${recipe.portions} portioner`;

  return (
    <MetaTags
      title={title}
      description={description}
      keywords={keywords}
      image={recipe.image}
      url={url}
      type="article"
      section="Recept"
      tags={["recept", "matlagning", "assyrisk mat", "syriansk mat"]}
      publishedTime={new Date().toISOString()}
      modifiedTime={new Date().toISOString()}
    />
  );
};

export const PersonMetaTags: React.FC<{
  person: {
    name: string;
    jobTitle: string;
    description: string;
    image: string;
  };
  url: string;
}> = ({ person, url }) => {
  const title = `Om ${person.name} - ${person.jobTitle} | MaykasKitchen`;
  const description = `Lär känna ${person.name}, ${person.jobTitle.toLowerCase()} och skaparen bakom MaykasKitchen. ${person.description}`.substring(0, 160);
  const keywords = `${person.name}, mayka gulo, om mig, ${person.jobTitle.toLowerCase()}, assyrisk kock, syriansk matlagning, matkreatör`;

  return (
    <MetaTags
      title={title}
      description={description}
      keywords={keywords}
      image={person.image}
      url={url}
      type="profile"
    />
  );
};