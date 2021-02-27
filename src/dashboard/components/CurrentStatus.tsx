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

const CurrentStatus: React.FunctionComponent<ICurrentStatusProps> = (props) => {
  const { wallets } = props;
  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={wallets} maxBarSize={20} barGap={1}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} minTickGap={50} />
          <YAxis />
          <Tooltip />
          <Brush dataKey="name" stroke={palette.primary.main} />
          <Bar
            dataKey="currentBalance"
            fill={palette.secondary.dark}
            shape={<Rectangle radius={20} />}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default CurrentStatus;
