import React, { useState, useRef } from 'react';
import { Mail, Home, Instagram, BookText as TikTok, Youtube, Facebook, Send, ArrowRight, ChevronRight, MapPin } from 'lucide-react';

export const ContactSection = () => {
  const [formStatus, setFormStatus] = useState<null | 'submitting' | 'success' | 'error'>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  
  const formRef = useRef<HTMLFormElement>(null);
  
  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Namn är obligatoriskt';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'E-post är obligatoriskt';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Vänligen ange en giltig e-postadress';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Meddelande är obligatoriskt';
    } else if (formData.message.length < 10) {
      errors.message = 'Meddelandet är för kort (minst 10 tecken)';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setFormStatus('error');
      setErrorMessage('Vänligen åtgärda felen i formuläret.');
      return;
    }
    
    // Submit form
    setFormStatus('submitting');
    
    try {
      // Send to Make webhook
      const response = await fetch('https://hook.eu2.make.com/sfjfkezizhjh4x7r1rrjmjwyei2sufj2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          subscribe_to_newsletter: subscribeToNewsletter,
          source: 'contact_form'
        })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Also add to newsletter if checked
      if (subscribeToNewsletter) {
        try {
          // Send separate newsletter signup
          const newsletterResponse = await fetch('https://hook.eu2.make.com/sfjfkezizhjh4x7r1rrjmjwyei2sufj2', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              type: 'newsletter',
              email: formData.email,
              name: formData.name,
              source: 'contact_form'
            })
          });
          
          if (!newsletterResponse.ok) {
            console.error("Error sending to webhook: Response not OK");
          }
        } catch (error) {
          console.error("Error sending to webhook:", error);
          // We continue even if webhook subscription fails
        }
      }
      
      // Success - reset form
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubscribeToNewsletter(true);
      
      // Scroll to top of form
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
      
    } catch (error) {
      setFormStatus('error');
      setErrorMessage('Något gick fel när ditt meddelande skulle skickas. Försök igen senare.');
      console.error("Error sending to webhook:", error);
    }
  };

  return (
    <section id="kontakt" className="py-16 bg-white relative w-full">
      <div className="container mx-auto px-4 relative z-10">
        <span className="block text-center text-primary-color text-sm font-medium mb-2 uppercase tracking-wider">Nå mig</span>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary-color">Kontakta mig</h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">Hör gärna av dig för samarbeten, frågor eller bara för att säga hej!</p>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="bg-white p-4 md:p-8 rounded-lg shadow-md" ref={formRef}>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Send className="mr-2 text-primary-color" size={20} />
                Skicka ett meddelande
              </h3>
              
              {formStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="inline-flex items-center justify-center bg-green-100 p-3 rounded-full text-green-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Tack för ditt meddelande!</h4>
                  <p className="text-gray-600 mb-4">Jag återkommer till dig så snart som möjligt.</p>
                  <button 
                    onClick={() => setFormStatus(null)}
                    className="text-primary-color font-medium hover:text-accent-color"
                  >
                    Skicka ett nytt meddelande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-brown-700 mb-2 font-medium">Namn <span className="text-primary-color">*</span></label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color transition-all max-w-full box-border ${
                        fieldErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-brown-700 mb-2 font-medium">E-post <span className="text-primary-color">*</span></label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color transition-all max-w-full box-border ${
                        fieldErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Din e-postadress"
                    />
                    {fieldErrors.email && (
                      <p id="email-error" className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-brown-700 mb-2 font-medium">Ämne</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color transition-all border-gray-300 max-w-full box-border"
                      placeholder="Vad handlar ditt meddelande om?"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-brown-700 mb-2 font-medium">Meddelande <span className="text-primary-color">*</span></label>
                    <textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4} 
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? "message-error" : undefined}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color transition-all max-w-full box-border resize-none ${
                        fieldErrors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Skriv ditt meddelande här..."
                    ></textarea>
                    {fieldErrors.message && (
                      <p id="message-error" className="text-red-500 text-sm mt-1">{fieldErrors.message}</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-primary-color rounded focus:ring-primary-color"
                        checked={subscribeToNewsletter}
                        onChange={() => setSubscribeToNewsletter(!subscribeToNewsletter)}
                      />
                      <span className="ml-2 text-sm text-gray-700">Jag vill prenumerera på nyhetsbrevet och få de senaste recepten direkt i min inkorg.</span>
                    </label>
                  </div>
                  
                  {formStatus === 'error' && !Object.keys(fieldErrors).length && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
                      {errorMessage || 'Ett fel uppstod när meddelandet skulle skickas. Försök igen.'}
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-primary-color text-white py-3 rounded-lg hover:bg-accent-color transition duration-300 flex items-center justify-center disabled:opacity-70 max-w-full"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Skickar...
                      </>
                    ) : (
                      <>
                        Skicka meddelande <ArrowRight size={18} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Mail className="mr-2 text-primary-color" size={20} />
                Kontaktuppgifter
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-beige-100 p-3 rounded-full mr-4">
                    <Mail className="text-primary-color" size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold">E-post</h4>
                    <a href="mailto:info@maykaskitchen.se" className="text-brown-500 hover:text-primary-color transition-colors">info@maykaskitchen.se</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-beige-100 p-3 rounded-full mr-4">
                    <MapPin className="text-primary-color" size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Plats</h4>
                    <p className="text-brown-500">Skåne, Sverige</p>
                    <p className="text-xs text-gray-500 mt-1">Tillgänglig för uppdrag i hela Sverige</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Instagram className="mr-2 text-primary-color" size={20} />
                Följ mig
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://www.instagram.com/maykaskitchen/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-beige-50 rounded-lg hover:bg-beige-100 transition duration-300 group"
                >
                  <Instagram className="text-primary-color mr-3 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <h4 className="font-semibold">Instagram</h4>
                    <p className="text-brown-500 text-sm">125 000+ följare</p>
                  </div>
                  <ChevronRight className="ml-auto text-gray-400 group-hover:text-primary-color transition-colors" size={16} />
                </a>
                <a 
                  href="https://www.tiktok.com/@Maykaskitchen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-beige-50 rounded-lg hover:bg-beige-100 transition duration-300 group"
                >
                  <TikTok className="text-primary-color mr-3 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <h4 className="font-semibold">TikTok</h4>
                    <p className="text-brown-500 text-sm">62 000+ följare</p>
                  </div>
                  <ChevronRight className="ml-auto text-gray-400 group-hover:text-primary-color transition-colors" size={16} />
                </a>
                <a 
                  href="https://www.youtube.com/@Maykaskitchen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-beige-50 rounded-lg hover:bg-beige-100 transition duration-300 group"
                >
                  <Youtube className="text-primary-color mr-3 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <h4 className="font-semibold">YouTube</h4>
                    <p className="text-brown-500 text-sm">ca 2000 prenumeranter</p>
                  </div>
                  <ChevronRight className="ml-auto text-gray-400 group-hover:text-primary-color transition-colors" size={16} />
                </a>
                <a 
                  href="https://www.facebook.com/maykaskitchen/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-beige-50 rounded-lg hover:bg-beige-100 transition duration-300 group"
                >
                  <Facebook className="text-primary-color mr-3 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <h4 className="font-semibold">Facebook</h4>
                    <p className="text-brown-500 text-sm">25 000+ följare</p>
                  </div>
                  <ChevronRight className="ml-auto text-gray-400 group-hover:text-primary-color transition-colors" size={16} />
                </a>
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-lg">
                <p className="font-medium mb-2">Snabbast svar får du via Instagram DM</p>
                <a 
                  href="https://www.instagram.com/maykaskitchen/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-white hover:text-beige-50 font-medium"
                >
                  Skicka DM <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};