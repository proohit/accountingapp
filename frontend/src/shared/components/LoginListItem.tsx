import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountBox } from '@mui/icons-material';
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
