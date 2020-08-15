import { RowDataPacket } from 'mysql2';

export default interface FullUser extends RowDataPacket {
    username: string;
    private_key: string;
    password: string;
}

export interface User extends RowDataPacket {
    username: string;
}
