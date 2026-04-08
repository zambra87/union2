import Image from 'next/image';
import Link from 'next/link';
import { FooterIllo } from './shapes';
import { Facebook, Youtube, Instagram } from './icons';

export function Footer() {
  return (
    <div className="bg-gray">
      <div className="container mx-auto flex justify-between flex-col md:flex-row px-8 sm:px-0 py-32 text-white">
        <div className="md:pl-12">
          <div className="mb-8">
            <Image src="/logo-white.svg" width={146} height={73} alt="logo" />
          </div>
          <Link
            href="/dar"
            className="tracking-wider uppercase text-sm px-8 py-3 border border-white font-bold bg-transparent text-white transition duration-150 ease-in-out"
          >
            Dar
          </Link>
        </div>

        <div className="mt-8 md:mt-0 mb-8 md:mb-0 md:px-12">
          <p className="font-serif text-2xl my-4 font-medium md:mt-0">
            Reuniones
          </p>
          <p className="mb-4">
            <span className="font-bold text-lg block">Reunión general</span>
            Domingos a las 11:00 hrs
          </p>
          <p>
            <span className="font-bold text-lg block">
              Reuniones de oración
            </span>
            <span className="block">Domingos a las 10:00 hrs — Presencial</span>
            <span>Miércoles a las 20:00 hrs — Zoom</span>
          </p>
        </div>

        <div className="mb-8 md:mb-0">
          <p className="font-serif text-2xl my-4 font-medium md:mt-0">
            Contacto
          </p>
          <p className="mb-4">
            <span className="font-bold text-lg block">Teléfono</span> 32 2125033
          </p>
          <p>
            <span className="font-bold text-lg block">Celular / WhatsApp</span>
            <a
              className="underline"
              href="https://wa.me/56965696958"
              target="_blank"
              rel="noreferrer"
            >
              +56 9 6569 6958
            </a>
          </p>
        </div>
        <div className="md:px-12">
          <p className="font-serif text-2xl my-4 font-medium md:mt-0">
            Ubicación y horario
          </p>
          <a
            href="https://maps.app.goo.gl/X3dMb6e83VZgmR2b7?g_st=com.google.maps.preview.copy"
            target="_blank"
            rel="noreferrer"
            className="mb-4 inline-block underline"
          >
            Von Schroeders #356, Viña del mar, Chile
          </a>
          <p>
            <span className="font-bold text-lg block">Lunes a Viernes</span>
            9:00 a 14:00 hrs y 15:00 a 18:00 hrs
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <Link
          href="https://www.facebook.com/unionchurch.cl"
          target="_blank"
          rel="noreferrer"
        >
          <Facebook className="mr-8" />
        </Link>
        <Link
          href="https://www.instagram.com/unionchurch.cl/"
          target="_blank"
          rel="noreferrer"
        >
          <Instagram className="mr-8" />
        </Link>
        <Link
          href="https://www.youtube.com/c/UnionChurchcl"
          target="_blank"
          rel="noreferrer"
        >
          <Youtube />
        </Link>
      </div>
      <p className="text-white text-center mb-8">© Union Church 2025</p>
      <FooterIllo className="w-full bg-peach" />
    </div>
  );
}
