import dayjs, { Dayjs } from 'dayjs';
import DatePicker from '@mui/lab/DatePicker';
import { DateableWidget } from '../models/DateableWidget';
import { EditableWidgetProps } from '../models/EditableWidgetProps';
import Widget from './Widget';
import { TextField } from '@mui/material';
import { useState } from 'react';

export const MonthPickerWidget: React.FC<
  EditableWidgetProps &
    DateableWidget & {
      setCurrentDate: (date: Dayjs) => void;
    }
> = (props) => {
  const { date, setCurrentDate, ...rest } = props;
  const [selectedDate, setSelectedDate] = useState<Dayjs>(date);
  return (
    <Widget widgetId="month-picker" xs={6} title="Settings" {...rest}>
      <DatePicker
        renderInput={(inputProps) => <TextField {...inputProps} />}
        views={['year', 'month']}
        onChange={(acceptedDate) => {
          setSelectedDate(acceptedDate);
          if (acceptedDate && acceptedDate.isValid()) {
            setCurrentDate(acceptedDate);
          }
        }}
        value={selectedDate}
        label="Month"
      />
    </Widget>
  );
};
