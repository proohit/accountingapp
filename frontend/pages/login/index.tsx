import Head from 'next/head';
import React, { FunctionComponent } from 'react';
import { LoginForm } from '../../src/authentication/components/LoginForm';

const LoginPage: FunctionComponent = (props) => {
  return (
    <>
      <Head>
        <title>Login - AccountingApp</title>
        <meta property="og:title" content="Login - AccountingApp" key="title" />
        <meta
          property="og:description"
          content="Login page"
          key="description"
        />
      </Head>
      <LoginForm />
    </>
  );
};

export default LoginPage;
