import { Grid } from '@material-ui/core';
import dayjs from 'dayjs';
import Head from 'next/head';
import * as React from 'react';
import { CategoryDataWidget } from '../../src/dashboard/components/CategoryDataWidget';
import { CurrentStatusWidget } from '../../src/dashboard/components/CurrentStatusWidget';
import { DailyDataWidget } from '../../src/dashboard/components/DailyDataWidget';
import { GeneralHeaderWidget } from '../../src/dashboard/components/GeneralHeaderWidget';
import { HistoricalDataHeaderWidget } from '../../src/dashboard/components/HistoricalDataHeaderWidget';
import { LatestRecordsWidget } from '../../src/dashboard/components/LatestRecordsWidget';
import { MonthPickerWidget } from '../../src/dashboard/components/MonthPickerWidget';
import { MonthStatusWidget } from '../../src/dashboard/components/MonthStatusWidget';
import { OverviewHeaderWidget } from '../../src/dashboard/components/OverviewHeaderWidget';
import { QuickActionsWidget } from '../../src/dashboard/components/QuickActionsWidget';
import { ThisYearWidget } from '../../src/dashboard/components/ThisYearWidget';
import { AvailableWidgets } from '../../src/dashboard/models/AvailableWidgets';
import { useWalletsQuery } from '../../src/wallets/hooks/walletsQueries';

const defaultWidgetIdsOrder: AvailableWidgets[] = [
  'general-header',
  'quick-actions',
  'month-picker',
  'overview-header',
  'month-status',
  'category-data',
  'current-status',
  'daily-records',
  'historical-data-header',
  'latest-records',
  'this-year',
];

const DashboardPage: React.FunctionComponent = (props) => {
  const [selectedWallet, setSelectedWallet] = React.useState('all');
  const [currentDate, setCurrentDate] = React.useState(dayjs());
  const { data: wallets } = useWalletsQuery();

  const [dashboardWidgetsOrder, setDashboardWidgetsOrder] = React.useState<
    AvailableWidgets[]
  >(defaultWidgetIdsOrder);

  const handleWidgetMove = (
    target: string,
    event: React.DragEvent<HTMLDivElement>
  ) => {
    const sourceWidget = event.dataTransfer.types[0];
    const targetWidget = target;
    const newOrders = [...dashboardWidgetsOrder];
    const sourceIndex = newOrders.indexOf(sourceWidget as AvailableWidgets);
    const targetIndex = newOrders.indexOf(targetWidget as AvailableWidgets);
    newOrders[sourceIndex] = targetWidget as AvailableWidgets;
    newOrders[targetIndex] = sourceWidget as AvailableWidgets;
    setDashboardWidgetsOrder(newOrders);
  };

  const getWidgetForWidgetId = (widgetId: AvailableWidgets) => {
    switch (widgetId) {
      case 'category-data':
        return (
          <CategoryDataWidget
            key={widgetId}
            date={currentDate}
            onWidgetDrop={handleWidgetMove}
          />
        );
      case 'current-status':
        return (
          <CurrentStatusWidget
            key={widgetId}
            onWidgetDrop={handleWidgetMove}
            wallets={wallets}
          />
        );
      case 'daily-records':
        return (
          <DailyDataWidget
            key={widgetId}
            date={currentDate}
            onWidgetDrop={handleWidgetMove}
            selectedWallet={selectedWallet}
            setSelectedWallet={setSelectedWallet}
            wallets={wallets}
          />
        );
      case 'general-header':
        return <GeneralHeaderWidget key={widgetId} />;
      case 'historical-data-header':
        return <HistoricalDataHeaderWidget key={widgetId} />;
      case 'latest-records':
        return (
          <LatestRecordsWidget key={widgetId} onWidgetDrop={handleWidgetMove} />
        );
      case 'month-picker':
        return (
          <MonthPickerWidget
            key={widgetId}
            date={currentDate}
            onWidgetDrop={handleWidgetMove}
            setCurrentDate={setCurrentDate}
          />
        );
      case 'month-status':
        return (
          <MonthStatusWidget
            key={widgetId}
            date={currentDate}
            onWidgetDrop={handleWidgetMove}
          />
        );
      case 'overview-header':
        return <OverviewHeaderWidget key={widgetId} />;
      case 'quick-actions':
        return (
          <QuickActionsWidget key={widgetId} onWidgetDrop={handleWidgetMove} />
        );
      case 'this-year':
        return (
          <ThisYearWidget key={widgetId} onWidgetDrop={handleWidgetMove} />
        );
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
        {dashboardWidgetsOrder.map((widgetId) =>
          getWidgetForWidgetId(widgetId)
        )}
      </Grid>
    </>
  );
};

export default DashboardPage;
