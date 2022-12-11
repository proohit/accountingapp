import { IsString } from 'class-validator';

export default class RequestResetTokenDto {
  @IsString()
  username: string;
}
