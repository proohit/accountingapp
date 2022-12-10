import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt } from 'crypto';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { SecureUser } from '../users/entities/secure-user';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import InvalidCredentialsException from './errors/InvalidCredentialsException';

@Injectable()
export class AuthService {
  private readonly HASH_LENGTH = 32;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersService: UsersService,
    private mailService: MailService,
  ) {}

  async validateUser(username: string, pass: string): Promise<SecureUser> {
    const user = await this.usersRepository.findOneBy({ username });
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
    const secureUser = this.getSecureUser(newUser);
    this.mailService.sendConfirmationMail(secureUser);
    return secureUser;
  }

  public async confirmRegistration(username: string): Promise<SecureUser> {
    const confirmedUser = await this.usersService.confirmUser(username);
    return SecureUser.fromUser(confirmedUser);
  }

  public hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(64).toString('hex');
      scrypt(password, salt, this.HASH_LENGTH, (err, derivedKey) => {
        if (err) reject(err);
        resolve(this.getEncodedHash(derivedKey.toString('hex'), salt));
      });
    });
  }

  public async changePassword(
    username: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) throw new InvalidCredentialsException();
    const passwordCorrect = await this.checkPassword(
      oldPassword,
      user.password,
    );
    if (passwordCorrect) {
      const newPasswordHash = await this.hashPassword(newPassword);
      const updatedUser = await this.usersService.changePassword(
        username,
        newPasswordHash,
      );
      return this.getSecureUser(updatedUser);
    } else {
      throw new InvalidCredentialsException();
    }
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
