import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { Wallet } from '../../wallets/models/Wallet';
import { Category } from '../models/Category';
import { Record } from '../models/Record';
import { RecordTimestamp } from '../models/RecordTimestamp';

interface RecordFormProps {
  onRecordChange(record: Record): void;
  wallets: Wallet[];
  categories: Category[];
  owner: string;
}

const defaultTimestamp = new RecordTimestamp(new Date(), 'date');

export const RecordForm = (props: RecordFormProps) => {
  const { onRecordChange, wallets, categories, owner } = props;
  const [descriptionValue, setDescriptionValue] = useState('');
  const [valueValue, setValueValue] = useState(0);
  const [walletValue, setWalletValue] = useState(
    (wallets && wallets.length > 0 && wallets[0].name) || ''
  );
  const [categoryValue, setCategoryValue] = useState(
    (categories && categories.length > 0 && categories[0].name) || ''
  );
  const [timestampValue, setTimestampValue] = useState(
    defaultTimestamp.toInputString()
  );

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name || event.currentTarget.name;
    const value = event.target.value || event.currentTarget.value;

    const newRecord: Record = {
      description: descriptionValue,
      value: valueValue,
      walletName: walletValue,
      category: categoryValue,
      timestamp: new RecordTimestamp(timestampValue, 'input').toString(),
      owner,
    };

    let newValue: string | number = value;

    switch (name) {
      case 'description':
        setDescriptionValue(newValue);
        break;
      case 'value':
        newValue = (newValue && +parseFloat(newValue)) || 0;
        setValueValue(newValue);
        break;
      case 'wallet':
        setWalletValue(newValue);
        break;
      case 'category':
        setCategoryValue(newValue);
        break;
      case 'timestamp':
        setTimestampValue(newValue);
        newValue = new RecordTimestamp(value, 'input').toString();
        break;
    }

    newRecord[name] = newValue;
    onRecordChange(newRecord);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            color="secondary"
            label="description"
            name="description"
            value={descriptionValue}
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            color="secondary"
            label="value"
            name="value"
            value={valueValue}
            onChange={handleFieldChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel>Wallet</InputLabel>
            <Select
              color="secondary"
              value={walletValue}
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
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select
              color="secondary"
              value={categoryValue}
              label="category"
              name="category"
              onChange={handleFieldChange}
            >
              {categories &&
                categories.map((category) => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            label="timestamp"
            name="timestamp"
            value={timestampValue}
            onChange={handleFieldChange}
            type="datetime-local"
          />
        </Grid>
      </Grid>
    </>
  );
};
