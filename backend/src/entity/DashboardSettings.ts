import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

export enum DashboardWidgets {
    THIS_MOTH = 'THIS_MONTH',
    THIS_YEAR = 'THIS_YEAR',
    CURRENT_STATUS = 'CURRENT_STATUS',
    LATEST_RECORDS = 'LATEST_RECORDS',
    MONTHLY_CATEGORY = 'MONTHLY_CATEGORY',
    QUICK_ACTIONS = 'QUICK_ACTIONS',
}

@Entity()
export class DashboardSettings {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({
        type: 'simple-array',
        enum: DashboardWidgets,
        default: [
            DashboardWidgets.THIS_MOTH,
            DashboardWidgets.THIS_YEAR,
            DashboardWidgets.CURRENT_STATUS,
            DashboardWidgets.LATEST_RECORDS,
            DashboardWidgets.MONTHLY_CATEGORY,
            DashboardWidgets.QUICK_ACTIONS,
        ],
    })
    enabledWidgets: DashboardWidgets[];
    @Column()
    ownerUsername: string;
    @OneToOne(() => User)
    @JoinColumn({ name: 'ownerUsername' })
    owner: User;
}
