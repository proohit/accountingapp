import { OptionalWidgetProps } from '../models/OptionalWidgetProps';
import { WidgetHeader } from './WidgetHeader';

export const OverviewHeaderWidget: React.FC<OptionalWidgetProps> = (props) => (
  <WidgetHeader widgetId="overview-header" title="Overview" {...props} />
);
