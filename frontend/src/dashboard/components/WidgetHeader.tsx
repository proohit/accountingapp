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
  const menuOpen = Boolean(menuAnchor);

  const openMenu = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <Grid xs={12} item>
      <AppBar color="primary" position="static" style={{ zIndex: 0 }}>
        <Toolbar variant="dense">
          <Typography variant="h6">{title}</Typography>
          <Grid xs item container justifyContent="flex-end">
            {addableWidgets?.length > 0 && (
              <>
                <Tooltip title="Add Widget">
                  <IconButton color="secondary" onClick={openMenu}>
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
                  {addableWidgets.map((widgetId) => (
                    <MenuItem
                      key={widgetId}
                      onClick={() => widgetAdded(widgetId)}
                    >
                      {widgetLabels[widgetId]}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
