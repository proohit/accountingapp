import { Dayjs } from 'dayjs';
import * as React from 'react';
import MonthlyCategory from './MonthlyCategory';
import Widget from './Widget';
import { EditableWidgetProps } from '../models/EditableWidgetProps';
import { DateableWidget } from '../models/DateableWidget';

export const CategoryDataWidget: React.FC<
  EditableWidgetProps & DateableWidget
> = (props) => {
  const { date, ...rest } = props;
  return (
    <Widget
      {...rest}
      xs={12}
      md={6}
      title={`Categories for ${date.format('MMMM YYYY')}`}
    >
      <MonthlyCategory date={date} />
    </Widget>
  );
};
