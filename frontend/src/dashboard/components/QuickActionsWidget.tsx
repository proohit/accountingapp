import { EditableWidgetProps } from '../models/EditableWidgetProps';
import { QuickActions } from './QuickActions';
import Widget from './Widget';

export const QuickActionsWidget: React.FC<EditableWidgetProps> = (props) => (
  <Widget widgetId="quick-actions" xs={6} title="Quick actions" {...props}>
    <QuickActions />
  </Widget>
);
