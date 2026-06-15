import Image from 'next/image';
import { MinistryData } from '@/app/types/ministry';

type MinistryPageProps = {
  data: MinistryData;
};

export function MinistryPage({ data }: MinistryPageProps) {
  return (
    <div className="bg-white">
      <section className="relative bg-pink-light p-0 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:h-[340px] xl:h-[375px]">
          <div className="order-2 lg:order-1 px-6 py-8 sm:px-8 lg:py-0 lg:w-[56%] lg:flex lg:flex-col lg:justify-center lg:px-16 xl:px-24">
            <p className="font-sans uppercase text-primary tracking-wider text-sm font-bold mb-4">
              {data.eyebrow}
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl text-gray-800 mb-6">
              {data.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              {data.intro}
            </p>
          </div>
          <div className="order-1 lg:order-2 relative w-full h-56 sm:h-64 lg:h-full lg:w-[44%] lg:min-h-0">
            <Image
              src={data.heroImage}
              alt={data.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 44vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 px-8 md:px-0 py-12 md:py-16 lg:py-20">
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl text-gray-800 mb-6">
              {data.description.title}
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              {data.description.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="bg-[#EAF3EE] p-8 md:p-10 h-fit">
            <div className="mb-8">
              <h3 className="font-serif text-2xl text-gray-800 mb-2">
                {data.sidebar.schedule.label}
              </h3>
              <p className="text-gray-600">{data.sidebar.schedule.value}</p>
            </div>

            <div className="mb-8">
              <h3 className="font-serif text-2xl text-gray-800 mb-2">
                {data.sidebar.location.label}
              </h3>
              <p className="text-gray-600">{data.sidebar.location.value}</p>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-gray-800 mb-4">
                {data.sidebar.leaders.label}
              </h3>
              <div className="flex flex-wrap gap-4">
                {data.sidebar.leaders.people.map((person, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mb-2">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    {person.name && (
                      <p className="text-sm text-gray-600">{person.name}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
