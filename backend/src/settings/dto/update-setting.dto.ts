import { AvailableWidgets } from '@accountingapp/shared';
import { ArrayUnique, IsArray } from 'class-validator';

export class UpdateSettingDto {
  @IsArray()
  @ArrayUnique()
  widgets: AvailableWidgets[];
}
