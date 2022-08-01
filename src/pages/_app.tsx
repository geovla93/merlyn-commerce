import '../styles/globals.css';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

import Layout from '@/components/common/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider session={pageProps.session}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </RecoilRoot>
  );
}

export default MyApp;
