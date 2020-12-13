import { IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import React from 'react';

interface Props {
  logout: () => void;
}

const LogoutButton = (props: Props) => {
  const { logout } = props;

  return (
    <IconButton onClick={logout}>
      <ExitToApp />
    </IconButton>
  );
};

export default LogoutButton;
