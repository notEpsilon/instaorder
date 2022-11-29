import Container from "./Container";

interface NavLink {
  title: string;
  path: string;
}

const navLinks: NavLink[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Services",
    path: "/services",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const Navbar: React.FC = () => {
  return (
    <header className="sticky border-b border-[#eceef0] backdrop-blur backdrop-filter bg-opacity-80 h-16 z-50 top-0 inset-x-0 bg-[#f8f9fa]">
      <Container className="flex items-center justify-between">
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
        <div className="space-x-4">
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
        <div>
          <button className="inline-flex items-center text-center bg-purple-400 px-2.5 py-1 text-sm font-medium cursor-pointer hover:bg-purple-500 text-white transition ease-out duration-200 rounded outline-none lg:block shadow-sm">
            Sign in
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
