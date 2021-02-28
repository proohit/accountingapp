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
  const { children, title, lg, md, sm, xl, xs } = props;
  const classes = widgetStyle();
  return (
    <Grid item xs={xs || 12} lg={lg} md={md} xl={xl} sm={sm}>
      <Paper variant="outlined" className={classes.widget}>
        {title && <Typography variant="h6">{title}</Typography>}
        <Box overflow="auto">{children}</Box>
      </Paper>
    </Grid>
  );
};

export default Widget;
