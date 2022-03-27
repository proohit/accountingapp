import Head from 'next/head';
import { FunctionComponent } from 'react';
import DashboardWidgets from '../../src/dashboard/components/DashboardWidgets';

const DashboardPage: FunctionComponent = (props) => {
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
      <DashboardWidgets />
    </>
  );
};

export default DashboardPage;
