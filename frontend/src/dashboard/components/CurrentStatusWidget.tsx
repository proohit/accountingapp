import { WalletDto } from '@accountingapp/shared';
import { EditableWidgetProps } from '../models/EditableWidgetProps';
import CurrentStatus from './CurrentStatus';
import Widget from './Widget';

export const CurrentStatusWidget: React.FC<
  EditableWidgetProps & { wallets: WalletDto[] }
> = (props) => {
  const { wallets, ...rest } = props;
  return (
    <Widget {...rest} xs={12} md={6}>
      {wallets && <CurrentStatus wallets={wallets} />}
    </Widget>
  );
};
