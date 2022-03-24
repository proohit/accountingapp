import { Dayjs } from 'dayjs';
import DatePicker from '@mui/lab/DatePicker';
import { DateableWidget } from '../models/DateableWidget';
import { MovableWidgetProps } from '../models/MovableWidgetProps';
import Widget from './Widget';
import { TextField } from '@material-ui/core';

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
        renderInput={(inputProps) => <TextField {...inputProps} />}
        views={['year', 'month']}
        onChange={setCurrentDate}
        value={date}
        label="Month"
      />
    </Widget>
  );
};
