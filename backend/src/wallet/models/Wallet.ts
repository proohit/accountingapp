import { RowDataPacket } from 'mysql2';

export default interface Wallet extends RowDataPacket {
    name: string;
    balance: number;
    owner: string;
}
