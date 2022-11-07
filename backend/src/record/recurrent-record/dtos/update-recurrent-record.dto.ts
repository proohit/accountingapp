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

export default class UpdateRecurrentRecordDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  value: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Periodicity)
  @IsOptional()
  periodicity: string;

  @IsDateString()
  @Validate(DateValidator)
  @IsOptional()
  startDate: string;

  @IsDateString()
  @Validate(DateValidator)
  @IsOptional()
  endDate?: string;

  @IsUUID()
  @IsOptional()
  walletId: string;

  @IsUUID()
  @IsOptional()
  categoryId: string;
}
