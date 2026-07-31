import { Header } from '../components';
import { promises as fs } from 'fs';
import path from 'path';
import CopyData from '../components/BankData';

async function getData() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'app', 'dar', 'data.json');
    const fileContents = await fs.readFile(jsonDirectory, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return {};
  }
}
export default async function Give() {
  const data = await getData();
  return (
    <>
      <Header variant="black" />
      <div className="bg-pink">
        <div className="container mx-auto flex justify-between flex-col md:flex-row px-8 md:px-0 pt-16 md:pt-16 relative ">
          <div className="md:pb-40 md:pt-32">
            <p className="font-sans uppercase text-gray-500 tracking-wider mb-4 font-bold md:text-left">
              Dar
            </p>
            <p className="font-serif text-4xl lg:text-5xl text-gray-800 md:text-left mb-8">
              Gracias por invertir <br />
              en el Reino
            </p>
            <p className="text-gray-500 font-normal text-xl md:w-1/2 mb-8">
              Los diezmos y las ofrendas de los miembros, participantes y amigos
              de esta Comunidad de fe, Union Church, son la única fuente de
              recursos financieros para llevar adelante y extender la obra.
            </p>
            <p className="text-gray-500 font-normal text-xl md:w-1/2 mb-8">
              Creemos que Dios es dueño de todo, absolutamente todo y eso
              incluye nuestra vida, tiempo y recursos de toda naturaleza. Como
              consecuencia de ello nos consideramos administradores o mayordomos
              de estos recursos.
            </p>
            <p className="text-gray-500 font-normal text-xl md:w-1/2 mb-8">
              Creemos que los diezmos deben ser entregados totalmente, con
              alegría y generosidad, en la comunidad donde estamos plantados y o
              arraigados, y en consecuencia donde nos alimentamos, crecemos y
              damos fruto. Los recursos serán destinados a la obra, sus
              misiones, proyectos, mantención y crecimiento.
            </p>
            <p className="text-gray-500 font-normal text-xl md:w-1/2">
              Puedes hacer llegar tus diezmos, ofrendas y donaciones depositando
              o transfiriendo a la cuenta de la Corporación Iglesia Union.
            </p>

            <CopyData accountData={data} />
          </div>
        </div>
      </div>
    </>
  );
}
