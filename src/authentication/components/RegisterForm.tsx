import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React, { FunctionComponent, useState } from 'react';
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

export const RegisterForm: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const classes = useStyles();
  const router = useRouter();
  const { login } = useAuthentication();

  const handleSubmit = async () => {
    const createdUser = await AUTHENTICATION_API.register(
      username,
      password,
      email
    );
    login(createdUser.username);
    router.push('/home');
  };

  return (
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
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email"
              name="email"
              autoComplete="email"
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
              Register
            </Button>
          </div>
        </div>
      </Container>
    </Grid>
  );
};
