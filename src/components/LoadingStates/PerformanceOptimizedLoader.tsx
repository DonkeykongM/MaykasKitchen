import React from 'react';

// Critical CSS inlined for immediate loading
const criticalStyles = `
  .performance-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #800080 0%, #4B0082 50%, #2E0054 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.5s ease-out;
  }
  
  .performance-loader.fade-out {
    opacity: 0;
    pointer-events: none;
  }
  
  .loader-content {
    text-align: center;
    color: white;
  }
  
  .loader-logo {
    width: 60px;
    height: 60px;
    margin: 0 auto 1rem;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
  }
  
  .loader-text {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-family: 'Poppins', sans-serif;
  }
  
  .loader-subtext {
    font-size: 0.9rem;
    opacity: 0.8;
    font-family: 'Poppins', sans-serif;
  }
`;

interface PerformanceOptimizedLoaderProps {
  isLoading: boolean;
  onLoadComplete?: () => void;
}

export const PerformanceOptimizedLoader: React.FC<PerformanceOptimizedLoaderProps> = ({
  isLoading,
  onLoadComplete
}) => {
  React.useEffect(() => {
    // Inject critical styles immediately
    const styleSheet = document.createElement('style');
    styleSheet.textContent = criticalStyles;
    document.head.insertBefore(styleSheet, document.head.firstChild);
    
    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        onLoadComplete?.();
      }, 500); // Allow fade transition to complete
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, onLoadComplete]);

  return (
    <div className={`performance-loader ${!isLoading ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          🍽️
        </div>
        <div className="loader-text">MaykasKitchen</div>
        <div className="loader-subtext">Laddar recept...</div>
      </div>
    </div>
  );
};

// Skeleton loader for recipe cards with improved performance
export const FastRecipeCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
    <div className="h-48 bg-gray-200 relative">
      <div className="absolute top-4 left-4 bg-gray-300 rounded-full w-16 h-6"></div>
    </div>
    <div className="p-6">
      <div className="flex gap-2 mb-3">
        <div className="bg-gray-200 rounded-full h-6 w-16"></div>
        <div className="bg-gray-200 rounded-full h-6 w-20"></div>
      </div>
      <div className="bg-gray-300 h-6 w-4/5 mb-2 rounded"></div>
      <div className="bg-gray-200 h-4 w-full mb-1 rounded"></div>
      <div className="bg-gray-200 h-4 w-3/4 mb-4 rounded"></div>
      <div className="flex justify-between items-center">
        <div className="bg-gray-200 h-4 w-20 rounded"></div>
        <div className="bg-gray-200 h-4 w-16 rounded"></div>
      </div>
    </div>
  </div>
);