import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

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
  timestamp: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  walletId: string;

  @IsOptional()
  @IsString()
  externalReference: string;
}
