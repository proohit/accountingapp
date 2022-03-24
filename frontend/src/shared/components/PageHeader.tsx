import { Grid, Typography } from '@mui/material';
import React from 'react';

type Props = {
  icon?: JSX.Element;
  header: string;
  actions?: JSX.Element;
};

const PageHeader = (props: Props) => {
  const { actions, header, icon } = props;
  return (
    <Grid item container alignItems="center" spacing={2}>
      {icon && <Grid item>{icon}</Grid>}
      <Grid item>
        <Typography color="primary" variant="h3">
          {header}
        </Typography>
      </Grid>
      {actions && <Grid item>{actions}</Grid>}
    </Grid>
  );
};
export default PageHeader;
