import {
  Divider,
  Grid,
  GridProps,
  makeStyles,
  Paper,
  PaperProps,
} from '@material-ui/core';
import React from 'react';

type SettingsEntryProps = { grid?: GridProps; paper?: PaperProps };

const settingsEntryStyles = makeStyles((theme) => ({
  settingsContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

export const SettingsEntry: React.FunctionComponent<SettingsEntryProps> = (
  props
) => {
  const { children, grid, paper } = props;
  const classes = settingsEntryStyles();
  return (
    <Paper className={classes.settingsContainer} {...paper}>
      <Grid item {...grid}>
        {children}
      </Grid>
    </Paper>
  );
};

type SettingsEntryHeaderProps = GridProps;

const settingsEntryHeaderStyles = makeStyles((theme) => ({
  header: { gap: theme.spacing(1) },
}));

export const SettingsEntryHeader: React.FunctionComponent<SettingsEntryHeaderProps> =
  (props) => {
    const { children, ...restProps } = props;
    const classes = settingsEntryHeaderStyles();
    return (
      <>
        <Grid
          container
          direction="row"
          alignItems="center"
          {...restProps}
          className={classes.header}
        >
          {children}
        </Grid>
        <Divider />
      </>
    );
  };

type SettingsEntryContentProps = GridProps;

export const SettingsEntryContent: React.FunctionComponent<SettingsEntryContentProps> =
  (props) => {
    const { children, ...restProps } = props;
    return (
      <Grid container direction="column" {...restProps}>
        {children}
      </Grid>
    );
  };
