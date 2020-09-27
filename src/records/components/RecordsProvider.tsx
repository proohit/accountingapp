import React, { FunctionComponent, useEffect, useState } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { RecordsContext } from '../hooks/useRecords';
import { Record } from '../models/Record';
import { RecordsApiService } from '../services/RecordsApi';

export const RecordsProvider: FunctionComponent = (props) => {
  const [records, setRecords] = useState<Record[]>();
  const authentication = useAuthentication();
  const recordsApi = new RecordsApiService();

  const refreshRecords = async () => {
    const records = await recordsApi.getRecordsByUser(authentication.token);
    setRecords(records);
  };

  useEffect(() => {
    if (authentication.token) {
      refreshRecords();
    }
  }, [authentication.token]);

  return (
    <RecordsContext.Provider value={{ records, setRecords, refreshRecords }}>
      {props.children}
    </RecordsContext.Provider>
  );
};
