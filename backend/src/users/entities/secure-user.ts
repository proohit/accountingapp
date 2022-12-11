import { UserDto } from '@accountingapp/shared';
import { User } from './user.entity';

export class SecureUser extends UserDto {
  static fromUser(user: User) {
    return {
      username: user.username,
      email: user.email,
      confirmed: user.confirmed,
    };
  }
}
