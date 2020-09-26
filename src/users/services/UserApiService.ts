import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { BASE_API } from '../../shared/models/Api';
import { User } from '../models/User';

interface UserApiService {
  getCurrentUser: (token: string) => Promise<User>;
}

const USER_API_SERVICE: UserApiService = {
  getCurrentUser: async (token: string) => {
    return BASE_API.get<User>(API_ROUTES.USERS_ME, token);
  },
};

export default USER_API_SERVICE;
