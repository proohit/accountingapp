import { EntityRepository, Repository } from 'typeorm';
import { Record } from '../../entity/Record';
import { User } from '../../entity/User';
import { RecordNotFound } from '../models/Errors';
import { ResourceNotAllowed } from '../../shared/models/Errors';

@EntityRepository(Record)
export class RecordRepository extends Repository<Record> {
    async getByIdIfAllowed(id: Record['id'], username: User['username']): Promise<Record> {
        const record = await this.findOne(id);
        if (!record) {
            throw new RecordNotFound();
        }

        if (record.ownerUsername !== username) {
            throw new ResourceNotAllowed();
        }

        return record;
    }
}
