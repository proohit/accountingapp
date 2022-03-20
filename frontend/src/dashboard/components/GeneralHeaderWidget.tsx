import { OptionalWidgetProps } from '../models/OptionalWidgetProps';
import { WidgetHeader } from './WidgetHeader';

export const GeneralHeaderWidget: React.FC<OptionalWidgetProps> = () => (
  <WidgetHeader widgetId="general-header" title="General" />
);
