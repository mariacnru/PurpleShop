import React, { useState } from 'react';
import {
  TbBooks,
  TbHome,
  TbInfoCircle,
  TbMenu2,
  TbPhoneCall,
  TbShoppingBag,
  TbX,
} from 'react-icons/tb';
import { Link, NavLink } from 'react-router';

const Mobile = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const navLinks = [
    {
      to: '/',
      title: 'خانه',
      icon: TbHome,
    },
    {
      to: '/articles',
      title: 'مقالات',
      icon: TbBooks,
    },
    {
      to: '/about-us',
      title: 'درباره ما',
      icon: TbInfoCircle,
    },
    {
      to: '/contact-us',
      title: 'تماس با ما',
      icon: TbPhoneCall,
    },
  ];

  const closeMenu = () => setOpenMenu(false);

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <header className="block md:hidden sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 px-4 py-3 backdrop-blur-md">
      <nav className="relative" aria-label="منوی اصلی">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* Menu Toggle */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={openMenu ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={openMenu}
            aria-controls="mobile-navigation"
            className="flex size-10 items-center justify-center rounded-lg text-zinc-300 transition-colors duration-200 hover:bg-zinc-800 hover:text-purple-400 focus-visible:outline-2 focus-visible:outline-purple-500"
          >
            {openMenu ? <TbX size={23} /> : <TbMenu2 size={23} />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 text-lg font-bold text-white"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-purple-600 shadow-lg shadow-purple-600/20">
              <TbShoppingBag className="text-xl" />
            </span>

            <span>
              Purple<span className="text-purple-500">Shop</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <div
          id="mobile-navigation"
          aria-hidden={!openMenu}
          className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${
            openMenu ? 'mt-3 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-1 border-t border-zinc-800 pt-3">
              {navLinks.map(({ to, title, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={closeMenu}
                  tabIndex={openMenu ? 0 : -1}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg border-r-4 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                        : 'border-transparent text-zinc-400 hover:bg-zinc-900 hover:text-white'
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{title}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Mobile;
