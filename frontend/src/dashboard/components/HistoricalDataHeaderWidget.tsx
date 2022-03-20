import { OptionalWidgetProps } from '../models/OptionalWidgetProps';
import { WidgetHeader } from './WidgetHeader';

export const HistoricalDataHeaderWidget: React.FC<OptionalWidgetProps> = (
  props
) => (
  <WidgetHeader
    widgetId="historical-data-header"
    title="Historical Data"
    {...props}
  />
);
