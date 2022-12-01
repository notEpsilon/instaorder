import AnimateOnScroll from "../components/AnimateOnScroll";
import Card from "../components/Card";
import Colored from "../components/Colored";
import Container from "../components/Container";
import Typed from "react-typed";
import { ReactComponent as LineSVG } from "../assets/line.svg";

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
        {/* TODO: Min Height ? */}
        <div className="basis-1/3 bg-[url('/src/assets/wave.svg')] bg-contain bg-repeat-x" />
      </section>
      <section className="relative bg-[#f8f9fa]">
        <Container className="flex flex-col gap-y-7 sm:gap-x-7 sm:gap-y-0 sm:flex-row items-center sm:justify-between py-20">
          {cards.map((card, idx) => (
            <AnimateOnScroll key={idx}>
              <Card {...card} />
            </AnimateOnScroll>
          ))}
        </Container>
      </section>
      <section className="bg-[#f8f9fa] bg-[url('/src/assets/reflection.jpg')] bg-center bg-cover bg-no-repeat">
        <div className="bg-[url('/src/assets/layered-steps.svg')] bg-center bg-contain bg-transparent bg-repeat-x min-h-[300px]" />
        <Container className="pb-20">
          <AnimateOnScroll>
            <h2 className="text-5xl mb-5 font-extrabold drop-shadow">
              <Colored from="from-indigo-500" to="to-fuchsia-500">
                Improve
              </Colored>{" "}
              <Typed
                strings={["Customer", "User", "Employee", "Student"]}
                typeSpeed={65}
                backSpeed={50}
                loop
              />{" "}
              Experience
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll className="mb-5">
            <div className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 h-2 w-1/3" />
          </AnimateOnScroll>
          <AnimateOnScroll>
            {/*  */}
            <div className="flex py-10 gap-x-4">
              <div className="rounded basis-1/2">
                <LineSVG />
                {/*  */}
                <div>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Deserunt nemo animi itaque aliquam maxime, ullam vel aperiam
                    quasi deleniti sint asperiores sequi quidem accusantium,
                    veniam illo ratione, natus expedita. Sunt!
                  </p>
                </div>
                {/*  */}
              </div>
              <div className="left basis-1/2">
                <p className="font-medium text-gray-600 text-lg">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Error excepturi quibusdam veniam consectetur, sit, fugiat cum
                  beatae saepe reprehenderit facilis expedita? Nisi error
                  voluptatum accusantium dolores, saepe recusandae in aperiam!
                </p>
              </div>
            </div>
            {/*  */}
          </AnimateOnScroll>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
