import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import Link from 'next/link';
import { FunctionComponent, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import * as yup from 'yup';
import { notificationState } from '../../shared/hooks/notificationState';
import { useAuthentication } from '../hooks/useAuthentication';
import { AUTHENTICATION_API } from '../services/AuthenticationApi';
import { registerGreetingState } from './registerGreetingState';

export const RegisterForm: FunctionComponent = () => {
  const [registerGreeting, setRegisterGreeting] = useRecoilState(
    registerGreetingState
  );
  const setNotification = useSetRecoilState(notificationState);
  const [registerLoading, setRegisterLoading] = useState(false);

  const {
    offlineLogin,
    isLoginLoading,
    username: loggedInUsername,
  } = useAuthentication();

  const { errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
      email: '',
    },
    validateOnChange: false,
    validationSchema: yup.object().shape({
      username: yup.string().required('Please enter your username'),
      password: yup.string().required('Please enter your password'),
      passwordConfirmation: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
      email: yup.string().email('Please enter a valid email address'),
    }),
    onSubmit: (values) => {
      attemptRegister(values.username, values.password, values.email);
    },
  });

  const attemptRegister = async (
    username: string,
    password: string,
    email: string
  ) => {
    setRegisterLoading(true);
    try {
      const createdUser = await AUTHENTICATION_API.register(
        username,
        password,
        email
      );
      setRegisterGreeting(true);
      offlineLogin(createdUser);
    } catch (err) {
      setNotification({ severity: 'error', content: err?.message });
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <>
      <Dialog open={registerGreeting}>
        <DialogTitle>
          <Typography>Welcome!</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h5">
            Hi, <b>{loggedInUsername}</b>!
          </Typography>
          <Typography>
            We are happy to see you here. To be able to track your records, you
            will need to create a wallet. Go to the{' '}
            <Link href="/wallets" passHref>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                component="a"
                onClick={() => setRegisterGreeting(false)}
              >
                Wallets page
              </Button>
            </Link>{' '}
            to create your first wallet.
          </Typography>
        </DialogContent>
      </Dialog>
      <Container maxWidth="xs">
        <Grid
          container
          direction="row"
          justifyContent="center"
          sx={{
            mt: 10,
          }}
        >
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              error={!!errors.username}
              helperText={errors.username}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="Confirm Password"
              type="password"
              id="passwordConfirmation"
              autoComplete="current-password"
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation}
              onChange={handleChange}
            />
            {(isLoginLoading || registerLoading) && <LinearProgress />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Register
            </Button>
          </form>
          <Typography variant="body2">
            Or{' '}
            <Link href="/login" passHref>
              <Button size="small" variant="outlined">
                sign in
              </Button>
            </Link>{' '}
            if you&apos;re already registered
          </Typography>
        </Grid>
      </Container>
    </>
  );
};
