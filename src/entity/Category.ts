import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    ownerUsername: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'ownerUsername' })
    owner: User;
}
