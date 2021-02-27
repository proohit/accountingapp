import {
  Grid,
  GridProps,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import * as React from 'react';

interface IWidgetProps {
  title?: string;
  width?: GridProps['xs'];
}

const widgetStyle = makeStyles((theme) => ({
  widget: {
    padding: theme.spacing(2),
  },
}));

const Widget: React.FunctionComponent<IWidgetProps> = (props) => {
  const { children, title, width } = props;
  const classes = widgetStyle();
  return (
    <Grid item xs={width || 12}>
      <Paper variant="outlined" className={classes.widget}>
        {title && <Typography variant="h6">{title}</Typography>}
        {children}
      </Paper>
    </Grid>
  );
};

export default Widget;
