import { Grid, ListItem, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

type MobileNetItemProps = {
  net: number;
};

export const MobileNetItem: FunctionComponent<MobileNetItemProps> = (props) => {
  const { net } = props;
  return (
    <ListItem
      sx={(theme) => ({
        borderTop: `1px solid ${theme.palette.secondary.dark}`,
        borderBottom: `1px solid ${theme.palette.secondary.dark}`,
      })}
    >
      <Grid container direction="row" justifyContent="space-between">
        <Typography fontWeight="bold">Net</Typography>
        <Typography fontWeight="bold">{net}</Typography>
      </Grid>
    </ListItem>
  );
};
