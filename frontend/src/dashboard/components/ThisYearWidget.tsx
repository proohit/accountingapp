import { MovableWidgetProps } from '../models/MovableWidgetProps';
import ThisYear from './ThisYear';
import Widget from './Widget';

export const ThisYearWidget: React.FC<MovableWidgetProps> = (props) => (
  <Widget widgetId="this-year" xs={12} md={6} title="This Year" {...props}>
    <ThisYear />
  </Widget>
);
