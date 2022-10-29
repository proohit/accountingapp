import { IsArray, ValidateNested } from 'class-validator';
import CreateRecordDto from './create-record.dto';

export default class CreateManyRecordsDto {
  @IsArray()
  @ValidateNested({ each: true })
  records: CreateRecordDto[];
}
