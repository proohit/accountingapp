import { LinearProgress } from '@material-ui/core';
import dayjs from 'dayjs';
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
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { palette } from '../../shared/globals/styles/AccTheme';
import { useMonthlyStatisticsQuery } from '../hooks/monthQuery';
import { DailyStatisticsData } from '../models/DailyData';

const colors = [
  palette.primary.main,
  palette.secondary.dark,
  palette.success.main,
  palette.error.main,
  palette.warning.main,
];

type ThisMonthProps = {
  walletName?: string;
};

const ThisMonth: React.FunctionComponent<ThisMonthProps> = (props) => {
  const { walletName } = props;
  const { token } = useAuthentication();
  const today = dayjs();
  const month = today.month() + 1;
  const year = today.year();
  const { data, isLoading } = useMonthlyStatisticsQuery(token, month, year);

  if (isLoading) {
    return <LinearProgress />;
  }

  const getDataWithFilteredWallets = (
    dailyData: DailyStatisticsData,
    walletNameToFilter: string
  ) => {
    return dailyData?.data?.find(
      (walletData) => walletData.walletName === walletNameToFilter
    );
  };

  const getDataWithFormattedDate = (dailyData: DailyStatisticsData) => {
    return dailyData?.data?.map((walletData) => ({
      ...walletData,
      data: walletData.data.map((singleWalletData) => ({
        ...singleWalletData,
        day: dayjs(singleWalletData.day).format('D. MMM'),
      })),
    }));
  };

  const finalData = { ...data };
  if (walletName && data?.data) {
    finalData.data = [getDataWithFilteredWallets(data, walletName)];
  }

  finalData.data = getDataWithFormattedDate(finalData);

  return (
    <ResponsiveContainer minWidth={400} width="100%" height={200}>
      <LineChart data={finalData?.data} maxBarSize={15}>
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
        {finalData?.data?.map((wallet, index, _arr) => (
          <Line
            type="monotone"
            stroke={colors[index % colors.length]}
            dataKey="balance"
            data={wallet.data}
            name={wallet.walletName}
            key={wallet.walletName}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ThisMonth;
