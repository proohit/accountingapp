export interface DialogContextModel {
  dialogs: DialogStates;
  openDialog(dialog: Dialogs): void;
  closeDialog(dialog: Dialogs): void;
}

export interface DialogStates {
  [Dialogs.addRecord]: boolean;
  [Dialogs.editRecord]: boolean;
}

export enum Dialogs {
  addRecord = 'ADD_RECORD',
  editRecord = 'EDIT_RECORD',
}
