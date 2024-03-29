export enum AvailableWidgets {
  GENERAL_HEADER = 'general-header',
  OVERVIEW_HEADER = 'overview-header',
  HISTORICAL_DATA_HEADER = 'historical-data-header',
  QUICK_ACTIONS = 'quick-actions',
  MONTH_PICKER = 'month-picker',
  MONTH_STATUS = 'month-status',
  LATEST_RECORDS = 'latest-records',
  THIS_YEAR = 'this-year',
  CATEGORY_DATA = 'category-data',
  CURRENT_STATUS = 'current-status',
  DAILY_RECORDS = 'daily-records',
}

export const DEFAULT_WIDGETS: AvailableWidgets[] = [
  AvailableWidgets.GENERAL_HEADER,
  AvailableWidgets.QUICK_ACTIONS,
  AvailableWidgets.MONTH_PICKER,
  AvailableWidgets.OVERVIEW_HEADER,
  AvailableWidgets.MONTH_STATUS,
  AvailableWidgets.CATEGORY_DATA,
  AvailableWidgets.DAILY_RECORDS,
  AvailableWidgets.HISTORICAL_DATA_HEADER,
  AvailableWidgets.LATEST_RECORDS,
  AvailableWidgets.THIS_YEAR,
  AvailableWidgets.CURRENT_STATUS,
];
