import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useRecoilState } from 'recoil';
import { notificationState } from '../hooks/notificationState';

const NotificationBar: React.FC = () => {
  const [notification, setNotification] = useRecoilState(notificationState);

  const resetNotification = () => {
    setNotification(null);
  };

  return (
    <Snackbar
      open={!!notification}
      autoHideDuration={6000}
      onClose={resetNotification}
    >
      {notification && (
        <Alert onClose={resetNotification} severity={notification.severity}>
          {notification.content}
        </Alert>
      )}
    </Snackbar>
  );
};

export default NotificationBar;
