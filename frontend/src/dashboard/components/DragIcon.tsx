import { Grid, styled } from '@mui/material';

export const DragIcon = styled(Grid)(({ theme }) => ({
  cursor: 'move',
  padding: theme.spacing(1),
  height: theme.spacing(5),
  width: theme.spacing(5),
}));
