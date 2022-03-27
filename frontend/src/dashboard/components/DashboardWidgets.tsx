import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import { FunctionComponent, useState } from 'react';
import {
  useUpdateUserSettingsMutation,
  useUserSettingsQuery,
} from '../../settings/hooks/useSettingsQuery';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import {
  getHeaderWidgetOfWidget,
  headerWidgetMapping,
  widgetLabels,
} from '../constants/widgets';
import { AvailableWidgets } from '../models/AvailableWidgets';
import { CategoryDataWidget } from './CategoryDataWidget';
import { CurrentStatusWidget } from './CurrentStatusWidget';
import { DailyDataWidget } from './DailyDataWidget';
import { LatestRecordsWidget } from './LatestRecordsWidget';
import { LoadingWidgets } from './LoadingWidgets';
import { MonthPickerWidget } from './MonthPickerWidget';
import { MonthStatusWidget } from './MonthStatusWidget';
import { QuickActionsWidget } from './QuickActionsWidget';
import { ThisYearWidget } from './ThisYearWidget';
import { WidgetProps } from './Widget';
import { HeaderWidgetProps, WidgetHeader } from './WidgetHeader';

const DashboardWidgets: FunctionComponent = () => {
  const [selectedWallet, setSelectedWallet] = useState('all');

  const [currentDate, setCurrentDate] = useState(dayjs());
  const { data: wallets } = useWalletsQuery();
  const { data: dashboardWidgetsOrder, isLoading } = useUserSettingsQuery();
  const updateUserSettings = useUpdateUserSettingsMutation();

  const getMissingWidgetsForHeader = (
    headerWidget: AvailableWidgets
  ): AvailableWidgets[] => {
    const headerWidgets = headerWidgetMapping[headerWidget];
    if (!headerWidgets) {
      return [];
    }
    return headerWidgets.filter(
      (widget) => !dashboardWidgetsOrder.widgets.includes(widget)
    );
  };

  const handleWidgetAdd = async (widget: AvailableWidgets) => {
    const headerOfWidget = getHeaderWidgetOfWidget(widget);
    const indexOfHeader = dashboardWidgetsOrder.widgets.indexOf(headerOfWidget);
    if (indexOfHeader >= 0) {
      const newWidgets = [
        ...dashboardWidgetsOrder.widgets.slice(0, indexOfHeader + 1),
        widget,
        ...dashboardWidgetsOrder.widgets.slice(indexOfHeader + 1),
      ];
      await updateUserSettings.mutateAsync({
        widgets: newWidgets,
      });
    }
  };

  const handleWidgetMove = async (
    sourceWidget: AvailableWidgets,
    targetWidget: AvailableWidgets
  ) => {
    const newOrders = [...dashboardWidgetsOrder.widgets];
    const sourceIndex = newOrders.indexOf(sourceWidget);
    const targetIndex = newOrders.indexOf(targetWidget);
    newOrders[sourceIndex] = targetWidget;
    newOrders[targetIndex] = sourceWidget;
    await updateUserSettings.mutateAsync({ widgets: newOrders });
  };

  const handleHeaderWidgetMove = async (
    sourceWidget: AvailableWidgets,
    targetWidget: AvailableWidgets
  ) => {
    const widgets = [...dashboardWidgetsOrder.widgets];
    const usedWidgetsOfSourceHeader = headerWidgetMapping[sourceWidget].filter(
      (widget) => widgets.includes(widget)
    );
    const usedWidgetsOfTargetHeader = headerWidgetMapping[targetWidget].filter(
      (widget) => widgets.includes(widget)
    );
    let sourceWidgetIndex = widgets.indexOf(sourceWidget);
    let targetWidgetIndex = widgets.indexOf(targetWidget);
    if (sourceWidgetIndex > targetWidgetIndex) {
      widgets.splice(sourceWidgetIndex, usedWidgetsOfSourceHeader.length + 1);
      widgets.splice(
        sourceWidgetIndex,
        0,
        ...[targetWidget, ...usedWidgetsOfTargetHeader]
      );
      targetWidgetIndex = widgets.indexOf(targetWidget);
      widgets.splice(targetWidgetIndex, usedWidgetsOfTargetHeader.length + 1);
      widgets.splice(
        targetWidgetIndex,
        0,
        ...[sourceWidget, ...usedWidgetsOfSourceHeader]
      );
    } else {
      widgets.splice(targetWidgetIndex, usedWidgetsOfTargetHeader.length + 1);
      widgets.splice(
        targetWidgetIndex,
        0,
        ...[sourceWidget, ...usedWidgetsOfSourceHeader]
      );
      sourceWidgetIndex = widgets.indexOf(sourceWidget);
      widgets.splice(sourceWidgetIndex, usedWidgetsOfSourceHeader.length + 1);
      widgets.splice(
        sourceWidgetIndex,
        0,
        ...[targetWidget, ...usedWidgetsOfTargetHeader]
      );
    }
    await updateUserSettings.mutateAsync({ widgets });
  };

  const handleWidgetRemove = async (widget: AvailableWidgets) => {
    const newOrders = [...dashboardWidgetsOrder.widgets];
    const index = newOrders.indexOf(widget);
    newOrders.splice(index, 1);
    await updateUserSettings.mutateAsync({ widgets: newOrders });
  };

  const getWidgetForWidgetId = (widgetId: AvailableWidgets) => {
    const editableWidgetProps: WidgetProps = {
      title: widgetLabels[widgetId],
      onWidgetDrop: handleWidgetMove,
      onWidgetRemove: handleWidgetRemove,
      widgetId,
    };
    const headerWidgetProps: HeaderWidgetProps = {
      title: widgetLabels[widgetId],
      widgetAdded: handleWidgetAdd,
      addableWidgets: getMissingWidgetsForHeader(widgetId),
      onWidgetDrop: handleHeaderWidgetMove,
      widgetId,
    };
    switch (widgetId) {
      case AvailableWidgets.GENERAL_HEADER:
      case AvailableWidgets.HISTORICAL_DATA_HEADER:
      case AvailableWidgets.OVERVIEW_HEADER:
        return <WidgetHeader key={widgetId} {...headerWidgetProps} />;
      case AvailableWidgets.CATEGORY_DATA:
        return (
          <CategoryDataWidget
            key={widgetId}
            date={currentDate}
            {...editableWidgetProps}
          />
        );
      case AvailableWidgets.CURRENT_STATUS:
        return (
          <CurrentStatusWidget
            key={widgetId}
            wallets={wallets}
            {...editableWidgetProps}
          />
        );
      case AvailableWidgets.DAILY_RECORDS:
        return (
          <DailyDataWidget
            key={widgetId}
            date={currentDate}
            selectedWallet={selectedWallet}
            setSelectedWallet={setSelectedWallet}
            wallets={wallets}
            {...editableWidgetProps}
          />
        );
      case AvailableWidgets.LATEST_RECORDS:
        return <LatestRecordsWidget key={widgetId} {...editableWidgetProps} />;
      case AvailableWidgets.MONTH_PICKER:
        return (
          <MonthPickerWidget
            key={widgetId}
            date={currentDate}
            setCurrentDate={setCurrentDate}
            {...editableWidgetProps}
          />
        );
      case AvailableWidgets.MONTH_STATUS:
        return (
          <MonthStatusWidget
            key={widgetId}
            date={currentDate}
            {...editableWidgetProps}
          />
        );
      case AvailableWidgets.QUICK_ACTIONS:
        return <QuickActionsWidget key={widgetId} {...editableWidgetProps} />;
      case AvailableWidgets.THIS_YEAR:
        return <ThisYearWidget key={widgetId} {...editableWidgetProps} />;
    }
  };

  return (
    <Grid container spacing={2}>
      {isLoading ? (
        <LoadingWidgets />
      ) : (
        <>
          {dashboardWidgetsOrder.widgets.map((widgetId) =>
            getWidgetForWidgetId(widgetId)
          )}
        </>
      )}
    </Grid>
  );
};

export default DashboardWidgets;
