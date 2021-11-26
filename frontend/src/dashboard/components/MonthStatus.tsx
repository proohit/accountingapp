import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
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
      <Card>
        <CardHeader title={date.format('MMMM YYYY')}></CardHeader>
        <CardContent>
          <Typography
            variant="h6"
            color={data.data.balance >= 0 ? 'primary' : 'error'}
          >
            {data.data.balance > 0 ? '+' : ''}
            {data.data.balance}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MonthStatus;
