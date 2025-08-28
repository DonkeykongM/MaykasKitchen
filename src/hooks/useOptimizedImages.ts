import { useState, useEffect, useRef, useCallback } from 'react';

interface OptimizedImageOptions {
  placeholder?: string;
  quality?: number;
  blur?: boolean;
  priority?: boolean;
}

export const useOptimizedImage = (
  src: string, 
  options: OptimizedImageOptions = {}
) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);

  const { placeholder, quality = 80, blur = false, priority = false } = options;

  // Generate optimized image URL
  useEffect(() => {
    if (src.includes('j0bzpddd4j.ufs.sh')) {
      // Add compression parameters to existing URLs
      const url = new URL(src);
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('w', '800'); // Max width
      url.searchParams.set('f', 'webp'); // Prefer WebP
      setOptimizedSrc(url.toString());
    } else {
      setOptimizedSrc(src);
    }
  }, [src, quality]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const img = imgRef.current;
    if (!img || priority) {
      // Load immediately if priority
      loadImage();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    );

    observer.observe(img);

    return () => {
      observer.unobserve(img);
    };
  }, [optimizedSrc, priority]);

  const loadImage = useCallback(() => {
    if (!optimizedSrc) return;

    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      setIsError(false);
    };
    
    img.onerror = () => {
      setIsError(true);
      setIsLoaded(false);
    };
    
    img.src = optimizedSrc;
  }, [optimizedSrc]);

  return {
    imgRef,
    src: optimizedSrc,
    isLoaded,
    isError,
    placeholder: placeholder || `data:image/svg+xml;base64,${btoa(`
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy="0.35em" fill="#9ca3af" font-family="sans-serif" font-size="14">Laddar...</text>
      </svg>
    `)}`
  };
};

// Hook for preloading critical images
export const useImagePreloader = (images: string[]) => {
  useEffect(() => {
    // Preload critical images
    const preloadImages = images.slice(0, 3); // Only preload first 3 for performance
    
    preloadImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup preload links
      preloadImages.forEach((src) => {
        const link = document.querySelector(`link[href="${src}"]`);
        if (link) document.head.removeChild(link);
      });
    };
  }, [images]);
};
</parameter>