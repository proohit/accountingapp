import { IconButton } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Menu } from '@material-ui/icons';
import { useRecoilState } from 'recoil';
import { mobileDrawerOpenState } from '../hooks/mobileDrawerOpenState';

export const MobileMenuButton: FunctionComponent = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useRecoilState(
    mobileDrawerOpenState
  );
  return (
    <IconButton
      color="secondary"
      onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
    >
      <Menu />
    </IconButton>
  );
};
