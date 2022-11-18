import { RecordDto } from './record.dto';

export class PaginatedResultDto {
  data: RecordDto[];
  page: number;
  dataCount: number;
  totalCount: number;
  filteredNet: number;
}
