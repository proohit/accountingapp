import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export default class UpdateRecordDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  walletId?: string;

  @IsNotEmpty()
  @IsDateString()
  timestamp: string;

  @IsOptional()
  @IsString()
  externalReference?: string;
}
