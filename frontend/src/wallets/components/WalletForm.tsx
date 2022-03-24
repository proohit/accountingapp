import { Grid, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from '../../shared/hooks/useForm';
import { Wallet } from '../models/Wallet';
import { validateWalletField } from '../services/WalletValidator';

interface WalletFormProps {
  onWalletChange(wallet: Wallet): void;
  onFormValidChanged(isFormValid: boolean): void;
  owner: string;
  wallet?: Wallet;
}

export const WalletForm = (props: WalletFormProps) => {
  const { onWalletChange, onFormValidChanged, owner, wallet } = props;

  const [
    formFields,
    handleFormFieldChange,
    [formErrors, , isFormValid],
  ] = useForm<Partial<Wallet>>(
    {
      id: wallet?.id || null,
      name: wallet?.name || '',
      balance: wallet?.balance.toString() || '0.00',
    },
    {
      validation: {
        validationFunction: validateWalletField,
        initialValidation: true,
      },
    }
  );

  useEffect(() => {
    onWalletChange({
      id: formFields.id,
      name: formFields.name,
      balance: Number(formFields.balance),
      currentBalance: wallet?.currentBalance || 0,
      ownerUsername: owner,
    });
  }, [formFields]);

  useEffect(() => {
    onFormValidChanged(isFormValid);
  }, [isFormValid]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TextField
          variant="outlined"
          error={!!formErrors.name}
          helperText={formErrors.name}
          color="secondary"
          label="Name"
          name="name"
          value={formFields.name}
          onChange={handleFormFieldChange}
        />
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          error={!!formErrors.balance}
          helperText={formErrors.balance}
          color="secondary"
          label="Balance"
          name="balance"
          value={formFields.balance}
          onChange={handleFormFieldChange}
        />
      </Grid>
    </Grid>
  );
};
