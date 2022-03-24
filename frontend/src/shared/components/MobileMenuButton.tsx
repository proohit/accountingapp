import { IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
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
      size="large">
      <Menu />
    </IconButton>
  );
};
