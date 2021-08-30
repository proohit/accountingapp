import { Container, Grid, Typography } from '@material-ui/core';
import { Person, VpnKey } from '@material-ui/icons';
import React from 'react';
import { AccountInformation } from './AccountInformation';
import { ChangePasswordForm } from './ChangePasswordForm';
import {
  SettingsEntry,
  SettingsEntryContent,
  SettingsEntryHeader,
} from './SettingsEntry';

export const SettingsEntries: React.FC = (props) => (
  <Container>
    <Grid container>
      <SettingsEntry>
        <SettingsEntryHeader>
          <Person color="primary" fontSize="large" />
          <Typography variant="h5" display="inline">
            Account Information
          </Typography>
        </SettingsEntryHeader>
        <SettingsEntryContent>
          <AccountInformation />
        </SettingsEntryContent>
      </SettingsEntry>
      <SettingsEntry>
        <SettingsEntryHeader>
          <VpnKey color="primary" fontSize="large" />
          <Typography variant="h5" display="inline">
            Change Password
          </Typography>
        </SettingsEntryHeader>
        <SettingsEntryContent>
          <ChangePasswordForm />
        </SettingsEntryContent>
      </SettingsEntry>
    </Grid>
  </Container>
);
