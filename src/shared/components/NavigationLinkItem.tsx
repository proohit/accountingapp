import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import Routes from '../constants/Routes';

interface NavigationItemProps {
  icon: JSX.Element;
  link: Routes;
  text: string;
  active: boolean;
}

const styles = makeStyles((theme) => ({
  active: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const NavigationLinkItem = (props: NavigationItemProps) => {
  const { icon, link, text, active } = props;
  const classes = styles();

  return (
    <Link href={link} passHref>
      <ListItem
        button
        className={clsx({ [classes.active]: active })}
        component="a"
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  );
};

export default NavigationLinkItem;
