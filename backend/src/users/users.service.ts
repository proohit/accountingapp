import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getByUsername(username: string): Promise<User> {
    const foundUser = await this.usersRepository.findOneBy({ username });
    if (!foundUser) {
      throw new NotFoundException();
    }
    return foundUser;
  }

  async create(username: string, password: string, email: string) {
    if (await this.getByUsername(username)) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    return this.usersRepository.save(user);
  }

  async changePassword(username: string, password: string) {
    const user = await this.getByUsername(username);
    return this.usersRepository.save({ ...user, password });
  }
}
