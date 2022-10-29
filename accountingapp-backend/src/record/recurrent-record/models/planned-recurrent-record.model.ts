import { RecurrentRecord } from '../entities/recurrent-record.entity';

export default class PlannedRecurrentRecord extends RecurrentRecord {
  nextInvocation?: string;
}
