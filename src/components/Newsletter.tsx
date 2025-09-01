import React, { useState } from 'react';
import { Mail, ArrowRight, Send, Check, Calendar, Star, Scaling as Seedling, Utensils } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      setSubmitStatus('error');
      setErrorMessage('Vänligen ange en giltig e-postadress.');
      return;
    }
    
    setSubmitStatus('submitting');
    
    try {
      const response = await fetch('https://hook.eu2.make.com/sfjfkezizhjh4x7r1rrjmjwyei2sufj2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          type: 'newsletter',
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
    <section className="section-padding bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 relative">
      {/* Beautiful background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-gentle-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full transform translate-x-1/3 translate-y-1/3 animate-gentle-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full animate-gentle-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
        <div className="inline-flex items-center justify-center p-4 bg-white/20 backdrop-blur-md rounded-2xl mb-8 shadow-xl">
          <Mail className="text-white" size={32} />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-serif">
          🌟 Få matinspiration direkt i din inkorg
        </h2>
        <p className="mb-10 max-w-3xl mx-auto text-white/90 text-xl leading-relaxed">
          Prenumerera på mitt nyhetsbrev och få de senaste recepten, säsongsbaserade tips och exklusiva erbjudanden direkt till dig. 
        </p>
        
        <div className="max-w-2xl mx-auto">
          {submitStatus === 'success' ? (
            <div className="glass-card p-10 flex flex-col items-center justify-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-5 rounded-2xl mb-6 shadow-lg">
                <Check size={36} />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-800">Tack för din prenumeration!</h3>
              <p className="text-gray-600 text-lg">Du kommer nu få mina senaste recept och tips direkt i din inkorg.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Din e-postadress..." 
                  className={`w-full px-6 py-4 rounded-2xl text-gray-800 bg-white/95 backdrop-blur-md border-2 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 shadow-xl text-lg ${
                    submitStatus === 'error' ? 'border-red-300 bg-red-50' : ''
                  }`}
                  aria-label="Din e-postadress"
                  disabled={submitStatus === 'submitting'}
                />
                {submitStatus === 'error' && (
                  <div className="absolute -bottom-8 left-0 error-message">
                    {errorMessage}
                  </div>
                )}
              </div>
              <button 
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="bg-white text-purple-600 px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all font-bold flex items-center justify-center group whitespace-nowrap disabled:opacity-70 shadow-xl hover:shadow-2xl hover-lift text-lg"
              >
                {submitStatus === 'submitting' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin mr-3 h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Skickar...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send size={20} className="mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Prenumerera
                  </span>
                )}
              </button>
            </form>
          )}
          
          {/* Beautiful features grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-card p-6 text-center hover-lift">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl mx-auto mb-4 w-fit shadow-lg">
                <Calendar className="text-white" size={24} />
              </div>
              <span className="text-sm text-white font-semibold">Nya recept varje månad</span>
            </div>
            <div className="glass-card p-6 text-center hover-lift">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl mx-auto mb-4 w-fit shadow-lg">
                <Star className="text-white" size={24} />
              </div>
              <span className="text-sm text-white font-semibold">Exklusiva recept</span>
            </div>
            <div className="glass-card p-6 text-center hover-lift">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl mx-auto mb-4 w-fit shadow-lg">
                <Seedling className="text-white" size={24} />
              </div>
              <span className="text-sm text-white font-semibold">Säsongsbaserade tips</span>
            </div>
            <div className="glass-card p-6 text-center hover-lift">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl mx-auto mb-4 w-fit shadow-lg">
                <Utensils className="text-white" size={24} />
              </div>
              <span className="text-sm text-white font-semibold">Matlagningstekniker</span>
            </div>
          </div>
          
          <div className="mt-12 text-sm text-white/80">
            <p>Genom att prenumerera godkänner du att få mitt nyhetsbrev och accepterar min <a href="#" className="underline hover:text-white text-white/90 font-medium">integritetspolicy</a>. Du kan avsluta prenumerationen när som helst.</p>
          </div>
        </div>
      </div>
    </section>
  );
};