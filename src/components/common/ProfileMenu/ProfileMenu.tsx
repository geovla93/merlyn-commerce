import { FC, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, LogoutIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import cn from 'classnames';
import { signOut } from 'next-auth/react';

import slugify from '@/utils/slugify';

type Props = {
  name: string;
};

const ProfileMenu: FC<Props> = ({ name }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {name}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-indigo-100 hover:text-indigo-50"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={'/profile/' + slugify(name)}
                  className={cn(
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    {
                      'bg-indigo-500 text-white': active,
                      'text-gray-900': !active,
                    },
                  )}
                >
                  {name}
                </Link>
              )}
            </Menu.Item>
          </div>

          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={cn(
                    'group flex w-full items-center gap-x-2 rounded-md px-2 py-2 text-sm',
                    {
                      'bg-indigo-500 text-white': active,
                      'text-gray-900': !active,
                    },
                  )}
                  onClick={() => signOut()}
                >
                  <LogoutIcon className="h-5 w-5" aria-hidden="true" />
                  Log Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileMenu;
