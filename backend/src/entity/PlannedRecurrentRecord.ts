import { RecurrentRecord } from './RecurrentRecord';

export interface PlannedRecurrentRecord extends RecurrentRecord {
    nextInvocation?: string;
}
