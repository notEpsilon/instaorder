import { useState } from "react";
import Container from "./Container";

interface NavLink {
  title: string;
  path: string;
}

const navLinks: NavLink[] = [
  {
    title: "Services",
    path: "/services",
  },
  {
    title: "Pricing",
    path: "/pricing",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const Navbar: React.FC = () => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  return (
    <header className="sticky border-b border-[#eceef0] backdrop-blur backdrop-filter bg-opacity-80 h-16 z-50 top-0 inset-x-0 bg-[#f8f9fa]">
      <Container className="flex items-center justify-between relative">
        <span className="inline-flex items-center space-x-3">
          <img
            className="mt-1"
            width="32"
            height="32"
            src="/src/assets/logo.svg"
            alt="Logo"
          />
          <span className="font-extrabold tracking-tight text-3xl">
            instaorder
          </span>
        </span>
        <div className="space-x-5 hidden sm:block mr-20">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.path}
              className="hover:text-purple-500 transition-colors text-sm duration-200 font-medium"
            >
              {link.title}
            </a>
          ))}
        </div>
        <div className="hidden sm:block">
          <button className="inline-flex items-center text-center bg-purple-400 px-2.5 py-1 text-sm font-medium cursor-pointer hover:bg-purple-500 text-white transition ease-out duration-200 rounded outline-none lg:block shadow-sm">
            Sign in
          </button>
        </div>
        {menuOpened ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer mt-1 sm:hidden"
            onClick={() => setMenuOpened(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer mt-1 sm:hidden"
            onClick={() => setMenuOpened(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
        <div
          className={`bg-slate-100 rounded flex flex-col gap-4 shadow py-4 items-center top-full mt-4 absolute inset-x-0 ${
            menuOpened
              ? "flex opacity-100 transition-opacity duration-200 animate-fade-in"
              : "hidden opacity-0"
          }`}
        >
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.path}
              className="hover:text-purple-500 transition-colors text-sm duration-200 font-medium"
            >
              {link.title}
            </a>
          ))}
          <button className="inline-flex items-center text-center bg-purple-400 px-2.5 py-1 text-sm font-medium cursor-pointer hover:bg-purple-500 text-white transition ease-out duration-200 rounded outline-none lg:block shadow-sm">
            Sign in
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
