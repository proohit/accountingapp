import { DatePicker } from '@material-ui/pickers';
import { Dayjs } from 'dayjs';
import { DateableWidget } from '../models/DateableWidget';
import { MovableWidgetProps } from '../models/MovableWidgetProps';
import Widget from './Widget';

export const MonthPickerWidget: React.FC<
  MovableWidgetProps &
    DateableWidget & {
      setCurrentDate: (date: Dayjs) => void;
    }
> = (props) => {
  const { date, setCurrentDate, ...rest } = props;
  return (
    <Widget widgetId="month-picker" xs={6} title="Settings" {...rest}>
      <DatePicker
        views={['year', 'month']}
        onChange={setCurrentDate}
        value={date}
        label="Month"
      />
    </Widget>
  );
};
