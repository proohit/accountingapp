import { EditableWidgetProps } from '../models/EditableWidgetProps';
import ThisYear from './ThisYear';
import Widget from './Widget';

export const ThisYearWidget: React.FC<EditableWidgetProps> = (props) => (
  <Widget widgetId="this-year" xs={12} md={6} title="This Year" {...props}>
    <ThisYear />
  </Widget>
);
