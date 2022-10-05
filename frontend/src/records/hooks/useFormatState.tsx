import { useQuery } from 'react-query';
import { Format } from '../models/Format';

const defaultFormat: Format = {
  dateFormat: 'YYYY-MM-DD',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  timeFormat: 'HH:mm:ss',
};

export const useFormatState = () =>
  useQuery<Format>('format', () => defaultFormat, {
    initialData: defaultFormat,
  });
