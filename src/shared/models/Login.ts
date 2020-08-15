import { User } from '../../user/models/User';

export interface LoginToken {
    token: string;
}

export interface DecodedToken {
    username: User['username'];
    iat: number;
    exp: number;
}
