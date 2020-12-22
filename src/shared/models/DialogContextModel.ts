export interface DialogContextModel {
  dialogs: DialogStates;
  openDialog(dialog: Dialogs): void;
  closeDialog(dialog: Dialogs): void;
}

export interface DialogStates {
  [Dialogs.addRecord]: boolean;
}

export enum Dialogs {
  addRecord = 'ADD_RECORD',
}
