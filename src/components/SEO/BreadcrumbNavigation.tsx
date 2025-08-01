import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ 
  items, 
  className = '' 
}) => {
  const handleNavigation = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <nav 
      aria-label="Breadcrumb navigation" 
      className={`breadcrumb ${className}`}
      role="navigation"
    >
      <ol className="flex items-center space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => (
          <li 
            key={index} 
            className="breadcrumb-item"
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            {item.href && !item.current ? (
              <>
                <a
                  href={item.href}
                  onClick={(e) => handleNavigation(item.href!, e)}
                  className="text-purple-600 hover:text-purple-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-sm"
                  itemProp="item"
                  aria-current={item.current ? 'page' : undefined}
                >
                  <span itemProp="name">{item.label}</span>
                </a>
                <meta itemProp="position" content={String(index + 1)} />
              </>
            ) : (
              <>
                <span 
                  className={`${item.current ? 'text-neutral-900 font-medium' : 'text-neutral-600'}`}
                  aria-current={item.current ? 'page' : undefined}
                  itemProp="name"
                >
                  {item.label}
                </span>
                <meta itemProp="position" content={String(index + 1)} />
              </>
            )}
            
            {index < items.length - 1 && (
              <ChevronRight 
                size={16} 
                className="breadcrumb-separator ml-2" 
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};