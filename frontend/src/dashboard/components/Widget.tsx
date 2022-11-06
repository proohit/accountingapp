import {
  AvailableWidgets,
  getHeaderWidgetOfWidget,
} from '@accountingapp/shared';
import {
  Block,
  Close,
  DragIndicator,
  ExpandLess,
  ExpandMore,
  SwapHoriz,
} from '@mui/icons-material';
import {
  Box,
  Collapse,
  Grid,
  GridProps,
  IconButton,
  Paper,
  styled,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { FunctionComponent, PropsWithChildren, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DragIcon } from './DragIcon';

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
    sourceWidget: AvailableWidgets,
    targetWidget: AvailableWidgets
  ) => void;
  widgetId: AvailableWidgets;
  onWidgetRemove: (widget: AvailableWidgets) => void;
}

type WidgetDragObject = {
  widgetId: AvailableWidgets;
};

type WidgetDropCollectedProps = {
  isOver: boolean;
  isSomeWidgetDragging: boolean;
  allowDrop: boolean;
  blockDrop: boolean;
};

const DropOverlay = styled('div')({
  width: '100%',
  height: '100%',
});

const IconOverlay = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const BlockOverlay = styled(Block)({
  width: 48,
  height: 48,
});

const SwapOverlay = styled(SwapHoriz)({
  width: 48,
  height: 48,
});

const Widget: FunctionComponent<PropsWithChildren<WidgetProps>> = (props) => {
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
    onWidgetRemove,
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

  const [{ isOver, isSomeWidgetDragging, allowDrop, blockDrop }, drop] =
    useDrop<WidgetDragObject, unknown, WidgetDropCollectedProps>(
      () => ({
        accept: 'widget',
        canDrop: (item) =>
          item.widgetId !== widgetId &&
          getHeaderWidgetOfWidget(item.widgetId) ===
            getHeaderWidgetOfWidget(widgetId),
        drop: (item) => {
          onWidgetDrop(widgetId, item.widgetId);
        },
        collect: (monitor) => ({
          isOver: !!monitor.isOver() && !!monitor.canDrop(),
          blockDrop:
            monitor.getItemType() === 'widget' &&
            !!monitor.getItem() &&
            !monitor.canDrop(),
          allowDrop:
            monitor.getItemType() === 'widget' &&
            !!monitor.getItem() &&
            monitor.canDrop(),
          isSomeWidgetDragging:
            monitor.getItemType() === 'widget' && !!monitor.getItem(),
        }),
      }),
      [widgetId, onWidgetDrop]
    );

  return (
    <Grid ref={preview} item xs={xs || 12} lg={lg} md={md} xl={xl} sm={sm}>
      <Paper
        sx={{
          ...(isOver && {
            border: '2px dashed #ccc',
          }),
        }}
        ref={drop}
        variant="outlined"
      >
        <DropOverlay
          sx={(theme) => ({
            ...(isSomeWidgetDragging && {
              opacity: 0.5,
              filter: 'blur(1px)',
            }),
            padding: theme.spacing(2),
          })}
        >
          {isSomeWidgetDragging && (
            <IconOverlay>
              {allowDrop && <SwapOverlay />}
              {blockDrop && <BlockOverlay />}
            </IconOverlay>
          )}
          {(title || actions || !disableClosable) && (
            <Grid container direction="row">
              {title && (
                <Grid item xs>
                  {<Typography variant="h6">{title}</Typography>}
                </Grid>
              )}
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
                <Grid item>
                  <IconButton onClick={() => onWidgetRemove(widgetId)}>
                    <Close />
                  </IconButton>
                </Grid>
                {!disableClosable && (
                  <Grid item>
                    <IconButton onClick={() => setOpen(!open)}>
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
          <Collapse in={open}>
            <Box overflow="auto">{children}</Box>
          </Collapse>
        </DropOverlay>
      </Paper>
    </Grid>
  );
};

export default Widget;
