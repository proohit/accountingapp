import { IsString, Validate } from 'class-validator';
import { ResetTokenValidator } from './reset-token-validator.dto';

export default class ResetPasswordDto {
  @IsString()
  username: string;
  @Validate(ResetTokenValidator)
  token: string;
  @IsString()
  newPassword: string;
}
