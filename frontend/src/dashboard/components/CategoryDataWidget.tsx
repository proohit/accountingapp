import { FunctionComponent, PropsWithChildren } from 'react';
import { DateableWidget } from '../models/DateableWidget';
import { EditableWidgetProps } from '../models/EditableWidgetProps';
import MonthlyCategory from './MonthlyCategory';
import Widget from './Widget';

export const CategoryDataWidget: FunctionComponent<
  PropsWithChildren<EditableWidgetProps & DateableWidget>
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
