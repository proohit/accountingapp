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
import { useRecoilState } from 'recoil';
import * as yup from 'yup';
import { SettingsApiService } from '../../src/settings/services/SettingsApi';
import { notificationState } from '../../src/shared/hooks/notificationState';

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
  const [notificationsState, setNotificationsState] =
    useRecoilState(notificationState);
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
        changePassword(values.currentPassword, values.newPassword);
      },
    });

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    const apiService = new SettingsApiService();
    await apiService.changePassword(currentPassword, newPassword);
    setNotificationsState({
      content: 'Successfully updated password',
      severity: 'success',
    });
  };

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
          <Grid container direction="column">
            <TextField
              type="password"
              label="Current Password"
              name="currentPassword"
              value={values.currentPassword}
              onChange={handleChange}
              error={errors.currentPassword && touched.currentPassword}
              helperText={
                errors.currentPassword && touched.currentPassword
                  ? errors.currentPassword
                  : null
              }
            />
            <TextField
              type="password"
              label="New Password"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              error={errors.newPassword && touched.newPassword}
              helperText={
                errors.newPassword && touched.newPassword
                  ? errors.newPassword
                  : null
              }
            />
            <TextField
              type="password"
              label="Confirm new password"
              name="newPasswordConfirmation"
              value={values.newPasswordConfirmation}
              onChange={handleChange}
              error={
                errors.newPasswordConfirmation &&
                touched.newPasswordConfirmation
              }
              helperText={
                errors.newPasswordConfirmation &&
                touched.newPasswordConfirmation
                  ? errors.newPasswordConfirmation
                  : null
              }
            />
            <Button type="submit" disabled={!isValid}>
              Confirm
            </Button>
          </Grid>
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
  return !!(errors[field] && touched[field]);
};

const getError = <R, _>(
  field: string,
  errors: FormikErrors<R>,
  touched: FormikTouched<R>
) => {
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
