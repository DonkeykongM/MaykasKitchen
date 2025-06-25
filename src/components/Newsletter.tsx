import React, { useState } from 'react';
import { Mail, ArrowRight, Send, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<null | 'submitting' | 'success' | 'error'>(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setSubmitStatus('error');
      setErrorMessage('Vänligen ange en giltig e-postadress.');
      return;
    }
    
    // Submit form
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
          source: 'main_newsletter'
        })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSubmitStatus('success');
      setEmail('');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Något gick fel. Försök igen senare.');
      console.error("Error sending to webhook:", error);
    }
  };
  
  return (
    <section className="section-dark relative overflow-hidden py-16">
      {/* Newsletter animated background - similar to contact */}
      <div className="contact-animated-background"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full transform translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center justify-center p-3 bg-white/25 backdrop-blur-sm rounded-full mb-6 shadow-xl border border-white/30">
          <Mail className="text-white" size={32} />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Få matinspiration direkt i din inkorg</h2>
        <p className="mb-8 max-w-2xl mx-auto text-white/90">Prenumerera på mitt nyhetsbrev och få de senaste recepten, säsongsbaserade tips och exklusiva erbjudanden direkt till dig. Jag skickar ut mitt nyhetsbrev ungefär en gång i månaden.</p>
        
        <div className="max-w-xl mx-auto">
          {submitStatus === 'success' ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center justify-center animate-fadeIn border border-white/30 shadow-xl">
              <div className="bg-green-500 text-white p-3 rounded-full mb-4 shadow-lg">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Tack för din prenumeration!</h3>
              <p className="mb-0 text-white/90">Du kommer nu få mina senaste recept och tips direkt i din inkorg.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Din e-postadress" 
                  className={`w-full px-4 py-3 rounded-lg border border-white/30 text-purple-900 border-transparent focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/95 backdrop-blur-sm shadow-lg ${
                    submitStatus === 'error' ? 'border-red-500 bg-red-50/95' : ''
                  }`}
                  aria-label="Din e-postadress"
                  disabled={submitStatus === 'submitting'}
                />
                {submitStatus === 'error' && (
                  <div className="absolute -bottom-6 left-0 text-xs text-white bg-red-600 px-2 py-1 rounded-sm">
                    {errorMessage}
                  </div>
                )}
              </div>
              <button 
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="bg-white/25 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white hover:text-purple-700 transition-all font-semibold flex items-center justify-center group whitespace-nowrap disabled:opacity-70 border border-white/30 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {submitStatus === 'submitting' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Skickar...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send size={18} className="mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Prenumerera
                  </span>
                )}
              </button>
            </form>
          )}
          
          <div className="mt-8 text-sm text-white/80">
            <p>Genom att prenumerera godkänner du att få mitt nyhetsbrev och accepterar min <a href="#" className="underline hover:text-white transition-colors">integritetspolicy</a>. Du kan avsluta prenumerationen när som helst.</p>
          </div>
        </div>
      </div>
    </section>
  );
};