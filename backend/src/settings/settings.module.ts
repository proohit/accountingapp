import { Module } from '@nestjs/common';
import UseRepositories from '../use-repositories';
import { DashboardSettings } from './entities/dashboard-settings.entity';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [UseRepositories([DashboardSettings])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
