import { DEFAULT_WIDGETS } from '@accountingapp/shared';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsService } from '../settings/settings.service';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private settingsService: SettingsService,
  ) {}

  async getByUsername(username: string): Promise<User> {
    const foundUser = await this.usersRepository.findOneBy({ username });
    if (!foundUser) {
      throw new NotFoundException();
    }
    return foundUser;
  }

  async create(
    username: string,
    password: string,
    email: string,
    resetToken: string = null,
    confirmToken: string = null,
  ) {
    if (await this.usersRepository.findOneBy({ username })) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    user.resetToken = resetToken;
    user.confirmToken = confirmToken;
    const createdUser = await this.usersRepository.save(user);
    await this.settingsService.updateWidgets(username, DEFAULT_WIDGETS);
    return createdUser;
  }

  async changePassword(username: string, password: string) {
    const user = await this.getByUsername(username);
    return this.usersRepository.save({ ...user, password });
  }

  async confirmUser(username: string): Promise<User> {
    const user = await this.getByUsername(username);
    return this.usersRepository.save({
      ...user,
      confirmed: true,
      confirmToken: null,
    });
  }

  async updateResetToken(username: string, token: string): Promise<User> {
    const user = await this.getByUsername(username);
    return this.usersRepository.save({ ...user, resetToken: token });
  }
}
