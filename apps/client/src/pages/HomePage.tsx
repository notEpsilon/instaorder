import Card from "../components/Card";
import Container from "../components/Container";

interface ICard {
  title: string;
  body: string;
}

const cards: ICard[] = [
  {
    title: "Blazingly fast orders",
    body: "Don't wait for your order again, instantly catch it. with the option to pre-pay your order so you don't have to when you actually order.",
  },
  {
    title: "Drop-in solution",
    body: "Don't wait for your order again, instantly catch it. with the option to pre-pay your order so you don't have to when you actually order.",
  },
  {
    title: "Don't waste your time",
    body: "Don't wait for your order again, instantly catch it. with the option to pre-pay your order so you don't have to when you actually order.",
  },
];

const HomePage: React.FC = () => {
  return (
    <div>
      <section className="h-[calc(100vh-4rem)] flex flex-col relative bg-[#f8f9fa] z-0">
        <div className="absolute inset-0 -z-50 bg-[url('/src/assets/grid.svg')] filter blur-[1.8px]" />
        <Container className="py-20 basis-2/3">
          <h1 className="text-7xl mb-2.5 font-extrabold drop-shadow text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent leading-[1.295]">
            Order From Anywhere!
          </h1>
          <p className="text-xl mb-10 font-medium text-gray-400 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            cupiditate magnam ut aliquid consequatur illo voluptatibus nostrum
            voluptates, ab laborum!
          </p>
          <div className="flex justify-center space-x-6">
            <button className="inline-flex items-center text-center bg-purple-400 px-4 py-1.5 text-sm font-medium cursor-pointer hover:bg-purple-500 text-white transition ease-out duration-200 rounded outline-none lg:block shadow-sm">
              Get started
            </button>
            <button className="inline-flex items-center text-center bg-black px-4 py-1.5 text-sm font-medium cursor-pointer hover:bg-slate-800 text-white transition ease-out duration-200 rounded outline-none lg:block shadow-sm">
              Learn more
            </button>
          </div>
        </Container>
        <div className="basis-1/3 bg-[url('/src/assets/wave.svg')] bg-contain bg-repeat-x" />
      </section>
      <section className="relative bg-[#f8f9fa]">
        <Container className="flex flex-col gap-7 sm:flex-row items-center sm:justify-between py-20">
          {cards.map((card, idx) => (
            <Card key={idx} {...card} />
          ))}
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
