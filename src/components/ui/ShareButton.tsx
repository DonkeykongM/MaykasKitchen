import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Instagram, Link, Check } from 'lucide-react';
import { useTranslation } from '../../lib/i18n';

interface ShareButtonProps {
  recipe: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ recipe, className = '' }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate proper shareable URLs
  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}#recipe/${recipe.id}`;
  };

  const shareUrl = generateShareUrl();
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(recipe.title);
  const encodedDescription = encodeURIComponent(recipe.description);

  const shareOptions = [
    {
      name: 'Facebook',
      icon: <Facebook size={16} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={16} />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-sky-500 hover:text-white'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: `${recipe.title} - MaykasKitchen`,
      text: recipe.description,
      url: shareUrl,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        return;
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
    
    // Fallback to copy link
    copyToClipboard();
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg text-purple-700 hover:bg-purple-200 transition-colors text-sm min-h-[44px]"
        aria-label={t.recipeDetails.shareRecipe}
        aria-expanded={isOpen}
      >
        <Share2 size={16} />
        <span className="hidden sm:inline">{t.recipeDetails.share}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50">
          {/* Native share option for mobile */}
          <button
            onClick={handleNativeShare}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
          >
            <Share2 size={16} />
            {t.recipeDetails.share}
          </button>

          {/* Social media share options */}
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${option.color}`}
              onClick={() => setIsOpen(false)}
            >
              {option.icon}
              {option.name}
            </a>
          ))}

          {/* Copy link option */}
          <button
            onClick={copyToClipboard}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
          >
            {copied ? <Check size={16} className="text-green-600" /> : <Link size={16} />}
            {copied ? 'Kopierat!' : 'Kopiera länk'}
          </button>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};