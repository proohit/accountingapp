import { UserDto } from '@accountingapp/shared';
import { User } from './user.entity';

export class SecureUser extends UserDto {
  static fromUser(user: User) {
    const { password, ...secureUser } = user;
    return secureUser;
  }
}
