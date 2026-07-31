// app/components/TableOfContents.tsx
'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ className }: { className?: string }) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Get all headings from the page
    const elements = Array.from(document.querySelectorAll('h2')).map(
      (element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.charAt(1)),
      })
    );
    setHeadings(elements);

    // Create intersection observer for scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    // Observe all headings
    elements.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`${className} sticky top-0 w-64 max-h-[80vh] overflow-y-auto flex items-stretch"`}
    >
      <ul className="space-y-2 mr-4">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ marginLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-1 text-right hover:text-blue-600 transition-colors ${
                activeId === heading.id
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
      <div className="w-1 bg-gray-200 flex flex-col items-stretch relative">
        <div
          className="w-1 bg-black absolute top-0 translate-y-1/2"
          style={{ height: `${100 / headings.length}%` }}
        ></div>
      </div>
    </nav>
  );
}
