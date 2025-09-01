import { useEffect, useCallback, useRef } from 'react';

interface UseOptimizedScrollOptions {
  throttleMs?: number;
  threshold?: number;
  rootMargin?: string;
}

export const useOptimizedScroll = (
  callback: (scrollY: number) => void,
  options: UseOptimizedScrollOptions = {}
) => {
  const { throttleMs = 16 } = options; // 60fps throttling
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  const optimizedCallback = useCallback(() => {
    const scrollY = window.scrollY;
    
    // Only call callback if scroll position changed significantly
    if (Math.abs(scrollY - lastScrollY.current) > 1) {
      callback(scrollY);
      lastScrollY.current = scrollY;
    }
    
    ticking.current = false;
  }, [callback]);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(optimizedCallback);
      ticking.current = true;
    }
  }, [optimizedCallback]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
};

export const useIntersectionObserver = (
  callback: (isIntersecting: boolean) => void,
  options: UseOptimizedScrollOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          callback(entry.isIntersecting);
        });
      },
      { threshold, rootMargin }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [callback, threshold, rootMargin]);

  return elementRef;
};

// Debounced resize hook for responsive optimizations
export const useOptimizedResize = (
  callback: (width: number, height: number) => void,
  debounceMs: number = 150
) => {
  const timeoutRef = useRef<number>();

  useEffect(() => {
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = window.setTimeout(() => {
        callback(window.innerWidth, window.innerHeight);
      }, debounceMs);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    // Initial call
    callback(window.innerWidth, window.innerHeight);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, debounceMs]);
};