// URL utilities for proper recipe sharing and navigation
export const generateRecipeUrl = (recipeId: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}#recipe/${recipeId}`;
};

export const generateAbsoluteRecipeUrl = (recipeId: string): string => {
  // For social media sharing, we need absolute URLs
  const baseUrl = 'https://maykaskitchen.se';
  return `${baseUrl}#recipe/${recipeId}`;
};

export const getCanonicalUrl = (): string => {
  return window.location.href.split('#')[0];
};

export const updateCanonicalLink = (url: string): void => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
};

export const updatePageMeta = (title: string, description: string, image?: string): void => {
  // Update page title
  document.title = title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  if (metaDescription) {
    metaDescription.content = description;
  }
  
  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
  if (ogTitle) {
    ogTitle.content = title;
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
  if (ogDescription) {
    ogDescription.content = description;
  }
  
  if (image) {
    const ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
    if (ogImage) {
      ogImage.content = image;
    }
  }
  
  // Update canonical URL
  updateCanonicalLink(window.location.href);
};