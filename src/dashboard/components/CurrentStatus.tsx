import * as React from 'react';
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { palette } from '../../shared/globals/styles/AccTheme';
import { Wallet } from '../../wallets/models/Wallet';

interface ICurrentStatusProps {
  wallets: Wallet[];
}

const sortWalletsByBalance = (walleta: Wallet, walletb: Wallet): 1 | -1 =>
  walleta.currentBalance > walletb.currentBalance ? -1 : 1;

const CurrentStatus: React.FunctionComponent<ICurrentStatusProps> = (props) => {
  const { wallets } = props;

  const sortedWallets = [...wallets].sort(sortWalletsByBalance);
  return (
    <ResponsiveContainer minWidth={400} width="100%" height={200}>
      <BarChart data={sortedWallets} maxBarSize={15}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} />
        <YAxis />
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
