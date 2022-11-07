import { Periodicity } from '@accountingapp/shared';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { DateValidator } from '../../../shared/dtos/date-validator.dto';

export default class CreateRecurrentRecordDto {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Periodicity)
  periodicity: string;

  @IsDateString()
  @Validate(DateValidator)
  startDate: string;

  @IsDateString()
  @Validate(DateValidator)
  @IsOptional()
  endDate?: string;

  @IsUUID()
  walletId: string;

  @IsUUID()
  categoryId: string;
}
