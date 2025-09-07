// Enhanced sharing utilities for recipe URLs
export const generateRecipeUrl = (recipeId: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}#recipe/${recipeId}`;
};

export const generateAbsoluteRecipeUrl = (recipeId: string): string => {
  // For social media sharing, we need absolute URLs
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}#recipe/${recipeId}`;
};

export const shareRecipe = async (recipe: { id: string; title: string; description: string; image: string }) => {
  const recipeUrl = generateAbsoluteRecipeUrl(recipe.id);
  
  const shareData = {
    title: `${recipe.title} - MaykasKitchen`,
    text: `Check out this recipe: ${recipe.description}`,
    url: recipeUrl,
  };

  // Try native sharing first (mobile devices)
  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'native' };
    } catch (err) {
      console.log('Native sharing cancelled or failed:', err);
    }
  }

  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(recipeUrl);
    return { success: true, method: 'clipboard', url: recipeUrl };
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return { success: false, error: 'Could not share recipe' };
  }
};

export const generateSocialMediaUrls = (recipe: { id: string; title: string; description: string }) => {
  const recipeUrl = encodeURIComponent(generateAbsoluteRecipeUrl(recipe.id));
  const title = encodeURIComponent(recipe.title);
  const description = encodeURIComponent(recipe.description);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${recipeUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${recipeUrl}&text=${title}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${recipeUrl}&description=${title}&media=${encodeURIComponent(recipe.image || '')}`,
    whatsapp: `https://wa.me/?text=${title}%20${recipeUrl}`,
    email: `mailto:?subject=${title}&body=${description}%0A%0A${decodeURIComponent(recipeUrl)}`
  };
};