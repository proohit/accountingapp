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
import { AvailableWidgets } from '../models/AvailableWidgets';

export interface WidgetProps {
  title?: string;
  actions?: JSX.Element[];
  xs?: GridProps['xs'];
  lg?: GridProps['lg'];
  md?: GridProps['md'];
  sm?: GridProps['sm'];
  xl?: GridProps['xl'];
  disableClosable?: boolean;
  onWidgetDrop: (
    target: string,
    event: React.DragEvent<HTMLDivElement>
  ) => void;
  widgetId: AvailableWidgets;
}

const widgetStyle = makeStyles((theme) => ({
  widget: {
    padding: theme.spacing(2),
  },
  dropTarget: {
    border: '2px dashed #ccc',
  },
}));

const Widget: React.FunctionComponent<WidgetProps> = (props) => {
  const {
    children,
    title,
    actions,
    lg,
    md,
    sm,
    xl,
    xs,
    disableClosable,
    onWidgetDrop,
    widgetId,
  } = props;
  const classes = widgetStyle();
  const [open, setOpen] = React.useState(!disableClosable);
  const [dropTarget, setDropTarget] = React.useState(false);
  return (
    <Grid
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData(widgetId, '');
        event.dataTransfer.effectAllowed = 'move';
      }}
      onDragOver={(event) => {
        event.preventDefault();
        const sourceWidgetKey = event.dataTransfer.types[0];
        const targetWidgetKey = widgetId;
        if (sourceWidgetKey === targetWidgetKey) {
          event.dataTransfer.dropEffect = 'none';
          setDropTarget(false);
        } else {
          event.dataTransfer.dropEffect = 'move';
          setDropTarget(true);
        }
      }}
      onDragLeave={() => {
        setDropTarget(false);
      }}
      onDrop={(event) => {
        setDropTarget(false);
        onWidgetDrop(widgetId, event);
      }}
      item
      xs={xs || 12}
      lg={lg}
      md={md}
      xl={xl}
      sm={sm}
    >
      <Paper
        variant="outlined"
        className={`${classes.widget} ${dropTarget && classes.dropTarget}`}
      >
        {(title || actions || !disableClosable) && (
          <Grid container direction="row">
            {title && (
              <Grid item xs>
                {<Typography variant="h6">{title}</Typography>}
              </Grid>
            )}
            {(!disableClosable || actions) && (
              <Grid item container justifyContent="flex-end" xs>
                {open &&
                  actions?.map((action, idx) => (
                    <Grid key={idx} item>
                      {action}
                    </Grid>
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
