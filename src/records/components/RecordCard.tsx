import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { Record } from '../models/Record';

interface RecordCardProps {
  record: Record;
}

export const RecordCard = (props: RecordCardProps) => {
  const { record } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="body1">{record.description}</Typography>
        <Typography variant="body1">{record.walletName}</Typography>
        <Typography variant="body1">{record.category}</Typography>
        <Typography variant="body2">{record.value}</Typography>
      </CardContent>
    </Card>
  );
};
