import { useEffect, useRef } from 'react';

// Core Web Vitals monitoring
export const usePerformanceMonitoring = () => {
  const performanceRef = useRef({
    navigationStart: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0
  });

  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              performanceRef.current.firstContentfulPaint = entry.startTime;
            }
            break;
          
          case 'largest-contentful-paint':
            performanceRef.current.largestContentfulPaint = entry.startTime;
            break;
          
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              performanceRef.current.cumulativeLayoutShift += (entry as any).value;
            }
            break;
          
          case 'first-input':
            performanceRef.current.firstInputDelay = (entry as any).processingStart - entry.startTime;
            break;
        }
      }
    });

    // Start observing
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input'] });
    } catch (e) {
      console.warn('Performance Observer not supported');
    }

    // Monitor resource loading
    const logPerformanceMetrics = () => {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const navigationStart = timing.navigationStart;
        
        console.log('Performance Metrics:', {
          pageLoadTime: timing.loadEventEnd - navigationStart,
          domContentLoaded: timing.domContentLoadedEventEnd - navigationStart,
          firstContentfulPaint: performanceRef.current.firstContentfulPaint,
          largestContentfulPaint: performanceRef.current.largestContentfulPaint,
          cumulativeLayoutShift: performanceRef.current.cumulativeLayoutShift
        });
      }
    };

    window.addEventListener('load', logPerformanceMetrics, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('load', logPerformanceMetrics);
    };
  }, []);

  return performanceRef.current;
};

// Hook for monitoring bundle size and optimization opportunities
export const useBundleOptimization = () => {
  useEffect(() => {
    // Check for large imports that could be code-split
    const analyzeBundle = () => {
      if (process.env.NODE_ENV === 'development') {
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        scripts.forEach(script => {
          const src = script.getAttribute('src');
          if (src && src.includes('chunk')) {
            console.log(`Bundle chunk: ${src}`);
          }
        });
      }
    };

    window.addEventListener('load', analyzeBundle, { passive: true });
    return () => window.removeEventListener('load', analyzeBundle);
  }, []);
};