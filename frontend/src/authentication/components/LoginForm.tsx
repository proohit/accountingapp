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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const router = useRouter();
  const { login, isLoginLoading } = useAuthentication();
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateUsername = () => {
    let error = getUsernameValidationError(username);
    setUsernameError(error);
    setIsValid(!getPasswordValidationError(password) && !error);
  };

  const validatePassword = () => {
    let error = getPasswordValidationError(password);
    setPasswordError(error);
    setIsValid(!getUsernameValidationError(username) && !error);
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
          onBlur={() => validateUsername()}
          onChange={(event) => setUsername(event.target.value)}
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
          onBlur={() => validatePassword()}
          error={!!passwordError}
          helperText={passwordError}
          onChange={(event) => setPassword(event.target.value)}
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
