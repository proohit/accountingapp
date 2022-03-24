import { AlertProps } from '@mui/lab';
import { atom } from 'recoil';

type Notification = {
  severity: AlertProps['severity'];
  content: string;
};

export const notificationState = atom<Notification>({
  default: null,
  key: 'notification',
});
