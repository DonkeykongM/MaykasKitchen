import React from 'react';

// This component is not actually used - recipes are handled by BlogPost.tsx components
// But we need to export something to prevent import errors

interface RecipeDetailsProps {
  recipeId?: string;
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipeId }) => {
  // Redirect to the proper recipe handling system
  React.useEffect(() => {
    if (recipeId) {
      // The actual recipe rendering is handled by BlogPost components in App.tsx
      // This component is just a placeholder to prevent import errors
    }
  }, [recipeId]);

  return (
    <div className="recipe-details">
      <p>Loading recipe...</p>
    </div>
  );
};

export default RecipeDetails;