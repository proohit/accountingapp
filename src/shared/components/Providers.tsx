import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthenticationProvider } from '../../authentication/components/AuthenticationProvider';
import { CategoryProvider } from '../../records/components/CategoryProvider';
import { RecordsProvider } from '../../records/components/RecordsProvider';
import { WalletsProvider } from '../../wallets/components/WalletsProvider';
import { AccTheme } from '../globals/styles/AccTheme';
const queryClient = new QueryClient();

const Providers: FunctionComponent = (props) => {
  return (
    <ThemeProvider theme={AccTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <RecordsProvider>
            <CategoryProvider>
              <WalletsProvider>{props.children}</WalletsProvider>
            </CategoryProvider>
          </RecordsProvider>
        </AuthenticationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
