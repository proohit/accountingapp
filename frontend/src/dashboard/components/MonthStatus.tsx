import { Info } from '@mui/icons-material';
import { Grid, LinearProgress, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useMonthStatusStatisticsQuery } from '../hooks/statistics-query';
import { DateableWidget } from '../models/DateableWidget';

const MonthStatus: React.FC<DateableWidget> = (props) => {
  const { date } = props;
  const month = date.month();
  const year = date.year();

  const query = useMonthStatusStatisticsQuery(month, year, date.toISOString());
  const { data, isLoading } = query;
  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Grid style={{ maxHeight: 200 }}>
      <Typography display="inline" color="primary">
        You have a current net of{' '}
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
      {data.data.plannedOutcomes < 0 && (
        <Typography
          color="primary"
          sx={{ display: 'flex', alignItems: 'start' }}
        >
          ... and planned expenses of {data.data.plannedOutcomes}
          <Tooltip title="Currently only monthly recurring expenses are supported">
            <Info />
          </Tooltip>
        </Typography>
      )}
      {data.data.plannedIncomes > 0 && (
        <Typography
          color="primary"
          sx={{ display: 'flex', alignItems: 'start' }}
        >
          ... and planned income of {data.data.plannedIncomes}
          <Tooltip title="Currently only monthly recurring incomes are supported">
            <Info />
          </Tooltip>
        </Typography>
      )}
      {data.data.plannedBalance !== 0 && (
        <Typography
          color="primary"
          sx={{ display: 'flex', alignItems: 'start' }}
        >
          ... which would result in a planned net of {data.data.plannedBalance}
        </Typography>
      )}
    </Grid>
  );
};

export default MonthStatus;
