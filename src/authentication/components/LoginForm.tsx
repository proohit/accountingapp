import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import { AUTHENTICATION_API } from '../services/AuthenticationApi';
import USER_API_SERVICE from '../../users/services/UserApiService';

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

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const router = useRouter();
  const { login } = useAuthentication();

  const handleSubmit = async () => {
    const { token } = await AUTHENTICATION_API.login(username, password);
    const loggedInUser = await USER_API_SERVICE.getCurrentUser(token);
    console.log('login', token, loggedInUser);
    login(loggedInUser.username, token);
    router.push('/home');
  };

  return (
    <Grid container direction="row" justify="center">
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
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
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </div>
        </div>
      </Container>
    </Grid>
  );
}
