import { Grid } from '@mui/material';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { FunctionComponent, useMemo } from 'react';
import { RecoilRoot } from 'recoil';
import Authenticated from '../src/authentication/components/Authenticated';
import { ignoreRoute } from '../src/authentication/services/RoutingService';
import { AppToolbar } from '../src/shared/components/AppToolbar';
import ContentContainer from '../src/shared/components/ContentContainer';
import { NavigationBar } from '../src/shared/components/NavigationBar';
import Providers from '../src/shared/components/Providers';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  const renderNavigationBar = useMemo(() => {
    return ignoreRoute(router.route);
  }, [router.route]);

  return (
    <RecoilRoot>
      <Providers>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-touch-icon.png"
          ></link>
          <meta name="theme-color" content="#3b4147" />
        </Head>
        <Authenticated>
          <AppToolbar />
          <Grid container>
            {renderNavigationBar && (
              <Grid item lg={2}>
                <NavigationBar />
              </Grid>
            )}
            <ContentContainer renderNavigationBar={!renderNavigationBar}>
              <Component {...pageProps} />
            </ContentContainer>
          </Grid>
        </Authenticated>
      </Providers>
    </RecoilRoot>
  );
};

export default MyApp;
