import { FunctionComponent, useState } from 'react';
import { DialogsContext } from '../hooks/useDialogs';
import { Dialogs, DialogStates } from '../models/DialogContextModel';

const defaultDialogsState: DialogStates = {
  ADD_RECORD: false,
  EDIT_RECORD: false,
};

export const DialogsProvider: FunctionComponent = (props) => {
  const [dialogs, setDialogs] = useState<DialogStates>(defaultDialogsState);

  const openDialog = (dialog: Dialogs) => {
    setDialogs({ ...dialogs, [dialog]: true });
  };
  const closeDialog = (dialog: Dialogs) => {
    setDialogs({ ...dialogs, [dialog]: false });
  };
  return (
    <DialogsContext.Provider value={{ dialogs, closeDialog, openDialog }}>
      {props.children}
    </DialogsContext.Provider>
  );
};
