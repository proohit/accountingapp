import { User } from '../../entity/User';
import { repositories } from '../../shared/repositories/database';
import { AvailableWidgets } from '../models/Settings';

export default class SettingsService {
    getUserWidgets(username: User['username']) {
        return repositories.settings().find({ where: { ownerUsername: username }, order: { order: 'ASC' } });
    }
    async updateWidgets(username: User['username'], widgets: AvailableWidgets[]) {
        const newWidgetOrder = widgets.map((widget, index) => ({
            widget,
            order: index,
            ownerUsername: username,
        }));
        await repositories.settings().delete({ ownerUsername: username });
        return repositories.settings().save(newWidgetOrder);
    }
}
