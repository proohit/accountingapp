import { IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
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
