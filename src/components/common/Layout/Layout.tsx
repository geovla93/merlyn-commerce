import { FC, PropsWithChildren } from 'react';

import Header from '../Header';
import Footer from '../Footer';
import Toast from '@/components/ui/Toast';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen w-screen flex-col bg-gray-100">
      <Toast />
      <Header />
      <main className="mx-auto flex w-11/12 flex-1 flex-col space-y-4 text-center lg:w-5/6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
