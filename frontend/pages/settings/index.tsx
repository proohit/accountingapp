import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { FormikErrors, FormikTouched, useFormik } from 'formik';
import Head from 'next/head';
import React from 'react';
import * as yup from 'yup';

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
      <ChangePasswordContainer />
    </>
  );
};

const ChangePasswordContainer: React.FunctionComponent = () => {
  let schema = yup.object().shape({
    currentPassword: yup.string().required(),
    newPassword: yup
      .string()
      .required()
      .notOneOf(
        [yup.ref('currentPassword')],
        'Password must not match the old one!'
      ),
    newPasswordConfirmation: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const { values, errors, handleChange, handleSubmit, isValid, touched } =
    useFormik({
      initialValues: {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
      },
      validationSchema: schema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <SettingsEntry>
      <SettingsEntryHeader>
        <Person color="primary" fontSize="large" />
        <Typography variant="h5" display="inline">
          Account Settings
        </Typography>
      </SettingsEntryHeader>
      <SettingsEntryContent>
        <form onSubmit={handleSubmit}>
          <TextField
            type="password"
            label="Current Password"
            name="currentPassword"
            value={values.currentPassword}
            onChange={handleChange}
            error={shouldDisplayError('currentPassword', errors, touched)}
            helperText={getError('currentPassword', errors, touched)}
          />
          <TextField
            type="password"
            label="New Password"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            error={shouldDisplayError('newPassword', errors, touched)}
            helperText={getError('newPassword', errors, touched)}
          />
          <TextField
            type="password"
            label="Confirm new password"
            name="newPasswordConfirmation"
            value={values.newPasswordConfirmation}
            onChange={handleChange}
            error={shouldDisplayError(
              'newPasswordConfirmation',
              errors,
              touched
            )}
            helperText={getError('newPasswordConfirmation', errors, touched)}
          />
          <Button type="submit" disabled={!isValid}>
            Confirm
          </Button>
        </form>
      </SettingsEntryContent>
    </SettingsEntry>
  );
};

const shouldDisplayError = <R, _>(
  field: string,
  errors: FormikErrors<R>,
  touched: FormikTouched<R>
) => {
  return errors[field] && touched[field];
};

const getError = (field: string, errors, touched) => {
  return errors[field] && touched[field] ? errors[field] : '';
};

const SettingsEntry: React.FunctionComponent = (props) => {
  const { children } = props;
  return <Paper>{children}</Paper>;
};

const SettingsEntryHeader: React.FunctionComponent = (props) => {
  const { children } = props;
  return (
    <>
      <Grid container direction="row" alignItems="center">
        {children}
      </Grid>
      <Divider />
    </>
  );
};
const SettingsEntryContent: React.FunctionComponent = (props) => {
  const { children } = props;
  return (
    <Grid container direction="column">
      {children}
    </Grid>
  );
};
export default SettingsPage;
