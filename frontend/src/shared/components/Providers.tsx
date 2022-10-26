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
import { QueryClientProvider } from 'react-query';
import { AuthenticationProvider } from '../../authentication/components/AuthenticationProvider';
import { AccTheme } from '../globals/styles/AccTheme';
import { useCustomQueryClient } from '../hooks/useCustomQueryClient';
import DialogsProvider from './DialogsProvider';
import NotificationBar from './NotificationBar';

declare module '@mui/material/styles' {
  interface Theme {}
  interface ThemeOptions {}
}

const Providers: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={AccTheme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={useCustomQueryClient()}>
            <DndProvider backend={HTML5Backend}>
              <AuthenticationProvider>
                <DialogsProvider>
                  <NotificationBar />
                  {props.children}
                </DialogsProvider>
              </AuthenticationProvider>
            </DndProvider>
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Providers;
