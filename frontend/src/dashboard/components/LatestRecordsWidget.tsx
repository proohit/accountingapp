import LatestRecords from './LatestRecords';
import Widget from './Widget';
import { EditableWidgetProps } from '../models/EditableWidgetProps';

export const LatestRecordsWidget: React.FC<EditableWidgetProps> = (props) => (
  <Widget xs={12} md={6} {...props}>
    <LatestRecords />
  </Widget>
);
