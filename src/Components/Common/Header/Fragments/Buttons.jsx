import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { HiShoppingCart } from "react-icons/hi2";
import authContext from "../../../../context/authContext";

const Buttons = () => {
  const { user, isLoading } = useContext(authContext);
  return (
    <div className="flex items-center gap-2">
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `flex size-10 items-center justify-center rounded-lg border transition
    ${
      isActive
        ? "border-purple-800/50 bg-purple-500/10 text-purple-400"
        : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-purple-500/50 hover:text-purple-400"
    }`
        }
      >
        <HiShoppingCart className="text-xl" />
      </NavLink>
      {isLoading ? (
        <span>درحال بارگذاری</span>
      ) : user ? (
        <Link className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-500">
          پنل کاربری
        </Link>
      ) : (
        <Link
          to="/auth"
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-500"
        >
          ورود | ثبت نام
        </Link>
      )}

      <Link
        to="/contact-us"
        className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-purple-500/50 hover:text-purple-400"
      >
        تماس با ما
      </Link>
    </div>
  );
};

export default Buttons;
