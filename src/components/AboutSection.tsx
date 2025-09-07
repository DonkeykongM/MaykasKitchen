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

        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="space-y-6 text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.about.description1}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.about.description2}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 py-8 max-w-md mx-auto">
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
            <div className="space-y-4 max-w-2xl mx-auto text-left">
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
            <div className="pt-6 flex flex-col items-center">
              <p className="text-sm font-semibold text-gray-900 mb-4">{t.about.followMeHere}</p>
              <div className="flex gap-4 justify-center">
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

            <p className="text-sm text-gray-500 pt-4 text-center">
              {t.about.since}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}