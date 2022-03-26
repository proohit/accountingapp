import { WalletField } from '../../records/components/WalletField';
import { Wallet } from '../../wallets/models/Wallet';
import { DateableWidget } from '../models/DateableWidget';
import { EditableWidgetProps } from '../models/EditableWidgetProps';
import ThisMonth from './ThisMonth';
import Widget from './Widget';

export const DailyDataWidget: React.FC<
  EditableWidgetProps &
    DateableWidget & {
      selectedWallet: string;
      wallets: Wallet[];
      setSelectedWallet: (wallet: string) => void;
    }
> = (props) => {
  const { date, selectedWallet, wallets, setSelectedWallet, ...rest } = props;
  return (
    <Widget
      {...rest}
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
