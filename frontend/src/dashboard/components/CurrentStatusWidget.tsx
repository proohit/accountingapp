import { Wallet } from '../../wallets/models/Wallet';
import { EditableWidgetProps } from '../models/EditableWidgetProps';
import CurrentStatus from './CurrentStatus';
import Widget from './Widget';

export const CurrentStatusWidget: React.FC<
  EditableWidgetProps & { wallets: Wallet[] }
> = (props) => {
  const { wallets, ...rest } = props;
  return (
    <Widget
      widgetId="current-status"
      xs={12}
      md={6}
      title="Current Status"
      {...rest}
    >
      {wallets && <CurrentStatus wallets={wallets} />}
    </Widget>
  );
};
