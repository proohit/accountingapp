import * as React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { palette } from '../../shared/globals/styles/AccTheme';

const data = [
  {
    wallet: 'Konto',
    data: [
      { day: '1.1.2021', balance: 10 },
      { day: '2.1.2021', balance: 20 },
      { day: '3.1.2021', balance: 20 },
      { day: '4.1.2021', balance: 30 },
      { day: '5.1.2021', balance: 80 },
      { day: '6.1.2021', balance: 70 },
      { day: '7.1.2021', balance: 110 },
      { day: '8.1.2021', balance: 150 },
      { day: '9.1.2021', balance: 190 },
      { day: '10.1.2021', balance: 150 },
      { day: '11.1.2021', balance: 20 },
      { day: '12.1.2021', balance: 20 },
      { day: '13.1.2021', balance: 20 },
      { day: '14.1.2021', balance: 20 },
    ],
  },
  {
    wallet: 'Bar',
    data: [
      { day: '1.1.2021', balance: 100 },
      { day: '2.1.2021', balance: 200 },
      { day: '3.1.2021', balance: 300 },
      { day: '4.1.2021', balance: 400 },
      { day: '5.1.2021', balance: 350 },
      { day: '6.1.2021', balance: 370 },
      { day: '7.1.2021', balance: 20 },
      { day: '8.1.2021', balance: 20 },
      { day: '9.1.2021', balance: 20 },
      { day: '10.1.2021', balance: 20 },
      { day: '11.1.2021', balance: 20 },
      { day: '12.1.2021', balance: 20 },
      { day: '13.1.2021', balance: 20 },
      { day: '14.1.2021', balance: 20 },
    ],
  },
];

const colors = [
  palette.primary.main,
  palette.secondary.dark,
  palette.success.main,
  palette.error.main,
  palette.warning.main,
];

interface IThisMonthProps {}

const ThisMonth: React.FunctionComponent<IThisMonthProps> = (props) => {
  return (
    <ResponsiveContainer minWidth={400} width="100%" height={200}>
      <LineChart data={data} maxBarSize={15}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" type="category" allowDuplicatedCategory={false} />
        <YAxis
          label={{
            value: 'balance',
            angle: -90,
            position: 'insideBottomLeft',
            offset: 10,
          }}
        />
        <Tooltip />
        <Legend />
        {data.map((wallet, index, _arr) => (
          <Line
            type="monotone"
            stroke={colors[index % colors.length]}
            dataKey="balance"
            data={wallet.data}
            name={wallet.wallet}
            key={wallet.wallet}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ThisMonth;
