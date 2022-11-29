import Container from "../components/Container";

const HomePage: React.FC = () => {
  return (
    <div className="bg-[#f8f9fa]">
      <section className="h-[calc(100vh-4rem)] flex flex-col relative">
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
        <div className="basis-1/3 bg-[url('/src/assets/wave.svg')] bg-contain bg-repeat-x inset-x-0 bottom-0" />
      </section>
    </div>
  );
};

export default HomePage;
