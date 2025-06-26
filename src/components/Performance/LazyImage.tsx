import React, { useState, useRef, useEffect, useCallback } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
  priority?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder,
  onLoad,
  onError,
  loading = 'lazy',
  sizes,
  srcSet,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority || loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Optimized intersection observer with throttling
  useEffect(() => {
    if (priority || loading === 'eager') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, loading, isInView]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsError(true);
    onError?.();
  }, [onError]);

  const shouldLoadImage = isInView;
  
  // Generate optimized placeholder
  const defaultPlaceholder = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width || 400} ${height || 300}"%3E%3Crect width="100%25" height="100%25" fill="%23f3f4f6"/%3E%3C/svg%3E`;

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: '#f3f4f6' }}
    >
      {/* Optimized placeholder with blur effect */}
      {!isLoaded && !isError && (
        <div 
          className="absolute inset-0 bg-gray-100 flex items-center justify-center transition-opacity duration-300"
          style={{
            backgroundImage: `url("${placeholder || defaultPlaceholder}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
            opacity: shouldLoadImage ? 0.5 : 1
          }}
        >
          {!shouldLoadImage && (
            <div className="text-gray-400 text-xs">Laddar...</div>
          )}
        </div>
      )}

      {/* Optimized main image with hardware acceleration */}
      {shouldLoadImage && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          srcSet={srcSet}
          className={`w-full h-full object-cover transition-opacity duration-500 will-change-opacity ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          decoding="async"
          style={{
            transform: 'translate3d(0,0,0)', // Hardware acceleration
          }}
        />
      )}

      {/* Error state with retry functionality */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <div className="text-center p-4">
            <svg
              className="w-12 h-12 mx-auto mb-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Kunde inte ladda bild</p>
            <button 
              onClick={() => {
                setIsError(false);
                setIsLoaded(false);
              }}
              className="text-xs text-purple-600 hover:text-purple-700 mt-1"
            >
              Försök igen
            </button>
          </div>
        </div>
      )}

      {/* Loading indicator for slow connections */}
      {shouldLoadImage && !isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      )}
    </div>
  );
};

// Optimized image component with WebP support and modern formats
export const OptimizedImage: React.FC<LazyImageProps & {
  webpSrc?: string;
  avifSrc?: string;
}> = ({ webpSrc, avifSrc, src, alt, ...props }) => {
  return (
    <picture>
      {avifSrc && (
        <source srcSet={avifSrc} type="image/avif" />
      )}
      {webpSrc && (
        <source srcSet={webpSrc} type="image/webp" />
      )}
      <LazyImage src={src} alt={alt} {...props} />
    </picture>
  );
};

export default LazyImage;