import {
  Grid,
  LinearProgress,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import * as React from 'react';
import { useCategoriesQuery } from '../../records/hooks/categoriesQueries';
import { formatState } from '../../records/hooks/formatState';
import { useRecordsQuery } from '../../records/hooks/recordsQueries';
import { getCategoryById } from '../../records/utils/categoryUtils';

interface ILatestRecordsProps {}

const LatestRecords: React.FunctionComponent<ILatestRecordsProps> = (props) => {
  const { data: records } = useRecordsQuery({
    page: 1,
    sortBy: 'timestamp',
    sortDirection: 'desc',
    itemsPerPage: 5,
  });
  const { data: format, isLoading: formatLoading } = formatState();
  const { data: categories, isLoading: categoriesLoading } =
    useCategoriesQuery();

  if (formatLoading || categoriesLoading) {
    return <LinearProgress />;
  }
  return (
    <Grid style={{ maxHeight: 200 }}>
      <List>
        {records?.data?.map((record) => (
          <ListItem key={record.id} divider>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={10}>
                <Typography color="primary">{record.description}</Typography>
                <Typography color="primary" variant="body2">
                  {getCategoryById(categories, record.categoryId)?.name}
                </Typography>
                <Typography color="primary" variant="body2">
                  {dayjs(record.timestamp).format(format.dateTimeFormat)}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography color={record.value < 0 ? 'error' : 'primary'}>
                  {record.value}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default LatestRecords;
