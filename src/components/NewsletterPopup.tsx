import React, { useState, useEffect, useRef } from 'react';
import { X, Mail } from 'lucide-react';
import { useTranslation } from '../lib/i18n';

export const NewsletterPopup = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<null | 'submitting' | 'success' | 'error'>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const popupTimerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if user has subscribed successfully - if so, don't show popup anymore
    const hasSubscribed = sessionStorage.getItem('newsletterSubscribed') === 'true';
    
    if (!hasSubscribed) {
      // Show popup every 90 seconds (optimized interval)
      const showPopup = () => {
        setIsVisible(true);
      };

      // First popup after 90 seconds
      popupTimerRef.current = window.setTimeout(() => {
        showPopup();
      }, 90000); // 90 seconds

      // Then every 90 seconds after that
      intervalRef.current = window.setInterval(() => {
        // Only show if user hasn't subscribed
        const currentlySubscribed = sessionStorage.getItem('newsletterSubscribed') === 'true';
        if (!currentlySubscribed) {
          showPopup();
        }
      }, 90000); // 90 seconds interval
    }

    return () => {
      // Clean up timers when component unmounts
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
    // Store dismissal in session storage to respect user's choice during session
    sessionStorage.setItem('popupDismissed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      setSubmitStatus('error');
      setErrorMessage(t.newsletter.validEmail);
      return;
    }
    
    setSubmitStatus('submitting');
    
    try {
      // Optimized fetch with better error handling
      const response = await fetch('https://hook.eu2.make.com/sfjfkezizhjh4x7r1rrjmjwyei2sufj2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'newsletter',
          type: 'newsletter',
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
      sessionStorage.setItem('newsletterSubscribed', 'true');
      
      // Clear the interval since user has subscribed
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Hide popup after success with smooth transition
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(t.newsletter.errorMessage);
      console.error("Error sending to webhook:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300 ease-out"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}
    >
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl transform transition-all duration-500 scale-100 will-change-transform">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          aria-label={t.common.close + ' popup'}
        >
          <X size={24} />
        </button>

        {submitStatus === 'success' ? (
          <div className="text-center py-8 transition-all duration-300">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">{t.newsletter.thankYou}</h3>
            <p className="text-gray-600">{t.newsletter.thankYouMessage}</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="text-purple-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-purple-600 mb-2">
                {t.newsletter.popup.title}
              </h3>
              <p className="text-gray-600">
                {t.newsletter.popup.description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder={t.newsletter.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  aria-label={t.newsletter.emailPlaceholder}
                />
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all disabled:opacity-70 font-semibold transform hover:scale-105 will-change-transform"
                aria-label={t.newsletter.subscribe}
              >
                {submitStatus === 'submitting' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.newsletter.sending}
                  </span>
                ) : (
                  {t.newsletter.popup.subscribeButton}
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                {t.newsletter.privacy} 🔒
              </p>
            </form>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                {t.newsletter.popup.benefits.weekly}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                {t.newsletter.popup.benefits.seasonal}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                {t.newsletter.popup.benefits.exclusive}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                {t.newsletter.popup.benefits.techniques}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};