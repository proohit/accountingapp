import { IsString } from 'class-validator';

export default class RequestTokenDto {
  @IsString()
  username: string;
}
