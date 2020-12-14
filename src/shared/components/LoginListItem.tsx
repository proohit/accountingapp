import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';
import Link from 'next/link';
import React from 'react';

const LoginListItem = () => {
  return (
    <Link href="/login" passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText primary={'Login'} />
      </ListItem>
    </Link>
  );
};

export default LoginListItem;
