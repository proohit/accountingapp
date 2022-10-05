import { Grid } from '@mui/material';
import { FunctionComponent, PropsWithChildren } from 'react';

const ContentContainer: FunctionComponent<
  PropsWithChildren<{
    isAuthenticationRoute?: boolean;
  }>
> = ({ children, isAuthenticationRoute }) => {
  return (
    <Grid container item lg={isAuthenticationRoute ? 12 : 10} padding={2}>
      {children}
    </Grid>
  );
};

export default ContentContainer;
