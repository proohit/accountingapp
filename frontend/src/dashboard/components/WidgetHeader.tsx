import { AddBox } from '@mui/icons-material';
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
  useState,
  useEffect,
} from 'react';
import { widgetLabels } from '../constants/widgets';
import { AvailableWidgets } from '../models/AvailableWidgets';
import { WidgetProps } from './Widget';

export type HeaderWidgetProps = Partial<WidgetProps> & {
  addableWidgets: AvailableWidgets[];
  widgetAdded: (widget: AvailableWidgets) => void;
};

export const WidgetHeader: FunctionComponent<HeaderWidgetProps> = (props) => {
  const { title, widgetAdded, addableWidgets } = props;
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <Grid xs={12} item>
      <AppBar color="primary" position="static" style={{ zIndex: 0 }}>
        <Toolbar variant="dense">
          <Typography variant="h6">{title}</Typography>
          <Grid xs item container justifyContent="flex-end">
            <Tooltip title="Add Widget">
              <IconButton
                disabled={addableWidgets?.length <= 0}
                color="secondary"
                onClick={openMenu}
              >
                <AddBox />
              </IconButton>
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
