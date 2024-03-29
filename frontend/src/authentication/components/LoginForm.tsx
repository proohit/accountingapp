import {
  Button,
  Container,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useFormik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import * as yup from 'yup';
import { useAuthentication } from '../hooks/useAuthentication';

const useStyles = makeStyles()((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const LoginForm = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { login, isLoginLoading } = useAuthentication();

  let schema = yup.object().shape({
    username: yup.string().required('Please enter your username'),
    password: yup.string().required('Please enter your password'),
  });

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      attemptLogin(values.username, values.password);
    },
  });

  const attemptLogin = async (username, password) => {
    const user = await login(username, password);
    if (user) {
      router.push('/home');
    }
  };

  return (
    <Container maxWidth="xs">
      <Grid
        container
        direction="row"
        justifyContent="center"
        className={classes.paper}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            error={!!errors.username}
            helperText={errors.username}
            onChange={handleChange}
            value={values.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password}
            onChange={handleChange}
            value={values.password}
          />
          {isLoginLoading && <LinearProgress />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        <Typography variant="body2">
          Or{' '}
          <Link href="/register" passHref>
            <Button size="small" variant="outlined">
              sign up
            </Button>
          </Link>{' '}
          if you&apos;re new here
        </Typography>
        <Typography variant="body2">
          Trouble signing in? Try to
          <Link href="/settings/reset-password" passHref>
            <Button size="small" variant="outlined">
              reset your password
            </Button>
          </Link>
          .
        </Typography>
      </Grid>
    </Container>
  );
};
