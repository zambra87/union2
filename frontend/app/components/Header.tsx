'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLive } from '@/app/contexts/LiveContext';
import { Sensor } from './icons';

type HeaderProps = {
  variant?: 'white' | 'black';
};

export function Header({ variant = 'white' }: HeaderProps) {
  const { isLive } = useLive();

  const headerClass =
    variant === 'white'
      ? 'bg-gradient-to-b from-gray-900 filter to-transparent w-full py-4 md:py-10 absolute top-0 '
      : 'bg-pink w-full py-4 md:py-10';

  const linkClass =
    variant === 'white'
      ? 'gap-1 flex flex-col md:flex-row items-center text-white text-md md:text-lg border-transparent border-b-4 md:hover:border-white'
      : 'gap-1 flex flex-col md:flex-row items-center text-black text-md md:text-lg border-transparent border-b-4 md:hover:border-black';

  const logoClass = variant === 'white' ? '/logo-white.svg' : '/logo-black.svg';

  const borderColor =
    variant === 'white' ? 'border-gray-100/[0.3]' : 'border-gray-900/[0.1]';

  return (
    <div className={headerClass} style={{ zIndex: 1 }}>
      <nav className="container mx-auto md:px-0 md:flex flex-row items-center justify-between">
        <div
          className={`px-4 flex items-center gap-4 basis-full md:basis-auto grow border-b-1 ${borderColor} md:border-b-0 pb-4 md:pb-0 md:border-none`}
        >
          <Link href="/">
            <Image
              alt="Logo"
              src={logoClass}
              className="w-28 sm:w-32 md:w-40"
              height="57"
              width="145"
            />
          </Link>
          {isLive && (
            <a
              href="https://www.youtube.com/@unionchurch"
              className="flex bg-red-500 items-center gap-2 rounded-full px-4 py-2 text-white hover:bg-red-600 transition-colors duration-300"
            >
              <Sensor className="w-6 h-6" />
              <span>VIVO</span>
            </a>
          )}
        </div>
        <div className="flex gap-4 px-4 pt-4 md:pt-0 justify-between md:justify-normal">
          <Link href="/nosotros" className={linkClass}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 md:hidden"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Nosotros</span>
          </Link>
          <Link href="/dar" className={linkClass}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 md:hidden"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 20.0872H8.61029C8.95063 20.0872 9.28888 20.1277 9.61881 20.2087L12.3769 20.8789C12.9753 21.0247 13.5988 21.0389 14.2035 20.9214L17.253 20.3281C18.0585 20.1712 18.7996 19.7855 19.3803 19.2205L21.5379 17.1217C22.154 16.5234 22.154 15.5524 21.5379 14.9531C20.9832 14.4135 20.1047 14.3527 19.4771 14.8103L16.9626 16.6449C16.6025 16.9081 16.1643 17.0498 15.7137 17.0498H13.2855L14.8311 17.0498C15.7022 17.0498 16.4079 16.3633 16.4079 15.5159V15.2092C16.4079 14.5055 15.9156 13.892 15.2141 13.7219L12.8286 13.1418C12.4404 13.0476 12.0428 13 11.6431 13C10.6783 13 8.93189 13.7988 8.93189 13.7988L6 15.0249M2 14.6L2 20.4C2 20.9601 2 21.2401 2.10899 21.454C2.20487 21.6422 2.35785 21.7951 2.54601 21.891C2.75992 22 3.03995 22 3.6 22H4.4C4.96005 22 5.24008 22 5.45399 21.891C5.64215 21.7952 5.79513 21.6422 5.89101 21.454C6 21.2401 6 20.9601 6 20.4V14.6C6 14.04 6 13.7599 5.89101 13.546C5.79513 13.3579 5.64215 13.2049 5.45399 13.109C5.24008 13 4.96005 13 4.4 13H3.6C3.03995 13 2.75992 13 2.54601 13.109C2.35785 13.2049 2.20487 13.3579 2.10899 13.546C2 13.7599 2 14.04 2 14.6ZM17.1914 3.59227C16.5946 2.34341 15.2186 1.6818 13.8804 2.32039C12.5423 2.95898 11.9722 4.4734 12.5325 5.80284C12.8787 6.62448 13.8707 8.22002 14.5781 9.31905C14.8394 9.72513 14.9701 9.92817 15.161 10.0469C15.3247 10.1488 15.5297 10.2037 15.7224 10.1974C15.9471 10.1899 16.1618 10.0794 16.5911 9.85845C17.7532 9.26033 19.4101 8.37457 20.1208 7.83614C21.2707 6.96494 21.5556 5.36359 20.6947 4.14626C19.8337 2.92892 18.3327 2.80914 17.1914 3.59227Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Dar</span>
          </Link>
          <a
            href="https://www.youtube.com/watch?v=FPj6ImgwN3k&list=PLV_Ax0JpimXPgTVH7fvCVC-2X0XQ6vorg"
            className={linkClass}
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
                d="M2 7.625C2 9.90317 3.84683 11.75 6.125 11.75C6.43089 11.75 6.58383 11.75 6.66308 11.7773C6.82888 11.8345 6.91545 11.9211 6.97266 12.0869C7 12.1662 7 12.2903 7 12.5386V18.875C7 19.7725 7.72754 20.5 8.625 20.5C9.52246 20.5 10.25 19.7725 10.25 18.875V7.625C10.25 5.34683 8.40317 3.5 6.125 3.5C3.84683 3.5 2 5.34683 2 7.625Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 7.625C22 9.90317 20.1532 11.75 17.875 11.75C17.5691 11.75 17.4162 11.75 17.3369 11.7773C17.1711 11.8345 17.0845 11.9211 17.0273 12.0869C17 12.1662 17 12.2903 17 12.5386V18.875C17 19.7725 16.2725 20.5 15.375 20.5C14.4775 20.5 13.75 19.7725 13.75 18.875V7.625C13.75 5.34683 15.5968 3.5 17.875 3.5C20.1532 3.5 22 5.34683 22 7.625Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Escritorio</span>
          </a>
          <a
            href="https://www.youtube.com/watch?v=jgr2c_Tob7I&list=PLV_Ax0JpimXPtD-QDqcygoAwERU0rvU82"
            className={linkClass}
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
                d="M21.5813 7.19989C21.4733 6.76846 21.2534 6.37318 20.9438 6.05395C20.6341 5.73473 20.2457 5.50287 19.8178 5.3818C18.2542 5 12 5 12 5C12 5 5.74578 5 4.18222 5.41816C3.75429 5.53923 3.36588 5.77109 3.05623 6.09031C2.74659 6.40954 2.52666 6.80482 2.41868 7.23625C2.13253 8.82303 1.99255 10.4327 2.00052 12.0451C1.99032 13.6696 2.1303 15.2916 2.41868 16.8903C2.53773 17.3083 2.76258 17.6886 3.0715 17.9943C3.38043 18.3 3.76299 18.5209 4.18222 18.6357C5.74578 19.0538 12 19.0538 12 19.0538C12 19.0538 18.2542 19.0538 19.8178 18.6357C20.2457 18.5146 20.6341 18.2827 20.9438 17.9635C21.2534 17.6443 21.4733 17.249 21.5813 16.8176C21.8653 15.2427 22.0052 13.6453 21.9995 12.0451C22.0097 10.4206 21.8697 8.79862 21.5813 7.19989Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.75 9.46533C9.75 8.98805 9.75 8.74941 9.84974 8.61618C9.93666 8.50008 10.0697 8.42744 10.2144 8.4171C10.3804 8.40525 10.5811 8.53429 10.9826 8.79239L14.9254 11.3271C15.2738 11.551 15.448 11.663 15.5082 11.8054C15.5607 11.9298 15.5607 12.0702 15.5082 12.1946C15.448 12.337 15.2738 12.449 14.9254 12.6729L10.9826 15.2076C10.5811 15.4657 10.3804 15.5948 10.2144 15.5829C10.0697 15.5726 9.93666 15.4999 9.84974 15.3838C9.75 15.2506 9.75 15.012 9.75 14.5347V9.46533Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Servicios</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
