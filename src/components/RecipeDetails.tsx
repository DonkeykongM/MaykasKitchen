import React from 'react';

interface RecipeDetailsProps {
  recipeId?: string;
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipeId }) => {
  return (
    <div className="recipe-details">
      <h2>Recipe Details</h2>
      {recipeId && <p>Recipe ID: {recipeId}</p>}
    </div>
  );
};

export default RecipeDetails;