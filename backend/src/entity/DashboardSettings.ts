import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class DashboardSettings {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    widget: string;
    @Column()
    order: number;
    @Column()
    ownerUsername: string;
    @ManyToOne(() => User)
    @JoinColumn({ name: 'ownerUsername' })
    owner: User;
}
