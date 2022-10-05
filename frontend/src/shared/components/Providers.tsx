import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FunctionComponent, PropsWithChildren } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { AuthenticationProvider } from '../../authentication/components/AuthenticationProvider';
import { AccTheme } from '../globals/styles/AccTheme';
import DialogsProvider from './DialogsProvider';
import NotificationBar from './NotificationBar';

declare module '@mui/material/styles' {
  interface Theme {}
  interface ThemeOptions {}
}

const queryClient = new QueryClient();

const Providers: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={AccTheme}>
        <CssBaseline />
        {/* @ts-ignore */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
