import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { DashboardSettings } from './entities/dashboard-settings.entity';
import { AvailableWidgets } from './widgets';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(DashboardSettings)
    private readonly settingsRepository: Repository<DashboardSettings>,
  ) {}

  getUserSettings(username: User['username']) {
    return this.settingsRepository.find({
      where: { ownerUsername: username },
      order: { order: 'ASC' },
    });
  }

  async updateWidgets(username: User['username'], widgets: AvailableWidgets[]) {
    const newWidgetOrder = widgets.map((widget, index) => ({
      widget,
      order: index,
      ownerUsername: username,
    }));
    await this.settingsRepository.delete({ ownerUsername: username });
    return this.settingsRepository.save(newWidgetOrder);
  }
}
