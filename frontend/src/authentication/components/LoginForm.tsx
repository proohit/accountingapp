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
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { notificationState } from '../../shared/hooks/notificationState';
import { Error } from '../../shared/models/Error';
import USER_API_SERVICE from '../../users/services/UserApiService';
import { useAuthentication } from '../hooks/useAuthentication';
import { AUTHENTICATION_API } from '../services/AuthenticationApi';

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
  const [loginLoading, setLoginLoading] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  const { login } = useAuthentication();
  const [, setNotification] = useRecoilState(notificationState);

  const handleSubmit = async () => {
    try {
      setLoginLoading(true);
      await AUTHENTICATION_API.login(username, password);
      const loggedInUser = await USER_API_SERVICE.getCurrentUser();
      login(loggedInUser.username);
      router.push('/home');
    } catch (err) {
      const error: Error = err;
      setNotification({ severity: 'error', content: error.message });
    } finally {
      setLoginLoading(false);
    }
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
            {loginLoading && <LinearProgress />}
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
