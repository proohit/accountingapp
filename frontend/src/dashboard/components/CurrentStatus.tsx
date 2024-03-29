import { WalletDto } from '@accountingapp/shared';
import { useTheme } from '@mui/material';
import * as React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ICurrentStatusProps {
  wallets: WalletDto[];
}

const sortWalletsByBalance = (walleta: WalletDto, walletb: WalletDto): 1 | -1 =>
  walleta.currentBalance > walletb.currentBalance ? -1 : 1;

const CurrentStatus: React.FunctionComponent<ICurrentStatusProps> = (props) => {
  const { wallets } = props;
  const { palette } = useTheme();

  const sortedWallets = [...wallets].sort(sortWalletsByBalance);
  return (
    <ResponsiveContainer minWidth={400} width="100%" height={200}>
      <BarChart data={sortedWallets} maxBarSize={15}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          label={{ value: 'Wallet', offset: -5, position: 'insideBottom' }}
        />
        <YAxis
          label={{
            value: 'current Balance',
            angle: -90,
            position: 'insideBottomLeft',
            offset: 10,
          }}
        />
        <Tooltip />
        <Bar
          dataKey="currentBalance"
          fill={palette.secondary.dark}
          shape={<Rectangle radius={20} />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CurrentStatus;
