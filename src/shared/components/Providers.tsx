import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { AuthenticationProvider } from '../../authentication/components/AuthenticationProvider';
import { RecordsProvider } from '../../records/components/RecordsProvider';
import { WalletsProvider } from '../../wallets/components/WalletsProvider';
import { AccTheme } from '../globals/styles/AccTheme';
import { DialogsProvider } from './DialogProvider';

const Providers: FunctionComponent = (props) => {
  return (
    <ThemeProvider theme={AccTheme}>
      <CssBaseline />
      <AuthenticationProvider>
        <DialogsProvider>
          <RecordsProvider>
            <WalletsProvider>{props.children}</WalletsProvider>
          </RecordsProvider>
        </DialogsProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};

export default Providers;
