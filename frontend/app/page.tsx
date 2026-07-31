import { LatestShepperDesk, LatestServices } from './components/';
import horaciopatty from '@/public/images/horaciopatty.png';
import sign from '@/public/images/sign.png';
import { CircleFinal } from '@/app/components/shapes/CircleFinal';
import Newsletter from './components/Newsletter';
import Link from 'next/link';
import { Cover } from './components/Cover';
import { MinisteriosGrid } from './components/MinisteriosGrid';
import Image from 'next/image';

export default async function Home() {
  return (
    <>
      <Cover />
      <div className="container mx-auto mb-20 md:mb-40 px-8 sm:px-8">
        <div className="mt-20 flex justify-center items-center flex-col md:flex-row text-center md:text-left">
          <div className="mb-12 md:mb-0">
            <Image
              src={horaciopatty}
              alt="Horacio y Patty"
              width={382}
              height={300}
              placeholder="blur"
            />
          </div>
          <div className="md:ml-16 md:w-4/12">
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-gray-800 mb-8">
              Uniendo personas con propósito
            </p>
            <p className="font-xl text-gray-600 mb-8">
              Bienvenidos a Union Church. Somos una comunidad de La Viña que
              busca vivir los valores bíblicos, experimentando naturalmente lo
              sobrenatural. Te invitamos a vivir un encuentro con Jesús, a
              cultivar una relación de intimidad con Dios, tener relaciones
              significativas con otras personas, crecer y vivir la Palabra y
              extender el Reino de Dios con tu vida.
            </p>
            <div className="flex justify-center sm:block">
              <Image
                src={sign}
                alt="Horacio & Patty's Sign"
                width={217}
                height={57}
                placeholder="blur"
              />
            </div>
            <p>
              <span className="block font-bold">Pastores principales</span>
            </p>
          </div>
        </div>
      </div>

      <p className="text-lg font-sans sm:text-xl md:text-2xl text-gray-800 mb-2 text-center">
        Conoce nuestros ministerios
      </p>

      <MinisteriosGrid />

      <div className="px-8 sm:px-0 bg-pink-light" style={{ zIndex: '-1' }}>
        <div className="relative">
          <div className="container mx-auto mt-40 flex items-center">
            <div className="py-12 md:py-0">
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-gray-800 mb-4 font-">
                Hacemos iglesia presencial y en línea
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-12">
                ¡Juntos hacemos la iglesia!{' '}
              </p>
              <a
                href="https://www.youtube.com/c/UnionChurchcl"
                className="tracking-wider uppercase text-sm inline px-8 py-3 border border-primary font-bold bg-primary hover:bg-primary-dark text-white transition duration-150 ease-in-out"
              >
                Ir al canal de Youtube
              </a>
            </div>

            <CircleFinal className="opacity-0 hidden md:block" />
          </div>
          <CircleFinal className="absolute top-0 right-0 hidden md:block" />
        </div>
      </div>

      <div className="px-8 sm:px-0">
        <div className="container mx-auto text-center relative pb-20 md:pb-40 pt-10">
          <div className="flex items-center justify-between py-16">
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-gray-800">
              Últimos servicios
            </p>
            <a
              target="_blank"
              className="text-yellow-700 font-semibold border-b-4 flex items-center"
              href="https://youtube.com/playlist?list=PLV_Ax0JpimXPtD-QDqcygoAwERU0rvU82"
            >
              Ver todos
            </a>
          </div>
          <div className="flex flex-wrap flex-col sm:flex-row justify-between text-left pb-16 md:space-x-8">
            <LatestServices />
          </div>
          <div className="flex items-center justify-between py-16">
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-gray-800">
              Escritorio del pastor
            </p>
            <Link
              target="_blank"
              className="text-yellow-700	font-semibold border-b-4 flex items-center"
              href="https://youtube.com/playlist?list=PLV_Ax0JpimXPgTVH7fvCVC-2X0XQ6vorg"
            >
              Ver todos
            </Link>
          </div>
          <div className="flex flex-wrap flex-col lg:flex-row justify-between text-left lg:space-x-8">
            <LatestShepperDesk />
          </div>
        </div>
      </div>
      <div className="px-8 sm:px-0 pt-10 bg-pink-light">
        <div className="container mx-auto text-center pb-20 md:pb-40 pt-20 md:w-5/12">
          <p className="text-gray-300 text-9xl font-serif leading-3">“</p>
          <p className="font-bold text-xl sm:text-2xl md:text-3xl mb-12">
            Transformar la ciudad, influenciar al mundo, ayudar a las personas a
            conocer, amar y compartir a Jesús.
          </p>
          <Link
            href="/nosotros"
            className="tracking-wider uppercase text-sm inline px-8 py-3 font-bold bg-black hover:bg-gray-900 text-white transition duration-150 ease-in-out"
          >
            sobre Nosotros
          </Link>
        </div>
      </div>
      <div className="bg-oil">
        <div className="container mx-auto flex justify-between flex-col md:flex-row px-8 md:px-0 pt-20 pb-4 relative ">
          <div className="sm:px-12">
            <p className="font-sans uppercase text-white tracking-wider mb-4 font-bold text-center md:text-left">
              Mantente informado
            </p>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-white text-center md:text-left mb-4 md:pb-16">
              Suscríbete a nuestro <br />
              boletín de noticias
            </p>
          </div>
          <Newsletter />
        </div>
      </div>
    </>
  );
}
