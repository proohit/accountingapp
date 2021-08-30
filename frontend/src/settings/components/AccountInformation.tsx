import { Typography } from '@material-ui/core';
import React from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';

export const AccountInformation: React.FunctionComponent = () => {
  const { user } = useAuthentication();
  return (
    <>
      <Typography variant="h6">Username: {user.username}</Typography>
      <Typography variant="h6">Email: {user.email}</Typography>
    </>
  );
};
