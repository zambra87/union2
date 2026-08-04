import { Header } from './Header';

function CoverHeroText() {
  return (
    <div>
      <p className="text-center font-semibold drop-shadow-lg text-white font-sans text-5xl mb-2 md:text-6xl lg:text-7xl">
        Union Church
      </p>
      <p className="text-center text-white drop-shadow-lg font-serif text-3xl mb-5 md:text-2xl lg:text-3xl">
        Bienvenido a Casa
      </p>
    </div>
  );
}

export function Cover() {
  return (
    <div className="relative h-screen overflow-x-hidden">
      <div
        className="absolute inset-0 bg-no-repeat bg-scroll bg-[length:auto_155%] bg-[center_72%] md:bg-cover md:bg-fixed md:bg-top"
        style={{ backgroundImage: "url('/images/cover.jpg')" }}
      />
      <div className="relative z-[1] flex h-full flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center px-8">
          <CoverHeroText />
        </div>
      </div>
    </div>
  );
}
