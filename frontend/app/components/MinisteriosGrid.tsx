import Link from 'next/link';
import Image from 'next/image';
import {
  getHomepageMinisterios,
  getMinisterioHref,
  getMinisterioLogoUrl,
  type MinisterioSummary,
} from '@/app/data/ministerios';

export function MinisteriosGrid() {
  const ministerios = getHomepageMinisterios();

  if (ministerios.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
      {ministerios.map((ministerio: MinisterioSummary) => {
        const href = getMinisterioHref(ministerio);
        const isExternal = href.startsWith('http');
        const logoUrl = getMinisterioLogoUrl(ministerio);
        const imageClass = ministerio.logoInvert
          ? 'invert object-contain hover:grayscale-0'
          : 'grayscale hover:grayscale-0 object-contain';

        const content = (
          <Image
            alt={ministerio.name}
            src={logoUrl}
            width={140}
            height={140}
            className={imageClass}
            unoptimized
          />
        );

        if (isExternal) {
          return (
            <a
              key={ministerio.slug}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[140px] h-[140px] flex items-center justify-center"
            >
              {content}
            </a>
          );
        }

        return (
          <Link
            key={ministerio.slug}
            href={href}
            className="w-[140px] h-[140px] flex items-center justify-center"
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}
