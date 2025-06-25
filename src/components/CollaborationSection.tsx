import React from 'react';
import { Check } from 'lucide-react';

export const CollaborationSection = () => {
  return (
    <section id="samarbeten" className="py-16 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">Samarbeten</h2>
        <p className="text-center mb-12 max-w-2xl mx-auto text-white/85">Jag erbjuder kreativa samarbeten med varumärken som delar mina värderingar om autentisk matlagning och kvalitet.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <h3 className="text-xl font-semibold mb-4 text-white">Vad jag erbjuder</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="text-yellow-200 mt-1 mr-2" size={18} />
                <span className="text-white/90">Samarbeten & kampanjer med autentiskt innehåll</span>
              </li>
              <li className="flex items-start">
                <Check className="text-yellow-200 mt-1 mr-2" size={18} />
                <span className="text-white/90">Receptutveckling & professionell matfoto</span>
              </li>
              <li className="flex items-start">
                <Check className="text-yellow-200 mt-1 mr-2" size={18} />
                <span className="text-white/90">Video, reels och TikToks med hög kvalitet</span>
              </li>
              <li className="flex items-start">
                <Check className="text-yellow-200 mt-1 mr-2" size={18} />
                <span className="text-white/90">Affiliate eller långsiktigt ambassadörskap</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <h3 className="text-xl font-semibold mb-4 text-white">Tidigare samarbeten</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="brand-card bg-white/20 p-3 rounded-lg flex items-center justify-center h-20 backdrop-blur-sm border border-white/30">
                <span className="font-bold text-white">FELIX</span>
              </div>
              <div className="brand-card bg-white/20 p-3 rounded-lg flex items-center justify-center h-20 backdrop-blur-sm border border-white/30">
                <span className="font-bold text-white">GLOBAL</span>
              </div>
              <div className="brand-card bg-white/20 p-3 rounded-lg flex items-center justify-center h-20 backdrop-blur-sm border border-white/30">
                <span className="font-bold text-white">GARANT</span>
              </div>
              <div className="brand-card bg-white/20 p-3 rounded-lg flex items-center justify-center h-20 backdrop-blur-sm border border-white/30">
                <span className="font-bold text-white">BONG</span>
              </div>
              <div className="brand-card bg-white/20 p-3 rounded-lg flex items-center justify-center h-20 backdrop-blur-sm border border-white/30">
                <span className="font-bold text-white">TV4</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm text-white p-8 rounded-lg border border-white/20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-semibold mb-4">Vill du samarbeta med mig?</h3>
              <p>Engagemanget är högt och communityt är varmt, aktivt och lojalt med en äkta passion för god mat och autentiska recept.</p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <a href="#kontakt" className="bg-white/90 text-purple-700 hover:bg-white hover:text-purple-800 py-3 px-8 rounded-full transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">Kontakta mig</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};