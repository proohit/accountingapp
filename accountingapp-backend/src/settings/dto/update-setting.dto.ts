import { ArrayUnique, IsArray } from 'class-validator';
import { AvailableWidgets } from '../widgets';

export class UpdateSettingDto {
  @IsArray()
  @ArrayUnique()
  widgets: AvailableWidgets[];
}
