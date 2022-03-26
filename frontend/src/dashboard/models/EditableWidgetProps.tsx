import { WidgetProps } from '../components/Widget';

export type MovableWidgetProps = WidgetProps & {
  onWidgetDrop: WidgetProps['onWidgetDrop'];
};

export type RemoveableWidgetProps = WidgetProps & {
  onWidgetRemove: WidgetProps['onWidgetRemove'];
};

export type EditableWidgetProps = MovableWidgetProps & RemoveableWidgetProps;
