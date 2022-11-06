import { WalletDto } from '@accountingapp/shared';
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FunctionComponent } from 'react';

type WalletFieldProps = {
  walletName: string;
  onWalletChange: (event: SelectChangeEvent<string>) => void;
  wallets: WalletDto[];
  withAll?: boolean;
  errorText?: string;
  variant?: FormControlProps['variant'];
  fullWidth?: boolean;
};

export const WalletField: FunctionComponent<WalletFieldProps> = (props) => {
  const {
    onWalletChange,
    walletName,
    wallets,
    withAll,
    errorText,
    variant,
    fullWidth,
  } = props;
  return (
    <FormControl
      variant={variant || 'outlined'}
      fullWidth={fullWidth !== undefined ? fullWidth : true}
    >
      <InputLabel>Wallet</InputLabel>
      <Select
        error={!!errorText}
        color="secondary"
        value={walletName}
        name="walletName"
        onChange={(event) => onWalletChange(event)}
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
