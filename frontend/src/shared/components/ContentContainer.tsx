import { Grid } from '@mui/material';
import { FunctionComponent, PropsWithChildren } from 'react';

const ContentContainer: FunctionComponent<
  PropsWithChildren<{
    renderNavigationBar?: boolean;
  }>
> = ({ children, renderNavigationBar }) => {
  return (
    <Grid container item lg={renderNavigationBar ? 12 : 10} padding={2}>
      {children}
    </Grid>
  );
};

export default ContentContainer;
