import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useRecoilState } from 'recoil';
import * as yup from 'yup';
import { notificationState } from '../../shared/hooks/notificationState';
import { SettingsApiService } from '../services/SettingsApi';

const changePasswordFormStyles = makeStyles((theme) => ({
  form: {
    gap: theme.spacing(3),
  },
}));
export const ChangePasswordForm: React.FunctionComponent = () => {
  const [, setNotificationsState] = useRecoilState(notificationState);
  const classes = changePasswordFormStyles();
  let schema = yup.object().shape({
    currentPassword: yup
      .string()
      .required('Please provide your current password'),
    newPassword: yup
      .string()
      .required('Please provide a new password')
      .notOneOf(
        [yup.ref('currentPassword')],
        'Password must not match the old one!'
      ),
    newPasswordConfirmation: yup
      .string()
      .required('Please provide the new password again')
      .oneOf([yup.ref('newPassword')], 'Passwords must match'),
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isValid,
    handleBlur,
    handleReset,
  } = useFormik({
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
    try {
      await apiService.changePassword(currentPassword, newPassword);
      setNotificationsState({
        content: 'Successfully updated password',
        severity: 'success',
      });
      handleReset(undefined);
    } catch (e) {
      setNotificationsState({
        content: e.message,
        severity: 'error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" className={classes.form}>
        <TextField
          type="password"
          label="Current Password"
          name="currentPassword"
          value={values.currentPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword}
        />
        <TextField
          type="password"
          label="New Password"
          name="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
        />
        <TextField
          type="password"
          label="Confirm new password"
          name="newPasswordConfirmation"
          value={values.newPasswordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.newPasswordConfirmation}
          helperText={errors.newPasswordConfirmation}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isValid}
        >
          Confirm
        </Button>
      </Grid>
    </form>
  );
};