import React, { FunctionComponent, useState } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { RecordsContext } from '../hooks/useRecords';
import { Record } from '../models/Record';
import { SearchQuery } from '../models/SearchQuery';
import { RecordsApiService } from '../services/RecordsApi';

export const RecordsProvider: FunctionComponent = (props) => {
  const [records, setRecords] = useState<Record[]>();
  const [totalRecords, setTotalRecords] = useState(null);
  const authentication = useAuthentication();
  const recordsApi = new RecordsApiService();

  const refreshRecords = async () => {
    const paginatedResult = await recordsApi.getRecordsByUser(
      authentication.token
    );
    setRecords(paginatedResult.data);
  };

  const getRecords = async (query: SearchQuery) => {
    const paginatedResult = await recordsApi.getRecordsByUser(
      authentication.token,
      query
    );
    setRecords(paginatedResult.data);
    setTotalRecords(paginatedResult.totalCount);
  };

  return (
    <RecordsContext.Provider
      value={{ records, totalRecords, setRecords, refreshRecords, getRecords }}
    >
      {props.children}
    </RecordsContext.Provider>
  );
};
