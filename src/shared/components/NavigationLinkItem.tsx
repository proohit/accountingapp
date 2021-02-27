import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import Routes from '../constants/Routes';

interface NavigationItemProps {
  icon: JSX.Element;
  link: Routes;
  text: string;
  active: boolean;
  onClick(link: Routes): void;
}

const NavigationLinkItem = (props: NavigationItemProps) => {
  const { icon, link, text, active, onClick } = props;

  return (
    <Link href={link} passHref>
      <ListItem
        button
        selected={active}
        component="a"
        onClick={() => onClick(link)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  );
};

export default NavigationLinkItem;
