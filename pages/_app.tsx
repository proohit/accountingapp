import React from 'react';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Providers from '../src/shared/components/Providers';
import Authenticated from '../src/authentication/components/Authenticated';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Authenticated>
        <Component {...pageProps} />
      </Authenticated>
    </Providers>
  );
}

export default MyApp;
