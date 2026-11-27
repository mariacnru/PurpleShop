
import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { HiShoppingCart } from "react-icons/hi2";
import { IoCall } from "react-icons/io5";
import authContext from "../../../../context/authContext";

const Buttons = () => {
  const { user, isLoading } = useContext(authContext);

  return (
    <div className="flex shrink-0 items-center gap-2">

      {/* Cart */}
      <NavLink
        to="/cart"
        aria-label="سبد خرید"
        className={({ isActive }) =>
          `flex size-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-purple-500 ${
            isActive
              ? "border-purple-800/50 bg-purple-500/10 text-purple-400"
              : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-purple-500/50 hover:text-purple-400"
          }`
        }
      >
        <HiShoppingCart className="text-xl" />
      </NavLink>

      {/* Authentication */}
      {isLoading ? (
        <div className="h-10 w-24 animate-pulse rounded-lg bg-zinc-800" />
      ) : user ? (
        <Link
          to="/dashboard"
          className="shrink-0 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-purple-400"
        >
          پنل کاربری
        </Link>
      ) : (
        <Link
          to="/auth"
          className="shrink-0 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-purple-400"
        >
          ورود | ثبت نام
        </Link>
      )}

      {/* Contact */}
      <Link
        to="/contact-us"
        aria-label="تماس با ما"
        className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:border-purple-500/50 hover:text-purple-400 focus-visible:outline-2 focus-visible:outline-purple-500 sm:h-10 sm:w-auto sm:px-4"
      >
        <IoCall className="text-lg sm:hidden" />
        <span className="hidden sm:block text-nowrap">
          تماس با ما
        </span>
      </Link>
    </div>
  );
};

export default Buttons;
