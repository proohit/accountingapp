import { Grid, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { useMonthStatusStatisticsQuery } from '../hooks/monthQuery';
import { DateableWidget } from '../models/DateableWidget';

const MonthStatus: React.FC<DateableWidget> = (props) => {
  const { date } = props;
  const month = date.month();
  const year = date.year();

  const query = useMonthStatusStatisticsQuery(month, year);
  const { data, isLoading } = query;
  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Grid style={{ maxHeight: 200 }}>
      <Typography display="inline" color="primary">
        You have a net of{' '}
      </Typography>
      <Typography
        display="inline"
        color={data.data.balance >= 0 ? 'primary' : 'error'}
      >
        {data.data.balance > 0 ? '+' : ''}
        {data.data.balance}{' '}
      </Typography>
      <Typography display="inline" color="primary">
        for {date.format('MMMM YYYY')}
      </Typography>
    </Grid>
  );
};

export default MonthStatus;
