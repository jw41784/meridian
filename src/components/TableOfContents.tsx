import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  minReadingTime?: number; // Minimum reading time in minutes to show TOC
}

export default function TableOfContents({ minReadingTime = 5 }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from the article content
    const article = document.querySelector('.prose');
    if (!article) return;

    const headingElements = article.querySelectorAll('h2, h3, h4');
    const headingData: Heading[] = [];

    headingElements.forEach((heading) => {
      // Generate ID if not present
      if (!heading.id) {
        heading.id =
          heading.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || '';
      }

      headingData.push({
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.substring(1)),
      });
    });

    setHeadings(headingData);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -70% 0%',
      }
    );

    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <h2 className="mb-3 text-base font-bold text-meridian-burgundy dark:text-meridian-steel lg:mb-4 lg:text-lg">
        On this page
      </h2>
      <div className="-mr-2 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2 lg:max-h-[calc(100vh-10rem)]">
        <ul className="space-y-1 lg:space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className="leading-relaxed"
              style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`block py-1 text-xs transition-colors hover:text-meridian-burgundy dark:hover:text-meridian-steel lg:text-sm ${
                  activeId === heading.id
                    ? '-ml-2 border-l-2 border-meridian-burgundy pl-2 font-medium text-meridian-burgundy dark:border-meridian-steel dark:text-meridian-steel'
                    : 'text-gray-600 hover:-ml-2 hover:pl-2 dark:text-gray-400'
                } `}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
