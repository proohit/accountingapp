import { RowDataPacket } from 'mysql2';

export interface Category extends RowDataPacket {
    name: string;
}
