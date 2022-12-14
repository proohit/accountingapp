import {
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';
import { RecordCsvMapping } from '../models/RecordCsvMapping';

export interface CsvFieldMapTableProps {
  previewData: any[];
  onConfirm: (csvMap: RecordCsvMapping) => void;
}
export const RecordCsvFieldListNarrow: FC<CsvFieldMapTableProps> = (props) => {
  const { previewData, onConfirm } = props;
  const {
    values: csvMap,
    handleChange,
    handleSubmit,
    errors,
  } = useFormik<RecordCsvMapping>({
    initialValues: {
      description: '',
      value: '',
      timestamp: '',
      timestampFormat: '',
    },
    onSubmit: (values) => {
      onConfirm(values);
    },
    validationSchema: yup.object().shape({
      description: yup
        .string()
        .required("Please select a field for 'description'"),
      value: yup.string().required("Please select a field for 'value'"),
      timestamp: yup.string().required("Please select a field for 'timestamp'"),
      timestampFormat: yup
        .string()
        .required("Please select a format for the field 'timestamp'.")
        .test(
          'is-valid-format',
          "Invalid format. This should match the format of your data, for example if your data has the format '2021-12-26', then the format should be 'YYYY-MM-DD'",
          (value) => {
            return dayjs(previewData[0][csvMap.timestamp], value).isValid();
          }
        ),
    }),
    validateOnBlur: false,
    validateOnChange: false,
  });

  const recordFields = ['description', 'value', 'timestamp'];

  return (
    <form onSubmit={handleSubmit}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>CSV Field</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recordFields.map((field) => (
              <TableRow key={field}>
                <TableCell width={150}>{field}</TableCell>
                <TableCell>
                  <TextField
                    select
                    fullWidth
                    name={field}
                    value={csvMap[field] || ''}
                    error={!!errors[field]}
                    helperText={errors[field]}
                    onChange={handleChange}
                  >
                    {previewData[0] &&
                      Object.keys(previewData[0]).map((csvField) => (
                        <MenuItem
                          key={csvField}
                          value={csvField}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                          }}
                        >
                          <Typography>{csvField}</Typography>
                          <Typography variant="caption">
                            {previewData[0][csvField] || '-'}
                          </Typography>
                        </MenuItem>
                      ))}
                  </TextField>
                  {field === 'timestamp' && (
                    <TextField
                      fullWidth
                      margin="dense"
                      name="timestampFormat"
                      label="Timestamp Format"
                      value={csvMap.timestampFormat || ''}
                      error={!!errors.timestampFormat}
                      helperText={errors.timestampFormat}
                      placeholder="Format matching your data, e.g. YYYY-MM-DD"
                      onChange={handleChange}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button sx={{ m: 2 }} variant="outlined" type="submit">
        Continue
      </Button>
    </form>
  );
};
