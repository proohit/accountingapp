import { Grid, makeStyles } from '@material-ui/core';
import * as React from 'react';
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useAuthentication } from '../../src/authentication/hooks/useAuthentication';
import CurrentStatus from '../../src/dashboard/components/CurrentStatus';
import Widget from '../../src/dashboard/components/Widget';
import { palette } from '../../src/shared/globals/styles/AccTheme';
import { useWalletsQuery } from '../../src/wallets/hooks/walletsQueries';

const DashboardPage: React.FunctionComponent = (props) => {
  const { token } = useAuthentication();

  const { data: wallets } = useWalletsQuery(token);
  return (
    <Grid container spacing={2}>
      <Widget width={12} title="Current Status">
        {wallets && <CurrentStatus wallets={wallets} />}
      </Widget>
      <Widget width={6}>
        {wallets && (
          <ResponsiveContainer height={200}>
            <BarChart data={wallets}>
              <CartesianGrid strokeDasharray="3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Brush dataKey="name" height={30} stroke="#8884d8" />
              <Bar dataKey="currentBalance" fill={palette.secondary.main} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Widget>
      <Widget width={6}>
        {wallets && (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={wallets}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Brush dataKey="name" height={30} stroke="#8884d8" />
              <Bar dataKey="currentBalance" fill={palette.secondary.main} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Widget>
    </Grid>
  );
};

export default DashboardPage;
