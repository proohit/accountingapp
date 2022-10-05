import {
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import { AddBox, Replay } from '@mui/icons-material';
import dayjs from 'dayjs';
import Head from 'next/head';
import React from 'react';
import { useRecoilState } from 'recoil';
import { useFormatState } from '../../../src/records/hooks/useFormatState';
import { useRecurrentRecordsQuery } from '../../../src/records/hooks/recurrentRecordQueries';
import { recurrentRecordsDialogsState } from '../../../src/records/hooks/recurrentRecordsStore';
import {
  PlannedRecurrentRecord,
  RecurrentRecord,
} from '../../../src/records/models/RecurrentRecord';
import PageHeader from '../../../src/shared/components/PageHeader';
import { makeStyles } from 'tss-react/mui';

const styles = makeStyles()((theme) => ({
  list: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const RecurrentRecordPage = () => {
  const { classes } = styles();
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
            <IconButton color="primary" onClick={openAddDialog} size="large">
              <AddBox />
            </IconButton>
          }
        />
        <RecurrentRecordsList />
      </Grid>
    </>
  );
};

const RecurrentRecordsList = () => {
  const { data: recurrentRecords, isLoading: recurrentRecordsLoading } =
    useRecurrentRecordsQuery();
  const [dialogs, setDialogs] = useRecoilState(recurrentRecordsDialogsState);
  const { data: format, isLoading: formatLoading } = useFormatState();
  const openRecord = (recurrentRecord: RecurrentRecord) => {
    setDialogs({
      ...dialogs,
      EDIT_RECURRENT_RECORD: { open: true, recordToEdit: recurrentRecord },
    });
  };

  const getNextInvocation = (recurrentRecord: PlannedRecurrentRecord) => {
    if (recurrentRecord.nextInvocation) {
      return `next execution on ${dayjs(recurrentRecord.nextInvocation).format(
        format.dateTimeFormat
      )}`;
    } else {
      return 'expired';
    }
  };

  if (recurrentRecordsLoading || formatLoading) {
    return <LinearProgress />;
  }
  return (
    <Paper>
      <List>
        {recurrentRecords?.map((recurrentRecord) => (
          <ListItem
            divider
            button
            key={recurrentRecord.id}
            onClick={() => openRecord(recurrentRecord)}
          >
            <ListItemText>
              {recurrentRecord.description} -{' '}
              {getNextInvocation(recurrentRecord)}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
export default RecurrentRecordPage;
