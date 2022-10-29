import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateWalletDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  balance: number;
}
