import React from 'react';
import { RecipeDetails } from './RecipeDetails';
import { recipes } from '../data/recipes';

// Clean component exports using shared recipe data
export const LaxRisbowlPost = () => {
  const handleBack = () => {
    // Smart back navigation
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback to home if no history
      window.location.hash = '';
    }
  };

  return <RecipeDetails recipe={recipes['lax-risbowl']} onBack={handleBack} />;
};

export const KaftaBilSejniePost = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };

  return <RecipeDetails recipe={recipes['kafta-bil-sejnie']} onBack={handleBack} />;
};

export const KoftaBilSaniehPost = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };

  return <RecipeDetails recipe={recipes['kofta-bil-sanieh']} onBack={handleBack} />;
};

export const PastaPestoPost = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };

  return <RecipeDetails recipe={recipes['pasta-pesto']} onBack={handleBack} />;
};

export const KycklingShawarmaPost = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };

  return <RecipeDetails recipe={recipes['kyckling-shawarma']} onBack={handleBack} />;
};

export const PannpizzorPost = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };

  return <RecipeDetails recipe={recipes['pannpizzor']} onBack={handleBack} />;
};

export const BatataHarraPost = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };

  return <RecipeDetails recipe={recipes['batata-harra']} onBack={handleBack} />;
};

export const KycklingfilePotatisDragonPost = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };

  return <RecipeDetails recipe={recipes['kycklingfile-potatis-dragon']} onBack={handleBack} />;
};

export const LinsBulgurJarparPost = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };
  
  return <RecipeDetails recipe={recipes['lins-bulgur-jarpar']} onBack={handleBack} />;
};

export const MiniLahmacunPost = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };

  return <RecipeDetails recipe={recipes['mini-lahmacun']} onBack={handleBack} />;
};

export const KallFoulMedamesPost = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };

  return <RecipeDetails recipe={recipes['kall-foul-medames']} onBack={handleBack} />;
};

export const KikartsTikkaMasalaPost = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };

  return <RecipeDetails recipe={recipes['kikarts-tikka-masala']} onBack={handleBack} />;
};

export const QrimyotheMunkarPost = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };

  return <RecipeDetails recipe={recipes['qrimyothe-munkar']} onBack={handleBack} />;
};