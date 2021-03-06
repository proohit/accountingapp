import {
  CssBaseline,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { LocalizationProvider } from '@mui/lab';
import React, { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { AuthenticationProvider } from '../../authentication/components/AuthenticationProvider';
import { AccTheme } from '../globals/styles/AccTheme';
import DialogsProvider from './DialogsProvider';
import NotificationBar from './NotificationBar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

const queryClient = new QueryClient();

const Providers: FunctionComponent = (props) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={AccTheme}>
        <CssBaseline />
        {/* @ts-ignore */}
        <LocalizationProvider dateAdapter={DateAdapter}>
          <RecoilRoot>
            <QueryClientProvider client={queryClient}>
              <DndProvider backend={HTML5Backend}>
                <AuthenticationProvider>
                  <DialogsProvider>
                    <NotificationBar />
                    {props.children}
                  </DialogsProvider>
                </AuthenticationProvider>
              </DndProvider>
            </QueryClientProvider>
          </RecoilRoot>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Providers;
