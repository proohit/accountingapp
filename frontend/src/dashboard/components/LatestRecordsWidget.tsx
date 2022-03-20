import LatestRecords from './LatestRecords';
import Widget from './Widget';
import { MovableWidgetProps } from '../models/MovableWidgetProps';

export const LatestRecordsWidget: React.FC<MovableWidgetProps> = (props) => (
  <Widget
    widgetId="latest-records"
    xs={12}
    md={6}
    title="Latest Records"
    {...props}
  >
    <LatestRecords />
  </Widget>
);
