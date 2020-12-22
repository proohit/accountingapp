import { Grid, MenuItem, Select, TextField } from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useWallets } from '../../wallets/hooks/useWallets';
import { Record } from '../models/Record';

interface RecordFormProps {
  onChange(record: Record): void;
}
export const RecordForm = (props: RecordFormProps) => {
  const { onChange } = props;
  const { wallets, getWallets } = useWallets();
  const [descriptionValue, setDescriptionValue] = useState('');
  const [valueValue, setValueValue] = useState(0);
  const [walletValue, setWalletValue] = useState('');

  useEffect(() => {
    if (!wallets) {
      getWallets();
    }
  }, [wallets]);

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name || event.currentTarget.name;
    const value = event.target.value || event.currentTarget.value;

    const newRecord = {
      description: descriptionValue,
      value: valueValue,
      walletName: walletValue,
    };
    newRecord[name] = value;
    switch (name) {
      case 'description':
        setDescriptionValue(value);
        break;
      case 'value':
        setValueValue(parseFloat(value));
        newRecord[name] = parseFloat(value);
        break;
      case 'wallet':
        setWalletValue(value);
    }

    onChange(newRecord);
  };

  return (
    <>
      <TextField
        label="description"
        name="description"
        fullWidth
        value={descriptionValue}
        onChange={handleFieldChange}
      />
      <TextField
        label="value"
        name="value"
        fullWidth
        value={valueValue}
        onChange={handleFieldChange}
        type="number"
      />
      <Select
        fullWidth
        value={walletValue}
        label="wallet"
        name="wallet"
        onChange={handleFieldChange}
      >
        {wallets &&
          wallets.map((wallet) => (
            <MenuItem key={wallet.name} value={wallet.name}>
              {wallet.name}
            </MenuItem>
          ))}
      </Select>
    </>
  );
};
