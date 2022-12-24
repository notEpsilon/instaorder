import AnimateOnScroll from "../components/AnimateOnScroll";
import Card from "../components/Card";
import Colored from "../components/Colored";
import Container from "../components/Container";
import Typed from "react-typed";
import { ReactComponent as LineSVG } from "../assets/line.svg";
import { ReactComponent as BlueSVG } from "../assets/blue.svg";

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

const LandingPage: React.FC = () => {
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
        <Container className="flex flex-col gap-y-7 sm:gap-x-7 sm:gap-y-0 sm:flex-row items-center sm:justify-between py-28">
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
          <div>
            <div className="flex py-10 gap-x-4">
              <div className="basis-1/2">
                <AnimateOnScroll>
                  <LineSVG />
                </AnimateOnScroll>
                <div>
                  <AnimateOnScroll className="flex space-x-4">
                    <div className="mt-2 flex flex-col items-center justify-between -ml-0.5 min-h-[19rem]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-9"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                        />
                      </svg>
                      <div className="h-full mt-2 w-[0.22rem] rounded rrr bg-gradient-to-b from-purple-400 to-blue-600" />
                    </div>
                    <div className="basis-full">
                      <Colored
                        from="from-purple-500"
                        to="to-pink-500"
                        className="text-3xl font-bold drop-shadow pb-1 block mb-1"
                      >
                        Productivity
                      </Colored>
                      <p className="font-medium text-lg drop-shadow-sm">
                        <Colored
                          from="from-purple-500"
                          to="to-pink-500"
                          className="italic"
                        >
                          Accelerate productivity in employee workflow.
                        </Colored>{" "}
                        with instaorder no more important time is wasted.
                      </p>
                    </div>
                  </AnimateOnScroll>
                </div>
                <div>
                  <AnimateOnScroll className="flex space-x-4">
                    <div className="mt-2 flex flex-col items-center justify-between -ml-0.5 min-h-[35rem] relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-9"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="h-full mt-2 w-[0.22rem] rounded bg-gradient-to-b from-blue-500 via-blue-400 to-teal-500" />
                      <div className="absolute max-h-full min-h-full top-14 left-3.5">
                        <div className="flex items-center min-w-[20rem]">
                          <BlueSVG className="basis-1/4" />
                          <p className="font-bold drop-shadow basis-3/4 space-x-3">
                            <Colored
                              from="from-blue-600"
                              to="to-sky-500"
                              className="italic"
                            >
                              Get the point?
                            </Colored>
                            <button className="rounded outline-none focus:outline-none border-2 border-blue-500 text-sm px-4 py-2 hover:text-white hover:bg-blue-500 transition-colors duration-200">
                              Sign up now
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-full">
                      <Colored
                        from="from-blue-600"
                        to="to-cyan-400"
                        className="text-3xl font-bold drop-shadow pb-1 block mb-1"
                      >
                        Convenience
                      </Colored>
                      <p className="font-medium text-lg drop-shadow-sm">
                        <Colored
                          from="from-blue-600"
                          to="to-sky-500"
                          className="italic"
                        >
                          Lift customers convenience with ease.
                        </Colored>{" "}
                        with instaorder drop-in design no need for
                        configuration.
                      </p>
                    </div>
                  </AnimateOnScroll>
                </div>
                <div>
                  <AnimateOnScroll className="flex space-x-4">
                    <div className="mt-2 flex flex-col items-center justify-between -ml-0.5 min-h-[19rem]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-9"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>

                      <div className="h-full mt-2 w-[0.22rem] rounded rrr bg-gradient-to-b from-teal-500 to-teal-400" />
                    </div>
                    <div className="basis-full">
                      <Colored
                        from="from-teal-500"
                        to="to-teal-300"
                        className="text-3xl font-bold drop-shadow pb-1 block mb-1"
                      >
                        Availability
                      </Colored>
                      <p className="font-medium text-lg drop-shadow-sm">
                        <Colored
                          from="from-teal-500"
                          to="to-teal-500"
                          className="italic"
                        >
                          Instantly increase availability of your employees.
                        </Colored>{" "}
                        instaorder is designed to introduce smoother workflow.
                      </p>
                    </div>
                  </AnimateOnScroll>
                </div>
              </div>
              <div className="right basis-1/2">
                {/* fill with something ? */}
              </div>
            </div>
            {/*  */}
          </div>
        </Container>
      </section>
      <section className="bg-[#f8f9fa] bg-[url('/src/assets/reflection.jpg')] bg-center bg-cover bg-no-repeat">
        <div className="bg-[url('/src/assets/green-wave.svg')] bg-center bg-contain bg-transparent bg-repeat-x min-h-[300px]" />
        <Container className="pb-20">
          <AnimateOnScroll>
            <h2 className="text-5xl mb-5 font-extrabold drop-shadow">
              <Colored from="from-emerald-500" to="to-cyan-500">
                How
              </Colored>{" "}
              Does It Work?
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll className="mb-5">
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 w-1/3" />
          </AnimateOnScroll>
          <div className="flex flex-col gap-y-7 sm:gap-x-7 sm:gap-y-0 sm:flex-row items-center sm:justify-between py-20">
            <AnimateOnScroll>
              <Card
                title="1. Integrate"
                body="Integrate our service at your workplace and start being rapid."
                grad="green"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <Card
                title="2. Prepay"
                body="have a balance in your wallet for your favorite food providers."
                grad="green"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <Card
                title="3. Order"
                body="Instantly order from anywhere without wasting time waiting for your order."
                grad="green"
              />
            </AnimateOnScroll>
          </div>
        </Container>
      </section>
      <footer className="bg-[#f9fafc] border-t border-t-gray-300">
        <Container className="flex items-center justify-between py-5">
          <span className="text-xs font-medium">
            Copyright &#169; Instaorder | All rights reserved
          </span>
          <img
            width="32"
            height="32"
            src="/src/assets/logo.svg"
            loading="lazy"
          />
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
