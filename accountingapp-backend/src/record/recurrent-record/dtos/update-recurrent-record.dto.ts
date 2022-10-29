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
  @IsOptional()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsUUID()
  @IsOptional()
  walletId: string;

  @IsUUID()
  @IsOptional()
  categoryId: string;
}
