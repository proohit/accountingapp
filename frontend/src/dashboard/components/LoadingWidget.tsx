import { Box, Grid, GridProps, Paper, Typography } from '@mui/material';
import { FunctionComponent, PropsWithChildren } from 'react';
import { makeStyles } from 'tss-react/mui';

export interface WidgetProps {
  title?: string | JSX.Element;
  xs?: GridProps['xs'];
  lg?: GridProps['lg'];
  md?: GridProps['md'];
  sm?: GridProps['sm'];
  xl?: GridProps['xl'];
}

const widgetStyle = makeStyles()((theme) => ({
  widget: {
    padding: theme.spacing(2),
  },
}));

const LoadingWidget: FunctionComponent<PropsWithChildren<WidgetProps>> = (
  props
) => {
  const { children, title, lg, md, sm, xl, xs } = props;
  const { classes } = widgetStyle();
  return (
    <Grid item xs={xs || 12} lg={lg} md={md} xl={xl} sm={sm}>
      <Paper variant="outlined" className={classes.widget}>
        {title && (
          <Grid container direction="row">
            {title && (
              <Grid item xs>
                {typeof title === 'string' ? (
                  <Typography variant="h6">{title}</Typography>
                ) : (
                  title
                )}
              </Grid>
            )}
          </Grid>
        )}
        <Box overflow="auto">{children}</Box>
      </Paper>
    </Grid>
  );
};

export default LoadingWidget;
