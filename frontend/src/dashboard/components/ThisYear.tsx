import { LinearProgress, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import * as React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useMonthlyStatisticsQuery } from '../hooks/statistics-query';

const ThisYear: React.FunctionComponent = (props) => {
  const { palette } = useTheme();
  const today = dayjs();
  const year = today.year();
  const month = today.month() + 1;
  const { data, isLoading } = useMonthlyStatisticsQuery(year);

  if (isLoading) {
    return <LinearProgress />;
  }
  return (
    <ResponsiveContainer minWidth={400} width="100%" height={200}>
      <BarChart data={data?.data} maxBarSize={15}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          label={{ value: 'Month', offset: -5, position: 'insideBottom' }}
        />
        <YAxis
          label={{
            value: 'total Balance',
            angle: -90,
            position: 'insideBottomLeft',
            offset: 10,
          }}
        />
        <Tooltip />
        <Bar dataKey="totalBalance" shape={<Rectangle radius={20} />}>
          {data?.data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.month === month
                  ? palette.primary.light
                  : palette.secondary.dark
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ThisYear;
