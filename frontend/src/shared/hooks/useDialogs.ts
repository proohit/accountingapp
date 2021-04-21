import { useState } from 'react';

interface Openable {
  open: boolean;
}

type DialogsState<R> = {
  [key in keyof R]: R[keyof R] & Openable;
};

export interface UseDialogs<R> {
  dialogs: R;
  setSingleDialog: (dialog: keyof R, dialogValue: R[keyof R]) => void;
  setDialogs: (dialogs: R) => void;
}

export const useDialogs = <R extends DialogsState<R>>(
  initialDialogs?: R
): UseDialogs<R> => {
  const [dialogs, setDialogs] = useState<R>(initialDialogs);

  const setSingleDialog = (dialog: keyof R, dialogValue: R[keyof R]) => {
    setDialogs({ ...dialogs, [dialog]: dialogValue });
  };

  return { dialogs, setSingleDialog, setDialogs };
};
