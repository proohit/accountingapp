import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { DateValidator } from '../../shared/dtos/date-validator.dto';

export default class CreateRecordDto {
  @IsDefined()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @IsDateString()
  @Validate(DateValidator)
  timestamp: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  walletId: string;

  @IsOptional()
  @IsString()
  externalReference: string;
}
