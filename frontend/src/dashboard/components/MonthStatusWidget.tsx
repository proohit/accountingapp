import { DateableWidget } from '../models/DateableWidget';
import { MovableWidgetProps } from '../models/MovableWidgetProps';
import MonthStatus from './MonthStatus';
import Widget from './Widget';

export const MonthStatusWidget: React.FC<
  MovableWidgetProps & DateableWidget
> = (props) => {
  const { date, ...rest } = props;
  return (
    <Widget
      {...rest}
      widgetId="month-status"
      xs={12}
      md={6}
      title={`Month Status for ${date.format('MMMM YYYY')}`}
    >
      <MonthStatus date={date} />
    </Widget>
  );
};
