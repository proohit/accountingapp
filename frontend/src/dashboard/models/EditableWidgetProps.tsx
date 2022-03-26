import { WidgetProps } from '../components/Widget';

export type MovableWidgetProps = Partial<WidgetProps> & {
  onWidgetDrop: WidgetProps['onWidgetDrop'];
};

export type RemoveableWidgetProps = Partial<WidgetProps> & {
  onWidgetRemove: WidgetProps['onWidgetRemove'];
};

export type EditableWidgetProps = MovableWidgetProps & RemoveableWidgetProps;
