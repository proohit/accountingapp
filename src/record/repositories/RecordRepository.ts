import { EntityRepository, Repository } from 'typeorm';
import { Record } from '../../entity/Record';

@EntityRepository(Record)
export class RecordRepository extends Repository<Record> {}
