import { Button, Grid, Typography } from '@mui/material';
import Router from 'next/router';
import { Component, PropsWithChildren } from 'react';

export class GlobalErrorBoundary extends Component<
  PropsWithChildren,
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  reloadApp() {
    Router.reload();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item>
            <Typography variant="h1" color="primary">
              :(
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3" color="primary">
              Something wrent wrong...
            </Typography>
            <Typography variant="h4" color="primary">
              Try reloading the app
            </Typography>
            <Button variant="contained" onClick={this.reloadApp}>
              Reload
            </Button>
          </Grid>
        </Grid>
      );
    }

    return this.props.children;
  }
}
