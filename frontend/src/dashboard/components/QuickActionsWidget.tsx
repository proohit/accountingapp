import { MovableWidgetProps } from '../models/MovableWidgetProps';
import { QuickActions } from './QuickActions';
import Widget from './Widget';

export const QuickActionsWidget: React.FC<MovableWidgetProps> = (props) => (
  <Widget widgetId="quick-actions" xs={6} title="Quick actions" {...props}>
    <QuickActions />
  </Widget>
);
