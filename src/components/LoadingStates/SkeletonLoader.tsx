import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'image' | 'button' | 'recipe';
  className?: string;
  lines?: number;
  width?: string;
  height?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'card',
  className = '',
  lines = 3,
  width = '100%',
  height = 'auto'
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200';
  
  switch (variant) {
    case 'recipe':
      return (
        <div className={`bg-white rounded-xl overflow-hidden shadow-md ${className}`}>
          {/* Image skeleton */}
          <div className={`h-48 ${baseClasses}`}>
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-loading-shimmer"></div>
          </div>
          
          {/* Content skeleton */}
          <div className="p-6">
            {/* Tags */}
            <div className="flex gap-2 mb-3">
              <div className={`h-6 w-16 rounded-full ${baseClasses}`}></div>
              <div className={`h-6 w-20 rounded-full ${baseClasses}`}></div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`h-4 w-4 rounded ${baseClasses}`}></div>
                ))}
              </div>
              <div className={`h-4 w-12 rounded ${baseClasses}`}></div>
            </div>
            
            {/* Title */}
            <div className={`h-6 w-4/5 rounded mb-2 ${baseClasses}`}></div>
            
            {/* Description */}
            <div className={`h-4 w-full rounded mb-1 ${baseClasses}`}></div>
            <div className={`h-4 w-3/4 rounded mb-4 ${baseClasses}`}></div>
            
            {/* Footer */}
            <div className="flex justify-between items-center">
              <div className={`h-4 w-20 rounded ${baseClasses}`}></div>
              <div className={`h-4 w-16 rounded ${baseClasses}`}></div>
            </div>
          </div>
        </div>
      );
      
    case 'card':
      return (
        <div className={`${baseClasses} rounded-lg ${className}`} style={{ width, height: height || '200px' }}>
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-loading-shimmer"></div>
        </div>
      );
      
    case 'text':
      return (
        <div className={className}>
          {[...Array(lines)].map((_, i) => (
            <div 
              key={i} 
              className={`${baseClasses} h-4 mb-2 rounded`}
              style={{ 
                width: i === lines - 1 ? '75%' : '100%'
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-loading-shimmer"></div>
            </div>
          ))}
        </div>
      );
      
    case 'image':
      return (
        <div className={`${baseClasses} rounded ${className}`} style={{ width, height: height || '100px' }}>
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-loading-shimmer"></div>
        </div>
      );
      
    case 'button':
      return (
        <div className={`${baseClasses} h-10 w-32 rounded-full ${className}`}>
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-loading-shimmer"></div>
        </div>
      );
      
    default:
      return (
        <div className={`${baseClasses} ${className}`} style={{ width, height }}>
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-loading-shimmer"></div>
        </div>
      );
  }
};

// Loading states for different sections
export const RecipeGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(count)].map((_, i) => (
      <SkeletonLoader key={i} variant="recipe" />
    ))}
  </div>
);

export const HeroSkeleton: React.FC = () => (
  <div className="py-20 bg-gray-100">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
          <SkeletonLoader variant="text" lines={1} height="3rem" className="mb-4" />
          <SkeletonLoader variant="text" lines={3} className="mb-6" />
          <SkeletonLoader variant="button" />
        </div>
        <div className="w-full lg:w-1/2">
          <SkeletonLoader variant="image" height="24rem" className="rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonLoader;