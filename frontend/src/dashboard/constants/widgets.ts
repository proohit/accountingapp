import { AvailableWidgets } from '../models/AvailableWidgets';

export const widgetLabels: { [key in AvailableWidgets]: string } = {
  [AvailableWidgets.GENERAL_HEADER]: 'General',
  [AvailableWidgets.QUICK_ACTIONS]: 'Quick Actions',
  [AvailableWidgets.MONTH_PICKER]: 'Month Picker',
  [AvailableWidgets.OVERVIEW_HEADER]: 'Overview',
  [AvailableWidgets.MONTH_STATUS]: 'Month Status',
  [AvailableWidgets.HISTORICAL_DATA_HEADER]: 'Historical Data',
  [AvailableWidgets.LATEST_RECORDS]: 'Latest Records',
  [AvailableWidgets.THIS_YEAR]: 'This Year',
  [AvailableWidgets.CATEGORY_DATA]: 'Category Data',
  [AvailableWidgets.CURRENT_STATUS]: 'Current Status',
  [AvailableWidgets.DAILY_RECORDS]: 'Daily Records',
};

export const headerWidgetMapping: {
  [key in AvailableWidgets]?: AvailableWidgets[];
} = {
  [AvailableWidgets.GENERAL_HEADER]: [
    AvailableWidgets.QUICK_ACTIONS,
    AvailableWidgets.MONTH_PICKER,
  ],
  [AvailableWidgets.OVERVIEW_HEADER]: [
    AvailableWidgets.MONTH_STATUS,
    AvailableWidgets.CATEGORY_DATA,
    AvailableWidgets.CURRENT_STATUS,
    AvailableWidgets.DAILY_RECORDS,
  ],
  [AvailableWidgets.HISTORICAL_DATA_HEADER]: [
    AvailableWidgets.LATEST_RECORDS,
    AvailableWidgets.THIS_YEAR,
  ],
};

export const getHeaderWidgetOfWidget = (widget: AvailableWidgets) => {
  const headerWidget = Object.keys(headerWidgetMapping).find((key) =>
    headerWidgetMapping[key].includes(widget)
  );
  return headerWidget as AvailableWidgets;
};

export const isHeaderWidget = (widget: AvailableWidgets) => {
  return Object.keys(headerWidgetMapping).includes(widget);
};
