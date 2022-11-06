import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import Periodicity from '../models/periodicity.model';

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
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsUUID()
  walletId: string;

  @IsUUID()
  categoryId: string;
}
