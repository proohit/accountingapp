import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
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
