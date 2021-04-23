import { AlertProps } from '@material-ui/lab';
import { atom } from 'recoil';

type Notification = {
  severity: AlertProps['severity'];
  content: string;
};

export const notificationState = atom<Notification>({
  default: null,
  key: 'notification',
});
