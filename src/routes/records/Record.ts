import { RowDataPacket } from 'mysql2';

interface Record extends RowDataPacket {
    id?: number;
    value: number;
    description: string;
    walletName: string;
    timestamp: string;
    owner: string;
}

export default Record;