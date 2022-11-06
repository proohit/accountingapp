import { IsNumber, IsString } from 'class-validator';

export default class UpdateWalletDto {
  @IsString()
  name?: string;
  @IsNumber()
  balance?: number;
}
