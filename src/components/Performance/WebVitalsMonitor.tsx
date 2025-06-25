import { useEffect } from 'react';

interface WebVitalsData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
}

export const useWebVitals = (onReport?: (metric: WebVitalsData) => void) => {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // LCP (Largest Contentful Paint)
    const observeLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          
          if (lastEntry) {
            const value = lastEntry.startTime;
            const rating = value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
            
            onReport?.({
              name: 'LCP',
              value,
              rating,
              delta: value,
              entries: [lastEntry]
            });
          }
        });
        
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      }
    };

    // FID (First Input Delay)
    const observeFID = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          
          entries.forEach((entry: any) => {
            const value = entry.processingStart - entry.startTime;
            const rating = value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
            
            onReport?.({
              name: 'FID',
              value,
              rating,
              delta: value,
              entries: [entry]
            });
          });
        });
        
        observer.observe({ type: 'first-input', buffered: true });
      }
    };

    // CLS (Cumulative Layout Shift)
    const observeCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const entries: PerformanceEntry[] = [];
        
        const observer = new PerformanceObserver((list) => {
          const newEntries = list.getEntries();
          
          newEntries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              entries.push(entry);
            }
          });
          
          const rating = clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor';
          
          onReport?.({
            name: 'CLS',
            value: clsValue,
            rating,
            delta: clsValue,
            entries: [...entries]
          });
        });
        
        observer.observe({ type: 'layout-shift', buffered: true });
      }
    };

    // FCP (First Contentful Paint)
    const observeFCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint') as any;
          
          if (fcpEntry) {
            const value = fcpEntry.startTime;
            const rating = value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
            
            onReport?.({
              name: 'FCP',
              value,
              rating,
              delta: value,
              entries: [fcpEntry]
            });
          }
        });
        
        observer.observe({ type: 'paint', buffered: true });
      }
    };

    // TTFB (Time to First Byte)
    const observeTTFB = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const navigationEntry = entries.find(entry => entry.entryType === 'navigation') as any;
          
          if (navigationEntry) {
            const value = navigationEntry.responseStart - navigationEntry.requestStart;
            const rating = value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
            
            onReport?.({
              name: 'TTFB',
              value,
              rating,
              delta: value,
              entries: [navigationEntry]
            });
          }
        });
        
        observer.observe({ type: 'navigation', buffered: true });
      }
    };

    // Start observing
    observeLCP();
    observeFID();
    observeCLS();
    observeFCP();
    observeTTFB();

    // Report basic performance metrics
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
      const firstPaint = timing.responseStart - timing.navigationStart;

      console.log('Performance Metrics:', {
        loadTime,
        domReadyTime,
        firstPaint
      });
    }

  }, [onReport]);
};

// Component that monitors web vitals
export const WebVitalsMonitor: React.FC<{
  onReport?: (metric: WebVitalsData) => void;
}> = ({ onReport }) => {
  useWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        threshold: getThreshold(metric.name, metric.rating)
      });
    }

    // Send to analytics or reporting service
    onReport?.(metric);
  });

  return null;
};

function getThreshold(metricName: string, rating: string): string {
  const thresholds: Record<string, Record<string, string>> = {
    'LCP': {
      'good': '≤ 2.5s',
      'needs-improvement': '≤ 4.0s',
      'poor': '> 4.0s'
    },
    'FID': {
      'good': '≤ 100ms',
      'needs-improvement': '≤ 300ms',
      'poor': '> 300ms'
    },
    'CLS': {
      'good': '≤ 0.1',
      'needs-improvement': '≤ 0.25',
      'poor': '> 0.25'
    },
    'FCP': {
      'good': '≤ 1.8s',
      'needs-improvement': '≤ 3.0s',
      'poor': '> 3.0s'
    },
    'TTFB': {
      'good': '≤ 800ms',
      'needs-improvement': '≤ 1800ms',
      'poor': '> 1800ms'
    }
  };

  return thresholds[metricName]?.[rating] || 'Unknown';
}