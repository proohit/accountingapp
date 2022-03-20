import { WidgetProps } from '../components/Widget';

export type MovableWidgetProps = Partial<WidgetProps> & {
  onWidgetDrop: WidgetProps['onWidgetDrop'];
};
