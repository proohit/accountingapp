import { AvailableWidgets, UserSettingsDto } from '@accountingapp/shared';
import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { LoggedInUser } from '../auth/user.decorator';
import { SecureUser } from '../users/entities/secure-user';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingsService } from './settings.service';
@UseGuards(AuthenticatedGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getUserSettings(
    @LoggedInUser() user: SecureUser,
  ): Promise<UserSettingsDto> {
    const settings = await this.settingsService.getUserSettings(user.username);
    const userSettings = {
      widgets: settings.map((setting) => setting.widget as AvailableWidgets),
    };
    return userSettings;
  }

  @Put()
  async updateSettings(
    @LoggedInUser() user: SecureUser,
    @Body() body: UpdateSettingDto,
  ): Promise<UserSettingsDto> {
    const { widgets } = body;
    const updatedSettings = await this.settingsService.updateWidgets(
      user.username,
      widgets,
    );
    const updatedUserSettings: UserSettingsDto = {
      widgets: updatedSettings.map((setting) => setting.widget),
    };
    return updatedUserSettings;
  }
}
