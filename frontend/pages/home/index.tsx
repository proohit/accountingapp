import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import Head from 'next/head';
import { FunctionComponent, useState } from 'react';
import { CategoryDataWidget } from '../../src/dashboard/components/CategoryDataWidget';
import { CurrentStatusWidget } from '../../src/dashboard/components/CurrentStatusWidget';
import { DailyDataWidget } from '../../src/dashboard/components/DailyDataWidget';
import { LatestRecordsWidget } from '../../src/dashboard/components/LatestRecordsWidget';
import { LoadingWidgets } from '../../src/dashboard/components/LoadingWidgets';
import { MonthPickerWidget } from '../../src/dashboard/components/MonthPickerWidget';
import { MonthStatusWidget } from '../../src/dashboard/components/MonthStatusWidget';
import { QuickActionsWidget } from '../../src/dashboard/components/QuickActionsWidget';
import { ThisYearWidget } from '../../src/dashboard/components/ThisYearWidget';
import { WidgetProps } from '../../src/dashboard/components/Widget';
import {
  HeaderWidgetProps,
  WidgetHeader,
} from '../../src/dashboard/components/WidgetHeader';
import {
  getHeaderWidgetOfWidget,
  headerWidgetMapping,
  widgetLabels,
} from '../../src/dashboard/constants/widgets';
import { AvailableWidgets } from '../../src/dashboard/models/AvailableWidgets';
import {
  useUpdateUserSettingsMutation,
  useUserSettingsQuery,
} from '../../src/settings/hooks/useSettingsQuery';
import { useWalletsQuery } from '../../src/wallets/hooks/walletsQueries';

const DashboardPage: FunctionComponent = (props) => {
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
    };
    switch (widgetId) {
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
      case AvailableWidgets.GENERAL_HEADER:
        return <WidgetHeader key={widgetId} {...headerWidgetProps} />;
      case AvailableWidgets.HISTORICAL_DATA_HEADER:
        return <WidgetHeader key={widgetId} {...headerWidgetProps} />;
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
      case AvailableWidgets.OVERVIEW_HEADER:
        return <WidgetHeader key={widgetId} {...headerWidgetProps} />;
      case AvailableWidgets.QUICK_ACTIONS:
        return <QuickActionsWidget key={widgetId} {...editableWidgetProps} />;
      case AvailableWidgets.THIS_YEAR:
        return <ThisYearWidget key={widgetId} {...editableWidgetProps} />;
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard - AccountingApp</title>
        <meta
          property="og:title"
          content="Dashboard - AccountingApp"
          key="title"
        />
        <meta
          property="og:description"
          content="Personal dashboard in the AccountingApp"
          key="description"
        />
      </Head>
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
    </>
  );
};

export default DashboardPage;
