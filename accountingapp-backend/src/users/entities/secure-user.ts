import { User } from './user.entity';

export class SecureUser {
  username: string;
  email: string;

  static fromUser(user: User) {
    const { password, ...secureUser } = user;
    return secureUser;
  }
}
