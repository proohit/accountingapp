import { Alert, Button, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { notificationState } from '../../shared/hooks/notificationState';
import { SettingsApiService } from '../services/SettingsApi';

export const AccountInformation: React.FunctionComponent = () => {
  const { user, isLoginLoading, authenticated } = useAuthentication();

  const setNotificationState = useSetRecoilState(notificationState);

  const resendConfirmationMail = async () => {
    const api = new SettingsApiService();
    await api.sendConfirmToken(user.username);
    setNotificationState({
      content: 'Confirmation email sent',
      severity: 'info',
    });
  };

  if (isLoginLoading) {
    return <LinearProgress />;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <>
      <Typography variant="h6">Username: {user?.username}</Typography>
      <Typography variant="h6">Email: {user?.email}</Typography>
      {!user.confirmed && (
        <Alert severity="info">
          <Typography variant="body1">
            Your account is not confirmed. Please check your email for a
            confirmation link.
          </Typography>

          <Typography variant="body1">
            Didn&apos;t receive an email?{' '}
            <Button onClick={resendConfirmationMail}>
              Resend confirmation email
            </Button>
          </Typography>
        </Alert>
      )}
    </>
  );
};
