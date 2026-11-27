import React, { useState } from 'react';
import { NavLink } from 'react-router';
import Buttons from './Buttons';
import CategoryMegaMenu from './CategoryMegaMenu';
import {
  TbBooks,
  TbHome,
  TbInfoCircle,
  TbPhoneCall,
  TbShoppingBag,
  TbMenu2,
  TbX,
} from 'react-icons/tb';

const navLinks = [
  { id: 1, to: '/', title: 'خانه', icon: TbHome },
  { id: 2, to: '/articles', title: 'مقالات', icon: TbBooks },
  { id: 3, to: '/about-us', title: 'درباره ما', icon: TbInfoCircle },
  { id: 4, to: '/contact-us', title: 'تماس با ما', icon: TbPhoneCall },
];

const Desktop = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 hidden w-full border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl md:block">
      <nav className="flex justify-between items-center p-2">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-white">
          <span className="flex size-9 items-center justify-center rounded-lg bg-purple-600">
            <TbShoppingBag className="text-xl" />
          </span>

          <span>
            purple<span className="text-purple-500">Shop</span>
          </span>
        </NavLink>

        <CategoryMegaMenu />

        <div className="flex items-center gap-2">
          {navLinks.map(({ id, to, title, icon: Icon }) => (
            <NavLink
              key={id}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 text-sm transition-all duration-200 ${
                  isActive
                    ? 'text-purple-400 border-r-4'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-purple-400'
                }`
              }
            >
              <Icon size={20} />
              <span>{title}</span>
            </NavLink>
          ))}
        </div>

        {/* Buttons */}
        <Buttons />
      </nav>
    </header>
  );
};

export default Desktop;
