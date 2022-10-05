import {
  AddBox,
  FilterList,
  GetApp,
  MoreVert,
  Sort,
} from '@mui/icons-material';
import {
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { FunctionComponent } from 'react';

type RecordsTableToolbarProps = {
  onFilterClicked: () => void;
  onAddClicked: () => void;
  onSortClicked: () => void;
  onExportClicked: () => void;
};

export const RecordsTableToolbar: FunctionComponent<
  RecordsTableToolbarProps
> = (props) => {
  const { onAddClicked, onFilterClicked, onSortClicked, onExportClicked } =
    props;
  const shouldShowExtraIcons = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(450)
  );
  const shouldShowExport = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up(450)
  );
  const shouldShowSort = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between(450, 'md')
  );
  const shouldShowFilter = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between(400, 'md')
  );
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
        <Typography variant="h3" color="primary">
          Records
        </Typography>
        <Grid item xs container justifyContent="flex-end">
          {shouldShowSort && (
            <Tooltip title="Sort">
              <IconButton onClick={onSortClicked} color="primary" size="large">
                <Sort />
              </IconButton>
            </Tooltip>
          )}
          {shouldShowFilter && (
            <Tooltip title="Filters">
              <IconButton
                onClick={onFilterClicked}
                color="primary"
                size="large"
              >
                <FilterList />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Add">
            <IconButton onClick={onAddClicked} color="primary" size="large">
              <AddBox />
            </IconButton>
          </Tooltip>
          {shouldShowExport && (
            <Tooltip title="Export">
              <IconButton
                onClick={onExportClicked}
                color="primary"
                size="large"
              >
                <GetApp />
              </IconButton>
            </Tooltip>
          )}
          {shouldShowExtraIcons && (
            <>
              <IconButton onClick={handleClick} size="large">
                <MoreVert />
              </IconButton>
              <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
                {!shouldShowSort && (
                  <MenuItem onClick={onSortClicked}>
                    <ListItemIcon color="primary">
                      <Sort />
                    </ListItemIcon>
                    <Typography>Sort</Typography>
                  </MenuItem>
                )}
                {!shouldShowFilter && (
                  <MenuItem onClick={onFilterClicked}>
                    <ListItemIcon>
                      <FilterList />
                    </ListItemIcon>
                    <Typography>Filter</Typography>
                  </MenuItem>
                )}
                {!shouldShowExport && (
                  <MenuItem onClick={onExportClicked}>
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
