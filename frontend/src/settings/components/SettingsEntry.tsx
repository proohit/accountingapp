import { Divider, Grid, GridProps, Paper, PaperProps } from '@mui/material';
import { FunctionComponent, PropsWithChildren } from 'react';
import { makeStyles } from 'tss-react/mui';

type SettingsEntryProps = { grid?: GridProps; paper?: PaperProps };

const settingsEntryStyles = makeStyles()((theme) => ({
  settingsContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

export const SettingsEntry: FunctionComponent<
  PropsWithChildren<SettingsEntryProps>
> = (props) => {
  const { children, grid, paper } = props;
  const { classes } = settingsEntryStyles();
  return (
    <Paper className={classes.settingsContainer} {...paper}>
      <Grid item {...grid}>
        {children}
      </Grid>
    </Paper>
  );
};

type SettingsEntryHeaderProps = PropsWithChildren<GridProps>;

const settingsEntryHeaderStyles = makeStyles()((theme) => ({
  header: { gap: theme.spacing(1) },
}));

export const SettingsEntryHeader: FunctionComponent<
  SettingsEntryHeaderProps
> = (props) => {
  const { children, ...restProps } = props;
  const { classes } = settingsEntryHeaderStyles();
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

type SettingsEntryContentProps = PropsWithChildren<GridProps>;

export const SettingsEntryContent: FunctionComponent<
  SettingsEntryContentProps
> = (props) => {
  const { children, ...restProps } = props;
  return (
    <Grid container direction="column" {...restProps}>
      {children}
    </Grid>
  );
};
