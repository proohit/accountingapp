import {
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { AddBox, Replay } from '@material-ui/icons';
import Head from 'next/head';
import React from 'react';
import { useRecoilState } from 'recoil';
import { RecurrentRecordDialogContainer } from '../../../src/records/components/RecurrentRecordDialogContainer';
import { useRecurrentRecordsQuery } from '../../../src/records/hooks/recurrentRecordQueries';
import { recurrentRecordsDialogsState } from '../../../src/records/hooks/recurrentRecordsStore';
import PageHeader from '../../../src/shared/components/PageHeader';

const styles = makeStyles((theme) => ({
  list: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const RecurrentRecordPage = () => {
  const classes = styles();
  const [dialogs, setDialogs] = useRecoilState(recurrentRecordsDialogsState);

  const openAddDialog = () => {
    setDialogs({ ...dialogs, ADD_RECURRENT_RECORD: { open: true } });
  };

  return (
    <>
      <Head>
        <title>Recurrent Records - AccountingApp</title>
        <meta
          property="og:title"
          content="Recurrent Records - AccountingApp"
          key="title"
        />
        <meta
          property="og:description"
          content="Recurrent records control panel"
          key="description"
        />
      </Head>
      <Grid item xs className={classes.list}>
        <PageHeader
          header={'Recurrent Records'}
          icon={<Replay fontSize="large" color="primary" />}
          actions={
            <IconButton color="primary" onClick={openAddDialog}>
              <AddBox />
            </IconButton>
          }
        />
        <RecurrentRecordsList />
        <RecurrentRecordDialogContainer />
      </Grid>
    </>
  );
};

const RecurrentRecordsList = () => {
  const { data: recurrentRecords, isLoading } = useRecurrentRecordsQuery();
  return isLoading ? (
    <LinearProgress />
  ) : (
    <Paper>
      <List>
        {recurrentRecords?.map((recurrentRecord) => (
          <ListItem button key={recurrentRecord.id}>
            <ListItemText>{recurrentRecord.description}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
export default RecurrentRecordPage;
