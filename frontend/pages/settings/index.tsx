import Head from 'next/head';
import React from 'react';
import { SettingsEntries } from '../../src/settings/components/SettingsEntries';

const SettingsPage: React.FunctionComponent = (props) => {
  return (
    <>
      <Head>
        <title>Settings - AccountingApp</title>
        <meta
          property="og:title"
          content="Settings - AccountingApp"
          key="title"
        />
        <meta
          property="og:description"
          content="Settings page"
          key="description"
        />
      </Head>
      <SettingsEntries />
    </>
  );
};
export default SettingsPage;
