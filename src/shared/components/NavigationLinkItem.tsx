import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

interface NavigationItemProps {
  icon: JSX.Element;
  link: string;
  text: string;
}

const NavigationLinkItem = (props: NavigationItemProps) => {
  const { icon, link, text } = props;
  return (
    <Link href={link} passHref>
      <ListItem button component="a">
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  );
};

export default NavigationLinkItem;
