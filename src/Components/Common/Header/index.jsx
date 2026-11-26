import React from "react";
import { NavLink } from "react-router";
import Buttons from "./Fragments/Buttons";
import {
  TbBooks,
  TbHome,
  TbInfoCircle,
  TbPhoneCall,
  TbShoppingBag,
} from "react-icons/tb";
import CategoryMegaMenu from "./Fragments/CategoryMegaMenu";

const navLinks = [
  {
    to: "/",
    title: "خانه",
    icon: TbHome,
  },
  {
    to: "/articles",
    title: "مقالات",
    icon: TbBooks,
  },
  {
    to: "/about-us",
    title: "درباره ما",
    icon: TbInfoCircle,
  },
  {
    to: "/contact-us",
    title: "تماس با ما",
    icon: TbPhoneCall,
  },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-white"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-purple-600">
            <TbShoppingBag className="text-xl" />
          </span>

          <span>
            Purple<span className="text-purple-500">Shop</span>
          </span>
        </NavLink>

        <CategoryMegaMenu/>

        {/* Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ to, title, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
                  isActive
                    ? "bg-purple-600/10 text-purple-400 border-r-4 border-purple-400 rounded-r-none"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-purple-400"
                }`
              }
            >
              <Icon className="text-lg" />
              {title}
            </NavLink>
          ))}
        </div>

        {/* Buttons */}
        <Buttons />
      </nav>
    </header>
  );
};

export default Header;
