import { Grid } from '@material-ui/core';
import * as React from 'react';
import CurrentStatus from '../../src/dashboard/components/CurrentStatus';
import ThisMonth from '../../src/dashboard/components/ThisMonth';
import ThisYear from '../../src/dashboard/components/ThisYear';
import Widget from '../../src/dashboard/components/Widget';
import { WalletField } from '../../src/records/components/WalletField';
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
      <Widget md={12} title="This Year">
        <ThisYear />
      </Widget>
    </Grid>
  );
};

export default DashboardPage;
