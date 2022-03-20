import { Dayjs } from 'dayjs';
import * as React from 'react';
import MonthlyCategory from './MonthlyCategory';
import Widget from './Widget';
import { MovableWidgetProps } from '../models/MovableWidgetProps';
import { DateableWidget } from '../models/DateableWidget';

export const CategoryDataWidget: React.FC<
  MovableWidgetProps & DateableWidget
> = (props) => {
  const { date, ...rest } = props;
  return (
    <Widget
      widgetId="category-data"
      xs={12}
      md={6}
      title={`Categories for ${date.format('MMMM YYYY')}`}
      {...rest}
    >
      <MonthlyCategory date={date} />
    </Widget>
  );
};
