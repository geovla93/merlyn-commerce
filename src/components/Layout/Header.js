import Link from "next/link";
import { useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";

import NavList from "./NavList";
import useWidth from "../../hooks/useWidth";
import CartDropdown from "../CartDropdown/CartDropdown";

import { toggleCartHidden } from "../../store/cartSlice";

const Header = () => {
	const [navbarOpen, setNavbarOpen] = useState(false);
	const quantity = useSelector((state) => state.cart.quantity);
	const hidden = useSelector((state) => state.cart.hidden);
	const width = useWidth();
	const dispatch = useDispatch();

	const handleToggle = () => {
		dispatch(toggleCartHidden());
	};

	const handleMenuClick = () => {
		setNavbarOpen(!navbarOpen);
	};

	return (
		<header className="w-full flex h-20 items-center border-b bg-white shadow-md px-6 md:px-10 xl:px-14 space-x-4">
			<span className="flex-1">
				<Link href="/">
					<a className="text-xl font-bold leading-relaxed inline-block whitespace-nowrap uppercase p-2">
						Merlyn
					</a>
				</Link>
			</span>
			<NavList styles="hidden md:flex" />
			<span
				onClick={handleToggle}
				className="relative p-3 bg-black bg-opacity-10 hover:bg-black hover:bg-opacity-5 rounded-full cursor-pointer"
			>
				<ShoppingBagIcon className="h-9 w-9" />
				<span className="absolute inline-flex items-center justify-center top-0 right-0 h-5 w-5 rounded-full bg-black text-white text-sm">
					{quantity}
				</span>
			</span>
			{!hidden && <CartDropdown />}
			<button
				className="cursor-pointer text-xl leading-none p-2 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
				type="button"
				onClick={handleMenuClick}
			>
				<MenuIcon className="h-8 w-8" />
			</button>
			<div
				className={`${
					navbarOpen ? "" : "translate-x-full"
				} md:hidden absolute top-20 right-0 h-full w-52 bg-white border-l transform transition-transform duration-500 ease-in-out shadow-md z-75`}
			>
				<NavList styles="flex flex-col" />
			</div>
		</header>
	);
};

export default Header;
