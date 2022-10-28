import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt } from 'crypto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(64).toString('hex');
      scrypt(password, salt, 32, (err, derivedKey) => {
        if (err) reject(err);
        resolve(`${salt}:${derivedKey.toString('hex')}`);
      });
    });
  }

  private async checkPassword(password: string, hash: string) {
    return new Promise((resolve, reject) => {
      const [salt] = hash.split(':');
      scrypt(password, salt, 256, (err, derivedKey) => {
        if (err) reject(err);
        const calculatedHash = `${salt}:${derivedKey.toString('hex')}`;
        resolve(calculatedHash === hash);
      });
    });
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getByUsername(username);
    if (await this.checkPassword(pass, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async register(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    const hash = await this.hashPassword(password);
    const newUser = await this.usersService.create(username, hash, email);
    delete newUser.password;
    return newUser;
  }
}
