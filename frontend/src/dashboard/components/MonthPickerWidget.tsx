import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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

  const updateDate = (acceptedDate: Dayjs): void => {
    setSelectedDate(acceptedDate);
    if (acceptedDate && acceptedDate.isValid()) {
      setCurrentDate(acceptedDate);
    }
  };

  return (
    <Widget {...rest} xs={6}>
      <Grid container alignItems="center">
        <Tooltip title="Previous month">
          <IconButton
            onClick={() => {
              updateDate(selectedDate.subtract(1, 'month'));
            }}
          >
            <ArrowLeft />
          </IconButton>
        </Tooltip>
        <DatePicker
          views={['year', 'month']}
          onChange={updateDate}
          openTo="month"
          value={selectedDate}
          label="Month"
        />
        <Tooltip title="Next month">
          <IconButton
            onClick={() => {
              updateDate(selectedDate.add(1, 'month'));
            }}
          >
            <ArrowRight />
          </IconButton>
        </Tooltip>
      </Grid>
    </Widget>
  );
};
