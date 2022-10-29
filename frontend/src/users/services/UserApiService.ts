import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { BASE_API } from '../../shared/models/Api';
import { User } from '../models/User';

interface UserApiService {
  getCurrentUser: () => Promise<User>;
}

const USER_API_SERVICE: UserApiService = {
  getCurrentUser: async () => {
    return BASE_API.get<User>(API_ROUTES.AUTHENTICATION_ME);
  },
};

export default USER_API_SERVICE;
