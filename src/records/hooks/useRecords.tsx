import React, { useContext } from 'react';
import { RecordContextModel } from '../models/RecordContextModel';

export const RecordsContext = React.createContext<RecordContextModel>(
  {} as RecordContextModel
);

export const useRecords = () => {
  const context = useContext(RecordsContext);

  if (!context) {
    throw new Error('Record Context not provided');
  }

  return context;
};
