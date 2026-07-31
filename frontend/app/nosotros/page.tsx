import { Adn, Vision } from '../components/shapes';
import { Heart } from '../components/icons';
import { Header } from '../components';
import { promises as fs } from 'fs';
import path from 'path';

async function getData() {
  try {
    const jsonDirectory = path.join(
      process.cwd(),
      'app',
      'nosotros',
      'data.json'
    );
    const fileContents = await fs.readFile(jsonDirectory, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return [];
  }
}

export default async function About() {
  const data = await getData();

  const attributesRender = data.map((group: string[], index: number) => {
    return (
      <div className="flex space-y-4 flex-col" key={index}>
        {group.map((quote, index) => {
          return (
            <div
              key={index}
              className="flex p-4 bg-black/[var(--bg-opacity)] [--bg-opacity:10%]"
            >
              <Heart className="mr-4" />
              <p className="font-xl text-white mb-2">{quote}</p>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <>
      <Header variant="black" />
      <div className="bg-pink">
        <div className="relative h-[380px] md:h-[520px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed grayscale"
            style={{ backgroundImage: "url('/images/nosotros-hero-bw.png')" }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/25">
            <p className="font-serif text-4xl lg:text-5xl text-white text-center">
              Nosotros
            </p>
          </div>
        </div>

        <div className="relative z-10 bg-pink -mt-10 md:-mt-16 pt-10 md:pt-16">
          <div className="container mx-auto pb-16 md:pb-24 px-8 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 text-center md:text-left">
              <div>
                <Adn className="mb-8 mx-auto md:mx-0" />
                <p className="text-xl text-gray-800 font-medium mb-4">Misión</p>
                <p className="text-lg text-gray-600">
                  Conocer, llegar a ser, e impactar como Jesús
                </p>
              </div>

              <div>
                <Vision className="mb-8 mx-auto md:mx-0" />
                <p className="text-xl text-gray-800 font-medium mb-4">Visión</p>
                <p className="text-lg text-gray-600">
                  Transformar la ciudad, influenciar al mundo, ayudar a las
                  personas a conocer, amar y compartir a Jesús.
                </p>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/recursos/confesion.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="tracking-wider uppercase text-sm inline px-8 py-3 font-bold bg-black hover:bg-gray-900 text-white transition duration-150 ease-in-out"
              >
                Confesión y valores
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-oil pt-20 pb-20">
        <div className="container mx-auto w-full px-8 md:px-0">
          <p className="font-serif text-4xl lg:text-5xl text-white mb-8 text-center">
            Vemos y anhelamos ser una Iglesia
          </p>
          <p className="font-xl text-white mb-16 text-center">
            Transformar la ciudad, influenciar al mundo, ayudar a las personas a
            conocer, amar y compartir a Jesús.
          </p>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 justify-center">
            {attributesRender}
          </div>
        </div>
      </div>
    </>
  );
}
