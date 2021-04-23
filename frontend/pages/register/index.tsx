import Head from 'next/head';
import React, { FunctionComponent } from 'react';
import { RegisterForm } from '../../src/authentication/components/RegisterForm';

const RegisterPage: FunctionComponent = (props) => {
  return (
    <>
      <Head>
        <title>Register - AccountingApp</title>
        <meta
          property="og:title"
          content="Register - AccountingApp"
          key="title"
        />
        <meta
          property="og:description"
          content="Register page"
          key="description"
        />
      </Head>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
