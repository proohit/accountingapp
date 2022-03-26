import { DragIndicator, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Collapse,
  Grid,
  GridProps,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/styles';
import { FunctionComponent, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
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
  onWidgetDrop: (sourceWidget: string, targetWidget: string) => void;
  widgetId: AvailableWidgets;
}

const DragIcon = styled(Grid)(({ theme }) => ({
  cursor: 'move',
  padding: theme.spacing(1),
  height: theme.spacing(5),
  width: theme.spacing(5),
}));

type WidgetDragObject = {
  widgetId: string;
};

type WidgetDropCollectedProps = {
  isOver: boolean;
};

const Widget: FunctionComponent<WidgetProps> = (props) => {
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

  const [open, setOpen] = useState(!disableClosable);
  const isDesktop = useMediaQuery('(pointer: fine)');
  const [, drag, preview] = useDrag<WidgetDragObject>(
    () => ({
      type: 'widget',
      item: {
        widgetId,
      },
      options: {
        dropEffect: 'move',
      },
    }),
    [widgetId]
  );

  const [{ isOver }, drop] = useDrop<
    WidgetDragObject,
    unknown,
    WidgetDropCollectedProps
  >(
    () => ({
      accept: 'widget',
      canDrop: (item) => item.widgetId !== widgetId,
      drop: (item) => {
        onWidgetDrop(widgetId, item.widgetId);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver() && !!monitor.canDrop(),
      }),
    }),
    [widgetId, onWidgetDrop]
  );

  return (
    <Grid ref={preview} item xs={xs || 12} lg={lg} md={md} xl={xl} sm={sm}>
      <Paper
        sx={(theme) => ({
          ...(isOver && {
            border: '2px dashed #ccc',
          }),
          padding: theme.spacing(2),
        })}
        ref={drop}
        variant="outlined"
      >
        {(title || actions || !disableClosable) && (
          <Grid container direction="row">
            {title && (
              <Grid item xs>
                {<Typography variant="h6">{title}</Typography>}
              </Grid>
            )}
            {(!disableClosable || actions) && (
              <Grid
                item
                container
                justifyContent="flex-end"
                alignItems="center"
                xs
              >
                {open &&
                  actions?.map((action, idx) => (
                    <Grid key={idx} item>
                      {action}
                    </Grid>
                  ))}
                {isDesktop && (
                  <DragIcon item ref={drag}>
                    <DragIndicator />
                  </DragIcon>
                )}
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
