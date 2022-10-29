import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt } from 'crypto';
import { SecureUser } from '../users/entities/secure-user';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import InvalidCredentialsException from './errors/InvalidCredentialsException';

@Injectable()
export class AuthService {
  private readonly HASH_LENGTH = 32;
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<SecureUser> {
    const user = await this.usersService.getByUsername(username);
    if (!user) throw new InvalidCredentialsException();
    if (await this.checkPassword(pass, user.password)) {
      return this.getSecureUser(user);
    }
    throw new InvalidCredentialsException();
  }

  async register(
    username: string,
    password: string,
    email: string,
  ): Promise<SecureUser> {
    const hash = await this.hashPassword(password);
    const newUser = await this.usersService.create(username, hash, email);
    return this.getSecureUser(newUser);
  }

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(64).toString('hex');
      scrypt(password, salt, this.HASH_LENGTH, (err, derivedKey) => {
        if (err) reject(err);
        resolve(this.getEncodedHash(derivedKey.toString('hex'), salt));
      });
    });
  }

  private async checkPassword(password: string, encodedHash: string) {
    return new Promise((resolve, reject) => {
      const { salt } = this.getDecodedHash(encodedHash);
      scrypt(password, salt, this.HASH_LENGTH, (err, derivedKey) => {
        if (err) reject(err);
        const calculatedHash = this.getEncodedHash(
          derivedKey.toString('hex'),
          salt,
        );
        resolve(calculatedHash === encodedHash);
      });
    });
  }

  private getSecureUser(user: User): SecureUser {
    return SecureUser.fromUser(user);
  }

  private getEncodedHash(hash: string, salt: string): string {
    return `${salt}:${hash}`;
  }

  private getDecodedHash(encodedHash: string): { hash: string; salt: string } {
    const [salt, hash] = encodedHash.split(':');
    return { hash, salt };
  }
}
