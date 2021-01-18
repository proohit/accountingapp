import DayjsUtils from '@date-io/dayjs';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { AuthenticationProvider } from '../../authentication/components/AuthenticationProvider';
import { AccTheme } from '../globals/styles/AccTheme';
const queryClient = new QueryClient();

const Providers: FunctionComponent = (props) => {
  return (
    <ThemeProvider theme={AccTheme}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <AuthenticationProvider>{props.children}</AuthenticationProvider>
          </QueryClientProvider>
        </RecoilRoot>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default Providers;
