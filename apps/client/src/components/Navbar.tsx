import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../stores/useAuth";
import { trpc } from "../trpc/client.trpc";
import { ClientUser } from "../types/User";
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

const cLinks: NavLink[] = [
  {
    title: "owners",
    path: "/owners",
  },
  {
    title: "orders",
    path: "/orders",
  },
];

const oLinks: NavLink[] = [
  {
    title: "markets",
    path: "/",
  },
  {
    title: "orders",
    path: "/orderds",
  },
];

type Response = { msg: ClientUser; err: null } | { msg: null; err: null };

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const authState = useAuth();
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const userId = useAuth((state) => state.userId);
  const findUserQuery = useQuery(["findUser"], () =>
    trpc.users.findUser.query({ id: userId! })
  );

  const [{ msg: usr }, setCurrentUser] = useState<Response>({
    msg: null,
    err: null,
  });

  const loggedIn = useAuth((state) => state.loggedIn);

  const currUserQuery = useQuery(
    ["currUser"],
    () => trpc.auth.currUser.query(),
    {
      onSuccess: async (idContainer) => {
        if (idContainer) {
          const user = await trpc.users.findUser.query({
            id: idContainer.userId,
          });
          setCurrentUser(user);
        }
      },
    }
  );

  const logOut = async () => {
    await trpc.auth.logout.mutate();
    authState.setLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="sticky border-b border-[#eceef0] backdrop-blur backdrop-filter bg-opacity-80 h-16 z-50 top-0 inset-x-0 bg-[#f8f9fa]">
      <Container className="flex items-center justify-between relative">
        <Link to="/" className="inline-flex items-center space-x-3">
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
        </Link>
        <div className="space-x-5 hidden sm:block mr-20">
          {(loggedIn
            ? findUserQuery.data?.msg?.is_owner
              ? oLinks
              : cLinks
            : navLinks
          ).map((link, idx) => (
            <a
              key={idx}
              href={link.path}
              className="hover:text-purple-500 transition-colors text-sm duration-200 font-medium"
            >
              {link.title}
            </a>
          ))}
        </div>
        {!loggedIn && (
          <div className="hidden sm:block">
            <Link
              to="/login"
              className="inline-flex items-center text-center bg-purple-400 px-2.5 py-1 text-sm font-medium cursor-pointer hover:bg-purple-500 text-white transition ease-out duration-200 rounded outline-none lg:block shadow-sm"
            >
              Sign in
            </Link>
          </div>
        )}
        {loggedIn && usr && (
          <div className="space-x-4 hidden sm:flex items-center">
            <span>{usr.username}</span>
            <button
              className="bg-red-400 font-medium text-sm text-center text-white rounded px-4 py-1.5 shadow-sm"
              onClick={logOut}
            >
              Sign out
            </button>
          </div>
        )}
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
          {loggedIn ? (
            <div className="flex flex-col items-center space-y-2">
              <span>{usr?.username}</span>
              <button
                className="bg-red-400 font-medium text-sm text-center text-white rounded px-4 py-1.5 shadow-sm"
                onClick={logOut}
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/register"
              className="inline-flex items-center text-center bg-purple-400 px-2.5 py-1 text-sm font-medium cursor-pointer hover:bg-purple-500 text-white transition ease-out duration-200 rounded outline-none lg:block shadow-sm"
            >
              Sign in
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
