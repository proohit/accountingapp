import {
  Box,
  Collapse,
  Grid,
  GridProps,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import * as React from 'react';

interface IWidgetProps {
  title?: string;
  actions?: JSX.Element[];
  xs?: GridProps['xs'];
  lg?: GridProps['lg'];
  md?: GridProps['md'];
  sm?: GridProps['sm'];
  xl?: GridProps['xl'];
  disableClosable?: boolean;
}

const widgetStyle = makeStyles((theme) => ({
  widget: {
    padding: theme.spacing(2),
  },
}));

const Widget: React.FunctionComponent<IWidgetProps> = (props) => {
  const { children, title, actions, lg, md, sm, xl, xs, disableClosable } =
    props;
  const classes = widgetStyle();
  const [open, setOpen] = React.useState(!disableClosable);
  return (
    <Grid item xs={xs || 12} lg={lg} md={md} xl={xl} sm={sm}>
      <Paper variant="outlined" className={classes.widget}>
        {(title || actions || !disableClosable) && (
          <Grid container direction="row">
            {title && (
              <Grid item xs>
                {<Typography variant="h6">{title}</Typography>}
              </Grid>
            )}
            {(!disableClosable || actions) && (
              <Grid item container justify="flex-end" xs>
                {actions?.map((action) => (
                  <Grid item>{action}</Grid>
                ))}
                {!disableClosable && (
                  <Grid item>
                    <IconButton onClick={() => setOpen(!open)}>
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        )}
        <Collapse in={open}>
          <Box overflow="auto">{children}</Box>
        </Collapse>
      </Paper>
    </Grid>
  );
};

export default Widget;
