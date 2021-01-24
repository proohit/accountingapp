import { atom } from 'recoil';

export const mobileDrawerOpenState = atom<boolean>({
  default: false,
  key: 'mobileDrawerOpenState',
});
