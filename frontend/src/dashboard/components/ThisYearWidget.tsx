import { EditableWidgetProps } from '../models/EditableWidgetProps';
import ThisYear from './ThisYear';
import Widget from './Widget';

export const ThisYearWidget: React.FC<EditableWidgetProps> = (props) => (
  <Widget {...props} xs={12} md={6}>
    <ThisYear />
  </Widget>
);
