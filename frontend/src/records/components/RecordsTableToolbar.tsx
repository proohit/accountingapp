import {
  Grid,
  Hidden,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { AddBox, FilterList, GetApp, MoreVert, Sort } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { RecordHeader } from './RecordHeader';

type RecordsTableToolbarProps = {
  onFilterClicked: () => void;
  onAddClicked: () => void;
  onSortClicked: () => void;
  onExportClicked: () => void;
};
export const RecordsTableToolbar: FunctionComponent<RecordsTableToolbarProps> =
  (props) => {
    const { onAddClicked, onFilterClicked, onSortClicked, onExportClicked } =
      props;
    const shouldShowExtraIcons = useMediaQuery('(max-width:450px');
    const shouldShowExport = useMediaQuery('(min-width:450px');
    const shouldShowSort = useMediaQuery('(min-width:450px');
    const shouldShowFilter = useMediaQuery('(min-width:400px');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <Grid item container xs>
          <RecordHeader />
          <Grid item xs container justify="flex-end">
            {shouldShowSort && (
              <Tooltip title="Sort">
                <IconButton onClick={onSortClicked} color="primary">
                  <Sort />
                </IconButton>
              </Tooltip>
            )}
            {shouldShowFilter && (
              <Tooltip title="Filters">
                <IconButton onClick={onFilterClicked} color="primary">
                  <FilterList />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Add">
              <IconButton onClick={onAddClicked} color="primary">
                <AddBox />
              </IconButton>
            </Tooltip>
            {shouldShowExport && (
              <Tooltip title="Export">
                <IconButton onClick={onExportClicked} color="primary">
                  <GetApp />
                </IconButton>
              </Tooltip>
            )}
            {shouldShowExtraIcons && (
              <>
                <IconButton onClick={handleClick}>
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={!!anchorEl}
                  onClose={handleClose}
                >
                  {!shouldShowSort && (
                    <MenuItem button onClick={onSortClicked}>
                      <ListItemIcon color="primary">
                        <Sort />
                      </ListItemIcon>
                      <Typography>Sort</Typography>
                    </MenuItem>
                  )}
                  {!shouldShowFilter && (
                    <MenuItem button onClick={onFilterClicked}>
                      <ListItemIcon>
                        <FilterList />
                      </ListItemIcon>
                      <Typography>Filter</Typography>
                    </MenuItem>
                  )}
                  {!shouldShowExport && (
                    <MenuItem button onClick={onExportClicked}>
                      <ListItemIcon>
                        <GetApp />
                      </ListItemIcon>
                      <Typography>Export</Typography>
                    </MenuItem>
                  )}
                </Menu>
              </>
            )}
          </Grid>
        </Grid>
      </>
    );
  };
