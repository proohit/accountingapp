import { makeStyles, Grid } from '@material-ui/core';
import { FunctionComponent } from 'react';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
  },
}));

const ContentContainer: FunctionComponent<{
  isAuthenticationRoute?: boolean;
}> = ({ children, isAuthenticationRoute }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      item
      lg={isAuthenticationRoute ? 12 : 10}
      className={classes.content}
    >
      {children}
    </Grid>
  );
};

export default ContentContainer;
