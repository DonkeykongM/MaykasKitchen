import React, { useState, useRef } from 'react';
import { Mail, Home, Instagram, BookText as TikTok, Youtube, Facebook, Send, ArrowRight, ChevronRight, MapPin } from 'lucide-react';

export const ContactSection = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
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
    <section id="kontakt" className="section-padding gradient-light relative w-full">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-purple-600 text-sm font-semibold mb-3 uppercase tracking-wider bg-purple-50 px-4 py-2 rounded-full">
            Kontakt & Samarbeten
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-600 font-serif">
            Låt oss skapa tillsammans
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hör gärna av dig för samarbeten, frågor eller bara för att säga hej! Jag svarar alltid så snart jag kan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="card-modern" ref={formRef}>
              <h3 className="text-2xl font-bold mb-8 flex items-center text-purple-600">
                <Send className="mr-3 text-purple-600" size={24} />
                Skicka ett meddelande
              </h3>
              
              {formStatus === 'success' ? (
                <div className="success-message text-center p-8 rounded-2xl">
                  <div className="inline-flex items-center justify-center bg-green-100 p-4 rounded-2xl text-green-600 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">Tack för ditt meddelande!</h4>
                  <p className="text-gray-600 mb-6 text-lg">Jag återkommer till dig så snart som möjligt.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="btn-secondary hover-lift"
                  >
                    Skicka ett nytt meddelande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Namn <span className="text-red-500">*</span></label>
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
                      className={`form-input ${
                        fieldErrors.name ? 'error' : ''
                      }`}
                      placeholder="Ditt fullständiga namn"
                    />
                    {fieldErrors.name && (
                      <p id="name-error" className="error-message">{fieldErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">E-post <span className="text-red-500">*</span></label>
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
                      className={`form-input ${
                        fieldErrors.email ? 'error' : ''
                      }`}
                      placeholder="Din e-postadress"
                    />
                    {fieldErrors.email && (
                      <p id="email-error" className="error-message">{fieldErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Ämne</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Vad handlar ditt meddelande om?"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Meddelande <span className="text-red-500">*</span></label>
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
                      className={`form-input resize-none ${
                        fieldErrors.message ? 'error' : ''
                      }`}
                      placeholder="Skriv ditt meddelande här..."
                    ></textarea>
                    {fieldErrors.message && (
                      <p id="message-error" className="error-message">{fieldErrors.message}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label className="flex items-start cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-purple-600 rounded-md focus:ring-purple-600 focus:ring-2 mr-3 mt-0.5"
                        checked={subscribeToNewsletter}
                        onChange={() => setSubscribeToNewsletter(!subscribeToNewsletter)}
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        Jag vill prenumerera på nyhetsbrevet och få de senaste recepten direkt i min inkorg.
                      </span>
                    </label>
                  </div>
                  
                  {formStatus === 'error' && errorMessage && (
                    <div className="error-message mb-6">
                      {errorMessage || 'Ett fel uppstod när meddelandet skulle skickas. Försök igen.'}
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="btn-primary w-full py-4 rounded-2xl text-lg font-semibold hover-lift disabled:opacity-70 disabled:transform-none"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Skickar...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-3" />
                        Skicka meddelande
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="order-1 lg:order-2">
            <div className="card-modern mb-8">
              <h3 className="text-2xl font-bold mb-8 flex items-center text-purple-600">
                <Mail className="mr-3 text-purple-600" size={24} />
                Kontaktuppgifter
              </h3>
              <div className="space-y-8">
                <div className="flex items-start p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all">
                  <div className="bg-purple-100 p-3 rounded-2xl mr-4 shadow-md">
                    <Mail className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">E-post</h4>
                    <a href="mailto:info@maykaskitchen.se" className="text-purple-600 hover:text-purple-700 transition-colors font-medium">info@maykaskitchen.se</a>
                  </div>
                </div>
                
                <div className="flex items-start p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all">
                  <div className="bg-purple-100 p-3 rounded-2xl mr-4 shadow-md">
                    <MapPin className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Plats</h4>
                    <p className="text-purple-600 font-medium">Skåne, Sverige</p>
                    <p className="text-sm text-gray-600 mt-1">Tillgänglig för uppdrag i hela Sverige</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="card-modern">
              <h3 className="text-2xl font-bold mb-8 flex items-center text-purple-600">
                <Instagram className="mr-3 text-purple-600" size={24} />
                Följ mig
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <a 
                  href="https://www.instagram.com/maykaskitchen/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl hover:from-purple-100 hover:to-pink-100 transition-all group hover-lift shadow-md"
                >
                  <Instagram className="text-purple-600 mr-4 group-hover:scale-110 transition-transform" size={28} />
                  <div>
                    <h4 className="font-bold text-gray-800">Instagram</h4>
                    <p className="text-purple-600 text-sm font-medium">125 000+ följare</p>
                  </div>
                  <ChevronRight className="ml-auto text-gray-400 group-hover:text-purple-600 transition-all group-hover:translate-x-1" size={20} />
                </a>
                
                <a 
                  href="https://www.tiktok.com/@Maykaskitchen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl hover:from-purple-100 hover:to-indigo-100 transition-all group hover-lift shadow-md"
                >
                  <TikTok className="text-purple-600 mr-4 group-hover:scale-110 transition-transform" size={28} />
                  <div>
                    <h4 className="font-bold text-gray-800">TikTok</h4>
                    <p className="text-purple-600 text-sm font-medium">62 000+ följare</p>
                  </div>
                  <ChevronRight className="ml-auto text-gray-400 group-hover:text-purple-600 transition-all group-hover:translate-x-1" size={20} />
                </a>
                
                <a 
                  href="https://www.youtube.com/@Maykaskitchen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-5 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl hover:from-red-100 hover:to-pink-100 transition-all group hover-lift shadow-md"
                >
                  <Youtube className="text-red-600 mr-4 group-hover:scale-110 transition-transform" size={28} />
                  <div>
                    <h4 className="font-bold text-gray-800">YouTube</h4>
                    <p className="text-red-600 text-sm font-medium">2 000+ prenumeranter</p>
                  </div>
                  <ChevronRight className="ml-auto text-gray-400 group-hover:text-red-600 transition-all group-hover:translate-x-1" size={20} />
                </a>
                
                <a 
                  href="https://www.facebook.com/maykaskitchen/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl hover:from-blue-100 hover:to-indigo-100 transition-all group hover-lift shadow-md"
                >
                  <Facebook className="text-blue-600 mr-4 group-hover:scale-110 transition-transform" size={28} />
                  <div>
                    <h4 className="font-bold text-gray-800">Facebook</h4>
                    <p className="text-blue-600 text-sm font-medium">25 000+ följare</p>
                  </div>
                  <ChevronRight className="ml-auto text-gray-400 group-hover:text-blue-600 transition-all group-hover:translate-x-1" size={20} />
                </a>
              </div>
              
              {/* Quick response tip */}
              <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl shadow-lg">
                <p className="font-semibold mb-3 text-lg">💬 Snabbast svar får du via Instagram DM</p>
                <a 
                  href="https://www.instagram.com/maykaskitchen/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-white hover:text-purple-100 font-semibold transition-all hover-scale"
                >
                  Skicka DM <ArrowRight size={18} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};