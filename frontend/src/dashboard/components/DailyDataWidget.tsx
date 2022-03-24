import { WalletField } from '../../records/components/WalletField';
import { Wallet } from '../../wallets/models/Wallet';
import { DateableWidget } from '../models/DateableWidget';
import { MovableWidgetProps } from '../models/MovableWidgetProps';
import ThisMonth from './ThisMonth';
import Widget from './Widget';

export const DailyDataWidget: React.FC<
  MovableWidgetProps &
    DateableWidget & {
      selectedWallet: string;
      wallets: Wallet[];
      setSelectedWallet: (wallet: string) => void;
    }
> = (props) => {
  const { date, selectedWallet, wallets, setSelectedWallet, ...rest } = props;
  return (
    <Widget
      xs={12}
      title={`Daily Records for ${date.format('MMMM YYYY')}`}
      actions={[
        <WalletField
          onWalletChange={(event) => {
            setSelectedWallet(event.target.value);
          }}
          walletName={selectedWallet}
          wallets={wallets}
          withAll
          variant="standard"
          fullWidth={false}
          key="filterByWallet"
        />,
      ]}
      widgetId="daily-records"
      {...rest}
    >
      {wallets && (
        <>
          <ThisMonth
            walletName={selectedWallet !== 'all' ? selectedWallet : undefined}
            date={date}
          />
        </>
      )}
    </Widget>
  );
};
