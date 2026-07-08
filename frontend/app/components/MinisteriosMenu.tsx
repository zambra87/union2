'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useMinisterios } from '@/app/contexts/MinisteriosContext';
import { getMinisterioHref } from '@/app/data/ministerios';

type MinisteriosMenuProps = {
  linkClass: string;
  variant: 'white' | 'black';
};

export function MinisteriosMenu({ linkClass, variant }: MinisteriosMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { ministerios } = useMinisterios();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownClass =
    variant === 'white'
      ? 'bg-gray-900/95 text-white border-gray-700'
      : 'bg-white text-gray-900 border-gray-200 shadow-lg';

  const itemClass =
    variant === 'white' ? 'hover:bg-white/10' : 'hover:bg-gray-100';

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        className={`${linkClass} cursor-pointer`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5 md:hidden"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="flex items-center gap-1">
          Ministerios
          <svg
            className={`hidden md:block w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <ul
          className={`absolute right-0 md:left-0 md:right-auto top-full mt-2 min-w-[200px] rounded-md border py-2 z-50 ${dropdownClass}`}
          role="menu"
        >
          {ministerios.map((ministerio) => {
            const href = getMinisterioHref(ministerio);
            const isExternal = href.startsWith('http');
            const className = `block px-4 py-2 text-sm whitespace-nowrap ${itemClass}`;

            return (
              <li key={ministerio.slug} role="none">
                {isExternal ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    className={className}
                    onClick={() => setOpen(false)}
                  >
                    {ministerio.name}
                  </a>
                ) : (
                  <Link
                    href={href}
                    role="menuitem"
                    className={className}
                    onClick={() => setOpen(false)}
                  >
                    {ministerio.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
