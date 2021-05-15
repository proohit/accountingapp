import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { Wallet } from '../../wallets/models/Wallet';

type WalletFieldProps = {
  walletName: string;
  onWalletChange: (
    event: ChangeEvent<{
      name?: string;
      value: unknown;
    }>
  ) => void;
  wallets: Wallet[];
  withAll?: boolean;
  errorText?: string;
  variant?: FormControlProps['variant'];
};

export const WalletField: FunctionComponent<WalletFieldProps> = (props) => {
  const { onWalletChange, walletName, wallets, withAll, errorText, variant } =
    props;
  return (
    <FormControl variant={variant || 'outlined'} fullWidth>
      <InputLabel>Wallet</InputLabel>
      <Select
        error={!!errorText}
        color="secondary"
        value={walletName}
        name="walletName"
        onChange={onWalletChange}
        label="Wallet"
      >
        {withAll && (
          <MenuItem key="all" value="all">
            All Wallets
          </MenuItem>
        )}
        {wallets &&
          wallets.map((wallet) => (
            <MenuItem key={wallet.name} value={wallet.name}>
              {wallet.name}
            </MenuItem>
          ))}
      </Select>
      {errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};
