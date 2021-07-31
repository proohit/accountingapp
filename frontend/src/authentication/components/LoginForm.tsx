import {
  Button,
  Container,
  Grid,
  LinearProgress,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import {
  getPasswordValidationError,
  getUsernameValidationError,
} from '../services/AuthenticationValidator';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function LoginForm() {
  const classes = useStyles();
  const router = useRouter();
  const { login, isLoginLoading } = useAuthentication();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [usernameValid, setUsernameValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const isValid = usernameValid && passwordValid;

  const validateUsername = (usernameToValidate: string) => {
    let error = getUsernameValidationError(usernameToValidate);
    setUsernameError(error);
    setUsernameValid(!error);
  };

  const validatePassword = (passwordToValidate: string) => {
    let error = getPasswordValidationError(passwordToValidate);
    setPasswordError(error);
    setPasswordValid(!error);
  };
  const handleFieldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const field = event.target.name || event.currentTarget.name;
    const value = event.target.value || event.currentTarget.value;
    if (field === 'username') {
      validateUsername(value);
      setUsername(value);
    } else if (field === 'password') {
      validatePassword(value);
      setPassword(value);
    }
  };
  const handleSubmit = async () => {
    const user = await login(username, password);
    if (user) {
      router.push('/home');
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
    <Container maxWidth="xs">
      <Grid
        container
        direction="row"
        justify="center"
        className={classes.paper}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
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
          onKeyPress={handleEnterPress}
          error={!!usernameError}
          helperText={usernameError}
          onChange={handleFieldChange}
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
          onKeyPress={handleEnterPress}
          error={!!passwordError}
          helperText={passwordError}
          onChange={handleFieldChange}
        />
        {isLoginLoading && <LinearProgress />}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!isValid}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Typography variant="body2">
          Or{' '}
          <Link href="/register" passHref>
            <Button size="small" variant="outlined">
              sign up
            </Button>
          </Link>{' '}
          if you're new here
        </Typography>
      </Grid>
    </Container>
  );
}
