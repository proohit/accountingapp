import { EditableWidgetProps } from '../models/EditableWidgetProps';
import { QuickActions } from './QuickActions';
import Widget from './Widget';

export const QuickActionsWidget: React.FC<EditableWidgetProps> = (props) => (
  <Widget {...props} xs={6}>
    <QuickActions />
  </Widget>
);
