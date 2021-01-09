import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthenticationProvider } from '../../authentication/components/AuthenticationProvider';
import { CategoryProvider } from '../../records/components/CategoryProvider';
import { RecordsProvider } from '../../records/components/RecordsProvider';
import { WalletsProvider } from '../../wallets/components/WalletsProvider';
import { AccTheme } from '../globals/styles/AccTheme';
import { DialogsProvider } from './DialogProvider';
const queryClient = new QueryClient();

const Providers: FunctionComponent = (props) => {
  return (
    <ThemeProvider theme={AccTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <DialogsProvider>
            <RecordsProvider>
              <CategoryProvider>
                <WalletsProvider>{props.children}</WalletsProvider>
              </CategoryProvider>
            </RecordsProvider>
          </DialogsProvider>
        </AuthenticationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
