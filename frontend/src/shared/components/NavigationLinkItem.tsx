import {
  Collapse,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Link from 'next/link';
import React, { useState } from 'react';
import Routes from '../constants/Routes';

interface NavigationItemProps {
  icon: JSX.Element;
  link: Routes;
  text: string;
  active: boolean;
  onClick(link: Routes): void;
}

const NavigationLinkItem: React.FunctionComponent<NavigationItemProps> = (
  props
) => {
  const { icon, link, text, active, onClick, children } = props;
  const [childrenOpen, setChildrenOpen] = useState(false);

  const handleExpandClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setChildrenOpen(!childrenOpen);
  };

  return (
    <>
      <Link href={link} passHref>
        <ListItem
          button
          selected={active}
          component="a"
          onClick={() => onClick(link)}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
          {children && (
            <IconButton size="medium" onClick={handleExpandClick}>
              {childrenOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </ListItem>
      </Link>
      {children && (
        <Collapse in={childrenOpen} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
};

export default NavigationLinkItem;
