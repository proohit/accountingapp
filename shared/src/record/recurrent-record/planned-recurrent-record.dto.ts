import { RecurrentRecordDto } from './recurrent-record.dto';

export class PlannedRecurrentRecordDto extends RecurrentRecordDto {
  nextInvocation?: string;
}
