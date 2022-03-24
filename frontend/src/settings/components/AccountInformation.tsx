import { LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';

export const AccountInformation: React.FunctionComponent = () => {
  const { user, isLoginLoading } = useAuthentication();
  return isLoginLoading ? (
    <LinearProgress />
  ) : (
    <>
      <Typography variant="h6">Username: {user?.username}</Typography>
      <Typography variant="h6">Email: {user?.email}</Typography>
    </>
  );
};
