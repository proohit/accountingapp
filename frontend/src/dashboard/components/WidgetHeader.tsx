import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';

type WidgetHeaderProps = {
  title: string;
};
export const WidgetHeader: React.FunctionComponent<WidgetHeaderProps> = (
  props
) => {
  const { title } = props;
  return (
    <Grid xs={12} item>
      <AppBar color="primary" position="static" style={{ zIndex: 0 }}>
        <Toolbar variant="dense">
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
