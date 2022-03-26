import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import { FunctionComponent, useState } from 'react';
import { DateableWidget } from '../models/DateableWidget';
import { EditableWidgetProps } from '../models/EditableWidgetProps';
import Widget from './Widget';

export const MonthPickerWidget: FunctionComponent<
  EditableWidgetProps &
    DateableWidget & {
      setCurrentDate: (date: Dayjs) => void;
    }
> = (props) => {
  const { date, setCurrentDate, ...rest } = props;
  const [selectedDate, setSelectedDate] = useState<Dayjs>(date);
  return (
    <Widget {...rest} xs={6}>
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
