import { Repository } from '../../shared/models/Repository';
import { MessageResult } from '../../shared/models/RouteResult';
import Record from './Record';
import { SearchQuery } from './SearchQuery';

export interface RecordRepository extends Repository {
    getByUser: (username: string, from: number, count: number) => Promise<Record[]>;
    getByWallet: (username: string, wallet: string) => Promise<Record[]>;
    getByCategory: (username: string, category: string) => Promise<Record[]>;
    getByQuery(username: string, query: SearchQuery): Promise<Record[]>;
    getRecordCountByUser(username: string): Promise<number>;
    getById: (id: number) => Promise<Record>;
    createRecord: (
        description: string,
        value: number,
        wallet: string,
        timestamp: string,
        owner: string,
        category: string,
    ) => Promise<Record>;
    deleteRecord: (id: number) => Promise<MessageResult>;
    updateRecord: (
        id: number,
        description: string,
        value: number,
        walletName: string,
        timestamp: string,
        owner: string,
        category: string,
    ) => Promise<Record>;
    createIndices: () => Promise<void>;
    createAutoIncrement: () => Promise<void>;
    createConstraints: () => Promise<void>;
}
