import { Grid, Typography } from '@material-ui/core';
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
import ThisMonth from '../../src/dashboard/components/ThisMonth';
import Widget from '../../src/dashboard/components/Widget';
import { WalletField } from '../../src/records/components/WalletField';
import { palette } from '../../src/shared/globals/styles/AccTheme';
import { useWalletsQuery } from '../../src/wallets/hooks/walletsQueries';

const DashboardPage: React.FunctionComponent = (props) => {
  const [selectedWallet, setSelectedWallet] = React.useState('all');
  const { data: wallets } = useWalletsQuery();
  return (
    <Grid container spacing={2}>
      <Widget
        xs={12}
        title="This Month"
        actions={
          <WalletField
            onWalletChange={(event) => {
              setSelectedWallet(
                (event.target.value || event.currentTarget.value) as string
              );
            }}
            walletName={selectedWallet}
            wallets={wallets}
            withAll
            variant="standard"
          />
        }
      >
        {wallets && (
          <>
            <ThisMonth
              walletName={selectedWallet !== 'all' ? selectedWallet : undefined}
            />
          </>
        )}
      </Widget>
      <Widget xs={12} md={6} title="Current Status">
        {wallets && <CurrentStatus wallets={wallets} />}
      </Widget>
      <Widget md={6}>
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
