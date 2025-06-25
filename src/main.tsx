import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { checkSupabaseConnection } from './lib/supabase.ts';

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
    <App />
  </StrictMode>
);