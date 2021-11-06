import { Grid, Typography } from '@material-ui/core';
import React from 'react';

const OfflinePage: React.FC = (props) => {
  return (
    <Grid container alignItems="center" justify="center" direction="column">
      <Grid item>
        <Typography variant="h1" color="primary">
          :(
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h3" color="primary">
          It seems like you&apos;re offline...
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OfflinePage;
