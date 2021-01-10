import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthenticationProvider } from '../../authentication/components/AuthenticationProvider';
import { AccTheme } from '../globals/styles/AccTheme';
const queryClient = new QueryClient();

const Providers: FunctionComponent = (props) => {
  return (
    <ThemeProvider theme={AccTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>{props.children}</AuthenticationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
