import { Dispatch, FC, Fragment, SetStateAction, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { LogoutIcon, XIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';

import slugify from '@/utils/slugify';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileMenu: FC<Props> = ({ open, setOpen }) => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      if (open) {
        setOpen(false);
      }
    });
  }, [open, router.events, setOpen]);

  return (
    <Transition.Root as={Fragment} show={open}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="px-4 pt-5 pb-2">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:outline-none"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                <div className="flow-root">
                  <Link
                    href="/shop"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Store
                  </Link>
                </div>
                <div className="flow-root">
                  <Link
                    href="/about"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Company
                  </Link>
                </div>
              </div>

              <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                {session ? (
                  <>
                    <div className="flow-root">
                      <Link
                        href={'/profile/' + slugify(session.user.name)}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {session.user.name}
                      </Link>
                    </div>
                    <div className="flow-root">
                      <button
                        onClick={() => signOut()}
                        className="-m-2 flex w-full items-center gap-x-4 p-2 font-medium text-gray-900"
                      >
                        <LogoutIcon className="h-6 w-6" aria-hidden="true" />
                        Log Out
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flow-root">
                      <Link
                        href="/auth/signin"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign in
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        href="/auth/signup"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Create account
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileMenu;
