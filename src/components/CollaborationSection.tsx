import React from 'react';
import { Check, Heart, Users, TrendingUp, Camera } from 'lucide-react';
import { useTranslation } from '../lib/i18n';

export const CollaborationSection = () => {
  const { t } = useTranslation();
  
  return (
    <section id="samarbeten" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-purple-600 text-sm font-medium mb-2 uppercase tracking-wider bg-purple-50 px-4 py-2 rounded-full">
            {t.collaborations.tagline}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-600 font-serif">
            {t.collaborations.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t.collaborations.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-purple-100">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Heart className="text-purple-600" size={24} />
              </div>
              <h3 className="text-2xl font-semibold text-purple-600 font-serif">{t.collaborations.whatIOffer}</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-700">{t.collaborations.offers.campaigns}</span>
              </li>
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-700">{t.collaborations.offers.recipedev}</span>
              </li>
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-700">{t.collaborations.offers.videos}</span>
              </li>
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-700">{t.collaborations.offers.affiliate}</span>
              </li>
              <li className="flex items-start">
                <Check className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-700">{t.collaborations.offers.workshops}</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-purple-100">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <h3 className="text-2xl font-semibold text-purple-600 font-serif">{t.collaborations.myNumbers}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">125k+</div>
                <div className="text-sm text-gray-600">Instagram {t.collaborations.followers}</div>
              </div>
              <div className="text-center bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">62k+</div>
                <div className="text-sm text-gray-600">TikTok {t.collaborations.followers}</div>
              </div>
              <div className="text-center bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">8.5%</div>
                <div className="text-sm text-gray-600">{t.collaborations.engagement}</div>
              </div>
              <div className="text-center bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">20-65</div>
                <div className="text-sm text-gray-600">{t.collaborations.ageGroup}</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              {t.collaborations.highEngagement}
            </p>
          </div>
        </div>

        {/* Previous collaborations */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center text-purple-600 mb-8 font-serif">{t.collaborations.previousCollabs}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {['FELIX', 'GLOBAL', 'GARANT', 'BONG', 'TV4'].map((brand, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-md p-6 rounded-xl flex items-center justify-center h-20 shadow-md hover:shadow-lg transition-all border border-purple-100 transform hover:scale-105">
                <span className="font-bold text-gray-700 text-lg">{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-8 md:p-12 rounded-2xl shadow-xl">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-2/3 mb-6 lg:mb-0 lg:pr-8 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 font-serif">{t.collaborations.collaborateWithMe}</h3>
              <p className="text-purple-100 mb-4 text-lg">
                {t.collaborations.highEngagement}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <div className="flex items-center">
                  <Users size={16} className="mr-2" />
                  <span>200k+ {t.collaborations.totalReach}</span>
                </div>
                <div className="flex items-center">
                  <Camera size={16} className="mr-2" />
                  <span>{t.collaborations.professionalContent}</span>
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
                className="bg-white text-purple-600 py-3 px-8 rounded-full hover:bg-purple-50 transition duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {t.collaborations.contactMe}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};