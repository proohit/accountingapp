import { Button, Grid, TextField } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import * as yup from 'yup';
import { notificationState } from '../../shared/hooks/notificationState';
import { SettingsApiService } from '../services/SettingsApi';

const changePasswordFormStyles = makeStyles()((theme) => ({
  form: {
    gap: theme.spacing(3),
  },
}));

type ResetPasswordFormProps = {
  resetToken: string;
};

export const ResetPasswordForm: FC<ResetPasswordFormProps> = (props) => {
  const { resetToken } = props;
  const [, setNotificationsState] = useRecoilState(notificationState);
  const { classes } = changePasswordFormStyles();
  let schema = yup.object().shape({
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
    handleReset,
    handleBlur,
  } = useFormik({
    initialValues: {
      newPassword: '',
      newPasswordConfirmation: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      resetPassword(values.newPassword);
    },
  });

  const resetPassword = async (newPassword: string) => {
    const apiService = new SettingsApiService();
    try {
      await apiService.resetPassword(newPassword, resetToken);
      setNotificationsState({
        content: 'Successfully reset password',
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
        <Button variant="contained" color="primary" type="submit">
          Confirm
        </Button>
      </Grid>
    </form>
  );
};
