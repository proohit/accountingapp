import { atom } from 'recoil';

export const registerGreetingState = atom<boolean>({
  default: false,
  key: 'registerGreeting',
});
