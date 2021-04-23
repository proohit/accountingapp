import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import React, { FunctionComponent, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { notificationState } from '../../shared/hooks/notificationState';
import { useAuthentication } from '../hooks/useAuthentication';
import { AUTHENTICATION_API } from '../services/AuthenticationApi';
import {
  getUsernameValidationError,
  getPasswordValidationError,
  getEmailValidationError,
} from '../services/AuthenticationValidator';
import { registerGreetingState } from './registerGreetingState';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const RegisterForm: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const [registerGreeting, setRegisterGreeting] = useRecoilState(
    registerGreetingState
  );
  const setNotification = useSetRecoilState(notificationState);
  const [registerLoading, setRegisterLoading] = useState(false);
  const classes = useStyles();
  const {
    offlineLogin,
    isLoginLoading,
    username: loggedInUsername,
  } = useAuthentication();

  const validateUsername = () => {
    let error = getUsernameValidationError(username);
    setUsernameError(error);
    setIsValid(
      !getPasswordValidationError(password) &&
        !getEmailValidationError(email) &&
        !error
    );
  };

  const validatePassword = () => {
    let error = getPasswordValidationError(password);
    setPasswordError(error);
    setIsValid(
      !getUsernameValidationError(username) &&
        !getEmailValidationError(email) &&
        !error
    );
  };

  const validateEmail = () => {
    let error = getEmailValidationError(email);
    setEmailError(error);
    setIsValid(
      !getUsernameValidationError(username) &&
        !getPasswordValidationError(password) &&
        !error
    );
  };

  const handleSubmit = async () => {
    setRegisterLoading(true);
    try {
      const createdUser = await AUTHENTICATION_API.register(
        username,
        password,
        email
      );
      setRegisterGreeting(true);
      offlineLogin(createdUser.username);
    } catch (err) {
      setNotification({ severity: 'error', content: err?.message });
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleEnterPress = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (event.key === 'Enter' && isValid) {
      handleSubmit();
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
      <Grid container direction="row" justify="center">
        <Container maxWidth="xs">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <div className={classes.form}>
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
                error={!!usernameError}
                helperText={usernameError}
                onBlur={() => validateUsername()}
                onKeyPress={handleEnterPress}
                onChange={(event) => setUsername(event.target.value)}
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
                error={!!emailError}
                helperText={emailError}
                onBlur={() => validateEmail()}
                onKeyPress={handleEnterPress}
                onChange={(event) => setEmail(event.target.value)}
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
                error={!!passwordError}
                helperText={passwordError}
                onBlur={() => validatePassword()}
                onKeyPress={handleEnterPress}
                onChange={(event) => setPassword(event.target.value)}
              />
              {(isLoginLoading || registerLoading) && <LinearProgress />}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!isValid}
                onClick={handleSubmit}
              >
                Register
              </Button>
            </div>
          </div>
        </Container>
      </Grid>
    </>
  );
};
