import { services } from '../../shared/services/services';
import { AvailableWidgets, UserSettings } from '../models/Settings';
import { SettingsController } from '../models/SettingsController';

const SETTINGS_CONTROLLER: SettingsController = {
    getUserSettings: async (ctx) => {
        const settings = await services().settingsService.getUserWidgets(ctx.state.user.username);
        const userSettings: UserSettings = { widgets: settings.map((setting) => setting.widget as AvailableWidgets) };
        return { data: userSettings, status: 200 };
    },
    updateSettings: async (ctx) => {
        const { widgets } = ctx.request.body;
        const updatedSettings = await services().settingsService.updateWidgets(ctx.state.user.username, widgets);
        const updatedUserSettings: UserSettings = {
            widgets: updatedSettings.map((setting) => setting.widget),
        };
        return { data: updatedUserSettings, status: 200 };
    },
};

export default SETTINGS_CONTROLLER;
