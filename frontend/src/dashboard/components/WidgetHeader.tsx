import {
  AvailableWidgets,
  isHeaderWidget,
  widgetLabels,
} from '@accountingapp/shared';
import { AddBox, DragIndicator } from '@mui/icons-material';
import {
  AppBar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  FunctionComponent,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useState,
} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DragIcon } from './DragIcon';
import { WidgetProps } from './Widget';

export type HeaderWidgetProps = Partial<WidgetProps> & {
  addableWidgets: AvailableWidgets[];
  widgetAdded: (widget: AvailableWidgets) => void;
};

type WidgetDragObject = {
  widgetId: AvailableWidgets;
};

type WidgetDropCollectedProps = {
  isOver: boolean;
};

export const WidgetHeader: FunctionComponent<HeaderWidgetProps> = (props) => {
  const { title, widgetAdded, addableWidgets, widgetId, onWidgetDrop } = props;
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, drag, preview] = useDrag<WidgetDragObject>(
    () => ({
      type: 'widgetHeader',
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
      accept: 'widgetHeader',
      canDrop: (item) =>
        item.widgetId !== widgetId && isHeaderWidget(item.widgetId),
      drop: (item) => {
        onWidgetDrop(item.widgetId, widgetId);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver() && !!monitor.canDrop(),
      }),
    }),
    [widgetId, onWidgetDrop]
  );
  const openMenu = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    setMenuOpen(true);
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setMenuAnchor(null);
  };

  useEffect(() => {
    if (!menuOpen && !!menuAnchor) {
      return;
    }
    addableWidgets?.length === 0 && closeMenu();
  }, [menuOpen, menuAnchor, addableWidgets]);

  return (
    <Grid xs={12} item ref={preview}>
      <AppBar
        ref={drop}
        color="primary"
        position="static"
        style={{ zIndex: 0 }}
      >
        <Toolbar variant="dense">
          <Typography variant="h6">{title}</Typography>
          <Grid xs item container justifyContent="flex-end">
            <DragIcon item ref={drag}>
              <DragIndicator />
            </DragIcon>
            <Tooltip title="Add Widget">
              <span>
                <IconButton
                  disabled={addableWidgets?.length > 0}
                  color="secondary"
                  onClick={openMenu}
                >
                  <AddBox />
                </IconButton>
              </span>
            </Tooltip>
            <Menu
              anchorEl={menuAnchor}
              open={menuOpen}
              onClose={closeMenu}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              {addableWidgets?.map((widgetId) => (
                <MenuItem key={widgetId} onClick={() => widgetAdded(widgetId)}>
                  {widgetLabels[widgetId]}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
