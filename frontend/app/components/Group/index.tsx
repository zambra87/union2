import Image from 'next/image';

type GroupProps = {
  title: string;
  description: string;
  link: string;
  image: string;
  colSpan: number;
};

export const Group = (props: GroupProps) => {
  return (
    <a
      href="#"
      className={`p-4 h-96 relative flex flex-col justify-center col-span-${props.colSpan} group overflow-hidden`}
    >
      <Image
        src={props.image}
        alt={props.title}
        fill={true}
        className="absolute top-0 right-0 object-cover -z-10 transition-all duration-300 group-hover:scale-105"
      />
      <div className="bg-black/30 backdrop-blur-3xl mask-to-t absolute bottom-0 left-0 w-full h-1/2 -z-0"></div>
      <div className="flex absolute bottom-0 left-0 w-full h-1/2 items-center justify-between px-8">
        <div className="basis-1/2 z-10">
          <h3 className="font-serif text-white text-4xl font-bold mb-2">
            {props.title}
          </h3>
          <p className="font-sans font-light text-white text-lg">
            {props.description}
          </p>
        </div>

        <a
          href={props.link}
          className="relative tracking-wider uppercase text-sm text-white font-bold flex items-center gap-2 px-4 py-2 bg-black/30 group-hover:bg-white group-hover:text-black transition-all duration-300 group-hover:pr-8"
        >
          Quiero unirme
          <svg
            className="absolute opacity-0 right-6 group-hover:opacity-100 group-hover:right-2 transition-all duration-300"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.3335 8.5H12.6668"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 3.8335L12.6667 8.50016L8 13.1668"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </a>
  );
};
