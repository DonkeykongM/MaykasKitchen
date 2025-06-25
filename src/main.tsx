import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
import { checkSupabaseConnection } from './lib/supabase.ts';
import { WebVitalsMonitor } from './components/Performance/WebVitalsMonitor';

// Check Supabase connection when the app starts
checkSupabaseConnection()
  .then(isConnected => {
    console.log(`Supabase connection ${isConnected ? 'successful' : 'failed'}`);
  })
  .catch(error => {
    console.error('Error checking Supabase connection:', error);
  });

// Enhanced error boundary
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('Application error:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
    
    // Show error fallback
    const errorFallback = document.getElementById('error-fallback');
    const root = document.getElementById('root');
    
    if (errorFallback && root) {
      errorFallback.classList.remove('hidden');
      root.style.display = 'none';
    }
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

// Initialize app
const initializeApp = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Root element not found');
    return;
  }

  // Hide loading indicator
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
  }

  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <WebVitalsMonitor 
            onReport={(metric) => {
              // Send metrics to analytics service
              if (typeof gtag !== 'undefined') {
                gtag('event', 'web_vitals', {
                  event_category: 'Performance',
                  event_label: metric.name,
                  value: Math.round(metric.value),
                  custom_map: {
                    metric_rating: metric.rating
                  }
                });
              }
            }}
          />
          <App />
        </HelmetProvider>
      </ErrorBoundary>
    </StrictMode>
  );
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Register service worker for PWA capabilities
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Enhanced performance monitoring
if ('performance' in window) {
  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    const longTaskObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry.duration + 'ms');
        }
      });
    });
    
    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long task observer not supported
    }
  }

  // Monitor resource loading
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType('resource');
    
    console.log('Navigation timing:', {
      'DNS lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
      'TCP connection': navigation.connectEnd - navigation.connectStart,
      'Request': navigation.responseStart - navigation.requestStart,
      'Response': navigation.responseEnd - navigation.responseStart,
      'DOM processing': navigation.domContentLoadedEventEnd - navigation.responseEnd,
      'Load event': navigation.loadEventEnd - navigation.domContentLoadedEventEnd,
      'Total load time': navigation.loadEventEnd - navigation.navigationStart
    });

    // Check for large resources
    resources.forEach(resource => {
      if (resource.transferSize > 500000) { // > 500KB
        console.warn('Large resource detected:', resource.name, resource.transferSize + ' bytes');
      }
    });
  });
}

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  
  // Report to error tracking service
  if (typeof gtag !== 'undefined') {
    gtag('event', 'exception', {
      description: event.error?.message || 'Unknown error',
      fatal: false
    });
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  // Report to error tracking service
  if (typeof gtag !== 'undefined') {
    gtag('event', 'exception', {
      description: event.reason?.message || 'Unhandled promise rejection',
      fatal: false
    });
  }
});