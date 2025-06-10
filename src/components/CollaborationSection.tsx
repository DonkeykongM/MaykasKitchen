import React from 'react';
import { Check } from 'lucide-react';

export const CollaborationSection = () => {
  return (
    <section id="samarbeten" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary-color">Samarbeten</h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">Jag erbjuder kreativa samarbeten med varumärken som delar mina värderingar om autentisk matlagning och kvalitet.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-beige-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Vad jag erbjuder</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="text-primary-color mt-1 mr-2" size={18} />
                <span>Samarbeten & kampanjer med autentiskt innehåll</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary-color mt-1 mr-2" size={18} />
                <span>Receptutveckling & professionell matfoto</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary-color mt-1 mr-2" size={18} />
                <span>Video, reels och TikToks med hög kvalitet</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary-color mt-1 mr-2" size={18} />
                <span>Affiliate eller långsiktigt ambassadörskap</span>
              </li>
            </ul>
          </div>
          <div className="bg-beige-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Tidigare samarbeten</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="brand-card bg-white p-3 rounded-lg flex items-center justify-center h-20">
                <span className="font-bold text-brown-700">FELIX</span>
              </div>
              <div className="brand-card bg-white p-3 rounded-lg flex items-center justify-center h-20">
                <span className="font-bold text-brown-700">GLOBAL</span>
              </div>
              <div className="brand-card bg-white p-3 rounded-lg flex items-center justify-center h-20">
                <span className="font-bold text-brown-700">GARANT</span>
              </div>
              <div className="brand-card bg-white p-3 rounded-lg flex items-center justify-center h-20">
                <span className="font-bold text-brown-700">BONG</span>
              </div>
              <div className="brand-card bg-white p-3 rounded-lg flex items-center justify-center h-20">
                <span className="font-bold text-brown-700">TV4</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-color text-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-semibold mb-4">Vill du samarbeta med mig?</h3>
              <p className="mb-4">Min målgrupp består främst av kvinnor mellan 25-54 år som är intresserade av mat, familjeliv, odling, hållbarhet och vardagsinspiration.</p>
              <p>Engagemanget är högt och communityt är varmt, aktivt och lojalt med en äkta passion för god mat och autentiska recept.</p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <a href="#kontakt" className="bg-white text-primary-color py-3 px-8 rounded-full hover:bg-beige-50 transition duration-300">Kontakta mig</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};