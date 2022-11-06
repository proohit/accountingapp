import { ApiRoutes, UserDto } from '@accountingapp/shared';
import { BASE_API } from '../../shared/models/Api';

interface UserApiService {
  getCurrentUser: () => Promise<UserDto>;
}

const USER_API_SERVICE: UserApiService = {
  getCurrentUser: async () => {
    return BASE_API.get<UserDto>(ApiRoutes.AUTHENTICATION_ME);
  },
};

export default USER_API_SERVICE;
