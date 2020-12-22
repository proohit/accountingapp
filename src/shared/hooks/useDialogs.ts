import { useContext, createContext } from 'react';
import { DialogContextModel } from '../models/DialogContextModel';

export const DialogsContext = createContext<DialogContextModel>(
  {} as DialogContextModel
);

export const useDialogs = () => {
  const context = useContext(DialogsContext);

  if (!context) {
    throw new Error('Dialog Context not provided');
  }

  return context;
};
