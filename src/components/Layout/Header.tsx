import Link from "next/link";
import { useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/solid";

import NavList from "./NavList";
import CartDropdown from "../CartDropdown/CartDropdown";
import useCart from "../../hooks/useCart";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { quantity, cartHidden: hidden, toggleCartHidden } = useCart();

  const handleToggle = () => toggleCartHidden();

  const handleMenuClick = () => setNavbarOpen((prevValue) => !prevValue);

  return (
    <header className="flex h-20 w-full items-center space-x-4 border-b bg-white px-6 shadow-md md:px-10 xl:px-14">
      <span className="flex-1">
        <Link href="/">
          <a className="inline-block whitespace-nowrap p-2 text-xl font-bold uppercase leading-relaxed">
            Merlyn
          </a>
        </Link>
      </span>
      <NavList style="hidden md:flex" />
      <span
        onClick={handleToggle}
        className="relative cursor-pointer rounded-full bg-black bg-opacity-10 p-3 hover:bg-black hover:bg-opacity-5"
      >
        <ShoppingBagIcon className="h-9 w-9" />
        <span className="absolute top-0 right-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black text-sm text-white">
          {quantity}
        </span>
      </span>
      {!hidden && <CartDropdown />}
      <button
        className="block cursor-pointer rounded border border-solid border-transparent bg-transparent p-2 text-xl leading-none outline-none focus:outline-none md:hidden"
        type="button"
        onClick={handleMenuClick}
      >
        <MenuIcon className="h-8 w-8" />
      </button>
      <div
        className={`${
          navbarOpen ? "" : "translate-x-full"
        } absolute top-20 right-0 z-75 h-full w-52 transform border-l bg-white shadow-md transition-transform duration-500 ease-in-out md:hidden`}
      >
        <NavList style="flex flex-col" />
      </div>
    </header>
  );
};

export default Header;
