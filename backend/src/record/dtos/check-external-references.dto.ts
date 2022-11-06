import { IsArray, IsNotEmpty } from 'class-validator';

export default class CheckExternalReferencesDto {
  @IsNotEmpty()
  @IsArray()
  references: string[];
}
