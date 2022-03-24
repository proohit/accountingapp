import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import React from 'react';

interface Props {
  logout: () => void;
}

const LogoutListItem = (props: Props) => {
  const { logout } = props;

  return (
    <ListItem button onClick={logout}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary={'Logout'} />
    </ListItem>
  );
};

export default LogoutListItem;
