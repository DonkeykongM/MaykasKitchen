import React from 'react';
import { useOptimizedImage } from '@/hooks/useOptimizedImages';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  fallbackEmoji?: string;
  fallbackText?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 80,
  fallbackEmoji = '🍽️',
  fallbackText,
  sizes = '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw',
  loading = 'lazy'
}) => {
  const { imgRef, src: optimizedSrc, isLoaded, isError, placeholder } = useOptimizedImage(src, {
    quality,
    priority
  });

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Optimized image */}
      {!isError && (
        <img
          src={isLoaded ? optimizedSrc : placeholder}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          decoding="async"
          sizes={sizes}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } w-full h-full object-cover`}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined,
          }}
        />
      )}
      
      {/* Error fallback */}
      {isError && (
        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col items-center justify-center text-purple-600">
          <div className="text-4xl mb-2">{fallbackEmoji}</div>
          <div className="text-sm text-center px-4 font-medium">
            {fallbackText || alt}
          </div>
        </div>
      )}
      
      {/* Loading state */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <div className="text-2xl mb-1">📸</div>
            <div className="text-xs">Laddar...</div>
          </div>
        </div>
      )}
    </div>
  );
};

// High-performance image component for hero sections
export const HeroOptimizedImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage 
    {...props} 
    priority={true} 
    quality={90}
    loading="eager"
  />
);

// Ultra-fast image component for cards (lower quality, faster load)
export const CardOptimizedImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage 
    {...props} 
    quality={70}
    loading="lazy"
  />
);
</parameter>