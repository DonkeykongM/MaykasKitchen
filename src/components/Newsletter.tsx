import React, { useState } from 'react';
import { Mail, ArrowRight, Send, Check, Calendar, Star, Scaling as Seedling, Utensils } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<null | 'submitting' | 'success' | 'error'>(null);
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
    <section className="bg-gradient-to-br from-purple-50 via-white to-purple-50 py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-20 h-20 bg-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-600 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-full mb-6">
          <Mail className="text-white" size={28} />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 font-serif">
          Få matinspiration direkt i din inkorg
        </h2>
        <p className="mb-8 max-w-2xl mx-auto text-gray-600 text-lg">
          Prenumerera på mitt nyhetsbrev och få de senaste recepten, säsongsbaserade tips och exklusiva erbjudanden direkt till dig. Jag skickar ut mitt nyhetsbrev ungefär en gång i månaden.
        </p>
        
        <div className="max-w-xl mx-auto">
          {submitStatus === 'success' ? (
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center animate-fadeIn border border-purple-200 shadow-lg">
              <div className="bg-green-500 text-white p-4 rounded-full mb-4">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Tack för din prenumeration!</h3>
              <p className="text-gray-600">Du kommer nu få mina senaste recept och tips direkt i din inkorg.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Din e-postadress" 
                  className={`w-full px-4 py-4 rounded-lg border text-gray-800 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white ${
                    submitStatus === 'error' ? 'border-red-500 bg-red-50' : ''
                  }`}
                  aria-label="Din e-postadress"
                  disabled={submitStatus === 'submitting'}
                />
                {submitStatus === 'error' && (
                  <div className="absolute -bottom-6 left-0 text-xs text-red-600 bg-red-100 px-2 py-1 rounded-sm">
                    {errorMessage}
                  </div>
                )}
              </div>
              <button 
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-all font-semibold flex items-center justify-center group whitespace-nowrap disabled:opacity-70 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {submitStatus === 'submitting' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-purple-100 text-center">
              <div className="bg-purple-100 p-2 rounded-full mx-auto mb-2 w-fit">
                <Calendar className="text-purple-600" size={20} />
              </div>
              <span className="text-sm text-gray-700 font-medium">Nya recept varje månad</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-purple-100 text-center">
              <div className="bg-purple-100 p-2 rounded-full mx-auto mb-2 w-fit">
                <Star className="text-purple-600" size={20} />
              </div>
              <span className="text-sm text-gray-700 font-medium">Exklusiva recept</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-purple-100 text-center">
              <div className="bg-purple-100 p-2 rounded-full mx-auto mb-2 w-fit">
                <Seedling className="text-purple-600" size={20} />
              </div>
              <span className="text-sm text-gray-700 font-medium">Säsongsbaserade tips</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-purple-100 text-center">
              <div className="bg-purple-100 p-2 rounded-full mx-auto mb-2 w-fit">
                <Utensils className="text-purple-600" size={20} />
              </div>
              <span className="text-sm text-gray-700 font-medium">Matlagningstekniker</span>
            </div>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>Genom att prenumerera godkänner du att få mitt nyhetsbrev och accepterar min <a href="#" className="underline hover:text-purple-600 text-purple-500">integritetspolicy</a>. Du kan avsluta prenumerationen när som helst.</p>
          </div>
        </div>
      </div>
    </section>
  );
};