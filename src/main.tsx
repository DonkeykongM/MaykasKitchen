import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { checkSupabaseConnection } from './lib/supabase.ts';

// Lazy load main App component for better initial load performance
const App = lazy(() => import('./App'));

// Loading indicator
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-light-bg">
    <div className="text-center">
      <div className="inline-block animate-spin h-8 w-8 border-4 border-primary-color border-t-transparent rounded-full"></div>
      <p className="mt-4 text-brown-500 text-lg">Laddar MaykasKitchen...</p>
    </div>
  </div>
);

// Check Supabase connection when the app starts
checkSupabaseConnection()
  .then(isConnected => {
    console.log(`Supabase connection ${isConnected ? 'successful' : 'failed'}`);
  })
  .catch(error => {
    console.error('Error checking Supabase connection:', error);
  });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </StrictMode>
);