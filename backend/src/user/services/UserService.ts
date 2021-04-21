import { User } from '../../entity/User';
import { repositories } from '../../shared/repositories/database';

export default class UserService {
    getByUsername(username: User['username']) {
        return repositories.users().findOne(username);
    }
}
