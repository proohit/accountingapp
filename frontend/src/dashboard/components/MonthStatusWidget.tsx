import { DateableWidget } from '../models/DateableWidget';
import { EditableWidgetProps } from '../models/EditableWidgetProps';
import MonthStatus from './MonthStatus';
import Widget from './Widget';

export const MonthStatusWidget: React.FC<
  EditableWidgetProps & DateableWidget
> = (props) => {
  const { date, ...rest } = props;
  return (
    <Widget
      {...rest}
      xs={12}
      md={6}
      title={`Month Status for ${date.format('MMMM YYYY')}`}
    >
      <MonthStatus date={date} />
    </Widget>
  );
};
