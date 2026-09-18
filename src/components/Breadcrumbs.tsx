import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const fullItems: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    ...items,
  ];

  // Schema.org BreadcrumbList JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://www.srlmohali.co.in${item.url}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-xs text-gray-500 dark:text-gray-400 py-3 ${className}`}
      >
        <ol
          className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;

            return (
              <li
                key={item.url}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {index > 0 && (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-gray-400 dark:text-zinc-600 mx-1 shrink-0"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    className="font-bold text-gray-800 dark:text-gray-200"
                    itemProp="name"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <RouterLink
                    to={item.url}
                    className="hover:text-google-blue dark:hover:text-blue-400 transition-colors flex items-center gap-1 font-medium"
                    itemProp="item"
                  >
                    {index === 0 && <Home className="w-3.5 h-3.5" aria-hidden="true" />}
                    <span itemProp="name">{item.name}</span>
                  </RouterLink>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
