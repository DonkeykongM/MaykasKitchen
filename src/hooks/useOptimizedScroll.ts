import { useEffect, useCallback, useRef, useState } from 'react';

export const useOptimizedScroll = (callback?: (scrollY: number) => void, delay: number = 16) => {
  const [scrollY, setScrollY] = useState(0);
  const lastCallTime = useRef<number>(0);
  const rafId = useRef<number>();

  const optimizedCallback = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);
    if (callback) {
      callback(currentScrollY);
    }
  }, [callback]);

  const handleScroll = useCallback(() => {
    const now = Date.now();
    
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    if (now - lastCallTime.current >= delay) {
      lastCallTime.current = now;
      rafId.current = requestAnimationFrame(optimizedCallback);
    } else {
      rafId.current = requestAnimationFrame(() => {
        lastCallTime.current = Date.now();
        optimizedCallback();
      });
    }
  }, [optimizedCallback, delay]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  return { scrollY };
};