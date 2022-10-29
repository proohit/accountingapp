import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return `This action returns all users`;
  }

  getByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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
}
