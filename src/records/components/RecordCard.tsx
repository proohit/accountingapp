import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import { Record } from '../models/Record';

interface RecordCardProps {
  record: Record;
}

const styles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.secondary.main,
  },
  cardActions: {
    color: theme.palette.secondary.light,
  },
}));

export const RecordCard = (props: RecordCardProps) => {
  const { record } = props;
  const classes = styles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1">{record.description}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" align="center">
              {record.walletName}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body1" align="center">
              {record.category}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" align="center">
              {record.timestamp}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2" align="center">
              {record.value}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary">
              <Edit />
            </IconButton>
            <IconButton color="primary">
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
