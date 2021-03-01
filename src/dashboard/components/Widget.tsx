import {
  Box,
  Grid,
  GridProps,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import * as React from 'react';

interface IWidgetProps {
  title?: string;
  actions?: JSX.Element;
  xs?: GridProps['xs'];
  lg?: GridProps['lg'];
  md?: GridProps['md'];
  sm?: GridProps['sm'];
  xl?: GridProps['xl'];
}

const widgetStyle = makeStyles((theme) => ({
  widget: {
    padding: theme.spacing(2),
  },
}));

const Widget: React.FunctionComponent<IWidgetProps> = (props) => {
  const { children, title, actions, lg, md, sm, xl, xs } = props;
  const classes = widgetStyle();
  return (
    <Grid item xs={xs || 12} lg={lg} md={md} xl={xl} sm={sm}>
      <Paper variant="outlined" className={classes.widget}>
        {(title || actions) && (
          <Grid container direction="row">
            {title && (
              <Grid item xs>
                {<Typography variant="h6">{title}</Typography>}
              </Grid>
            )}
            {actions && (
              <Grid item container justify="flex-end" xs>
                {actions}
              </Grid>
            )}
          </Grid>
        )}
        <Box overflow="auto">{children}</Box>
      </Paper>
    </Grid>
  );
};

export default Widget;
