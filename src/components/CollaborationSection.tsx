import React from 'react';
import { Check, Heart, Users, TrendingUp, Camera } from 'lucide-react';

export const CollaborationSection = () => {
  return (
    <section id="samarbeten" className="section-padding bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-purple-600 text-sm font-semibold mb-4 uppercase tracking-wider bg-purple-100 px-6 py-3 rounded-full shadow-md">
            Samarbeten & Partnerships
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-600 font-serif">
            Låt oss skapa tillsammans
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
            Jag erbjuder kreativa samarbeten med varumärken som delar mina värderingar om autentisk matlagning och kvalitet.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="card-modern hover-lift">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-4 rounded-2xl mr-4 shadow-md">
                <Heart className="text-purple-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-purple-600 font-serif">Vad jag erbjuder</h3>
            </div>
            <ul className="space-y-5">
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-4 flex-shrink-0" size={20} />
                <span className="text-gray-700 font-medium">Samarbeten & kampanjer med autentiskt innehåll</span>
              </li>
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-4 flex-shrink-0" size={20} />
                <span className="text-gray-700 font-medium">Receptutveckling & professionell matfoto</span>
              </li>
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-4 flex-shrink-0" size={20} />
                <span className="text-gray-700 font-medium">Video, reels och TikToks med hög kvalitet</span>
              </li>
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-4 flex-shrink-0" size={20} />
                <span className="text-gray-700 font-medium">Affiliate eller långsiktigt ambassadörskap</span>
              </li>
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-4 flex-shrink-0" size={20} />
                <span className="text-gray-700 font-medium">Matlagningsworkshops & events</span>
              </li>
            </ul>
          </div>
          
          <div className="card-modern hover-lift">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-4 rounded-2xl mr-4 shadow-md">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-purple-600 font-serif">Mina siffror</h3>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center bg-purple-50 p-6 rounded-2xl border border-purple-200 hover:bg-purple-100 transition-all shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-1">125k+</div>
                <div className="text-sm text-gray-600 font-medium">Instagram följare</div>
              </div>
              <div className="text-center bg-purple-50 p-6 rounded-2xl border border-purple-200 hover:bg-purple-100 transition-all shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-1">62k+</div>
                <div className="text-sm text-gray-600 font-medium">TikTok följare</div>
              </div>
              <div className="text-center bg-purple-50 p-6 rounded-2xl border border-purple-200 hover:bg-purple-100 transition-all shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-1">8.5%</div>
                <div className="text-sm text-gray-600 font-medium">Engagemang</div>
              </div>
              <div className="text-center bg-purple-50 p-6 rounded-2xl border border-purple-200 hover:bg-purple-100 transition-all shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-1">20-65</div>
                <div className="text-sm text-gray-600 font-medium">Åldersgrupp</div>
              </div>
            </div>
            <p className="text-gray-600 font-medium">
              Hög engagemang med autentisk målgrupp som älskar matlagning och kvalitetsprodukter.
            </p>
          </div>
        </div>

        {/* Previous collaborations */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-purple-600 mb-12 font-serif">Tidigare samarbeten</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {['FELIX', 'GLOBAL', 'GARANT', 'BONG', 'TV4'].map((brand, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl flex items-center justify-center h-24 hover-lift">
                <span className="font-bold text-gray-700 text-xl">{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white p-10 md:p-16 rounded-3xl shadow-2xl hover:shadow-3xl transition-all hover-lift">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-2/3 mb-8 lg:mb-0 lg:pr-12 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Vill du samarbeta med mig?</h3>
              <p className="text-white/90 mb-6 text-xl leading-relaxed">
                Engagemanget är högt och communityt är varmt, aktivt och lojalt med en äkta passion för god mat och autentiska recept.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-base">
                <div className="flex items-center">
                  <Users size={18} className="mr-3" />
                  <span>200k+ total reach</span>
                </div>
                <div className="flex items-center">
                  <Camera size={18} className="mr-3" />
                  <span>Professional content</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 flex justify-center">
              <a 
                href="#kontakt" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-purple-600 py-4 px-10 rounded-2xl hover:bg-gray-50 transition-all font-bold shadow-xl hover:shadow-2xl hover-lift text-lg"
              >
                Kontakta mig
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};