import React from 'react';
import { useTranslation } from '../lib/i18n';
import { Instagram, BookText as TikTok, Youtube, Facebook } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-6 bg-white/80" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-purple-600 font-semibold text-sm uppercase tracking-wide mb-4">
            {t.about.tagline}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.about.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
              <img
                src="https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCIRQfhMbanRC45KvFPkwGxStE3Ob1dcATYX9L"
                alt="Mayka Gulo i köket"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                onError={(e) => {
                  console.error('Image failed to load:', e.currentTarget.src);
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-purple-200 text-purple-600"><div class="text-center"><div class="text-4xl mb-2">👩‍🍳</div><div class="text-sm">Mayka Gulo</div></div></div>';
                  }
                }}
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-200 rounded-full opacity-40"></div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.about.description1}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.about.description2}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 py-8">
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <div className="flex items-center justify-center mb-3">
                  <Instagram className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">120K+</p>
                <p className="text-sm text-gray-600">{t.about.stats.instagram}</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
                <div className="flex items-center justify-center mb-3">
                  <TikTok className="w-8 h-8 text-pink-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">62K+</p>
                <p className="text-sm text-gray-600">{t.about.stats.tiktok}</p>
              </div>
            </div>

            {/* Key points */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.about.community}</h4>
                  <p className="text-gray-600">{t.about.communityDesc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-pink-600 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.about.expertise}</h4>
                  <p className="text-gray-600">{t.about.expertiseDesc}</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-6">
              <p className="text-sm font-semibold text-gray-900 mb-4">{t.about.followMeHere}</p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/maykaskitchen"
                  className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:scale-110 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://tiktok.com/@maykaskitchen"
                  className="p-3 bg-black text-white rounded-full hover:shadow-lg hover:scale-110 transition-all duration-300"
                  aria-label="TikTok"
                >
                  <TikTok className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com/@maykaskitchen"
                  className="p-3 bg-red-600 text-white rounded-full hover:shadow-lg hover:scale-110 transition-all duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/maykaskitchen"
                  className="p-3 bg-blue-600 text-white rounded-full hover:shadow-lg hover:scale-110 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <p className="text-sm text-gray-500 pt-4">
              {t.about.since}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};