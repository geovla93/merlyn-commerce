import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/outline';
import { MenuIcon, SearchIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';

import MobileMenu from '@/components/common/MobileMenu';
import useCart from '@/features/cart/hooks/useCart';
import ProfileMenu from '../ProfileMenu';

const Header = () => {
  const [open, setOpen] = useState(false);
  const { quantity } = useCart();
  const { data: session } = useSession();

  return (
    <header className="bg-white">
      <MobileMenu open={open} setOpen={setOpen} />

      <div className="relative border-b border-gray-200 bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $50
        </p>
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="flex h-16 items-center">
            <button
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link href="/">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </Link>
            </div>

            <div className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                <Link
                  href="/shop"
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Store
                </Link>
                <Link
                  href="/about"
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Company
                </Link>
              </div>
            </div>

            <div className="ml-auto flex items-center">
              <div className="lg:flex-items-center hidden lg:flex lg:flex-1 lg:justify-end lg:space-x-6">
                {session ? (
                  <ProfileMenu name={session.user.name} />
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link
                      href="/auth/signup"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Create account
                    </Link>
                  </>
                )}
              </div>

              {/* Search */}
              <div className="flex lg:ml-6">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <SearchIcon className="h-6 w-6" aria-hidden="true" />
                </a>
              </div>

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link
                  href="/checkout"
                  className="group -m-2 flex items-center p-2"
                >
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {quantity}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
