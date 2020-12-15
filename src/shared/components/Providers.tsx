import * as React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { AccTheme } from '../globals/styles/AccTheme';
import { AuthenticationProvider } from '../../authentication/components/AuthenticationProvider';
import { RecordsProvider } from '../../records/components/RecordsProvider';

const Providers: React.FunctionComponent = (props) => {
  return (
    <ThemeProvider theme={AccTheme}>
      <CssBaseline />
      <AuthenticationProvider>
        <RecordsProvider>{props.children}</RecordsProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};

export default Providers;
