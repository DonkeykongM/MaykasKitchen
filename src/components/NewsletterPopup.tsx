import React, { useState, useEffect, useRef } from 'react';
import { X, Mail } from 'lucide-react';

export const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<null | 'submitting' | 'success' | 'error'>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const popupTimerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if user has subscribed successfully - if so, don't show popup anymore
    const hasSubscribed = localStorage.getItem('newsletterSubscribed') === 'true';
    
    if (!hasSubscribed) {
      // Show popup every 15 seconds
      const showPopup = () => {
        setIsVisible(true);
      };

      // First popup after 15 seconds
      popupTimerRef.current = window.setTimeout(() => {
        showPopup();
      }, 15000); // 15 seconds

      // Then every 15 seconds after that
      intervalRef.current = window.setInterval(() => {
        // Only show if user hasn't subscribed
        const currentlySubscribed = localStorage.getItem('newsletterSubscribed') === 'true';
        if (!currentlySubscribed) {
          showPopup();
        }
      }, 15000); // 15 seconds interval
    }

    return () => {
      // Clear timeout and interval when component unmounts
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Don't set any localStorage for dismissal - let it show again in 15 seconds
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      setSubmitStatus('error');
      setErrorMessage('Vänligen ange en giltig e-postadress.');
      return;
    }
    
    setSubmitStatus('submitting');
    
    try {
      // Send directly to Make webhook
      const response = await fetch('https://hook.eu2.make.com/sfjfkezizhjh4x7r1rrjmjwyei2sufj2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email,
          source: 'popup' 
        })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSubmitStatus('success');
      setEmail('');
      
      // Mark as subscribed so popup stops showing
      localStorage.setItem('newsletterSubscribed', 'true');
      
      // Clear the interval since user has subscribed
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Hide popup after success
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Något gick fel. Försök igen senare.');
      console.error("Error sending to webhook:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-xl p-8 max-w-md w-full relative shadow-xl transform animate-scaleIn">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Stäng popup"
        >
          <X size={24} />
        </button>

        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Tack för din prenumeration!</h3>
            <p className="text-gray-600">Du kommer nu få våra senaste recept direkt i din inkorg.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="bg-primary-color/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="text-primary-color" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary-color mb-2">
                🌟 Få nya recept varje vecka!
              </h3>
              <p className="text-gray-600">
                Prenumerera på vårt nyhetsbrev och få de senaste recepten, säsongstips och exklusiva erbjudanden direkt i din inkorg.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Din e-postadress"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-color"
                  aria-label="Din e-postadress"
                />
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="w-full bg-primary-color text-white py-3 rounded-lg hover:bg-accent-color transition-colors disabled:opacity-70 font-semibold"
                aria-label="Prenumerera på nyhetsbrev"
              >
                {submitStatus === 'submitting' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Skickar...
                  </span>
                ) : (
                  '✨ Prenumerera nu - det är gratis!'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Du kan avsluta prenumerationen när som helst. Vi respekterar din integritet. 🔒
              </p>
            </form>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-primary-color rounded-full mr-2"></span>
                Nya recept varje vecka
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-primary-color rounded-full mr-2"></span>
                Säsongsbaserade tips
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-primary-color rounded-full mr-2"></span>
                Exklusiva recept
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-primary-color rounded-full mr-2"></span>
                Matlagningstekniker
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};