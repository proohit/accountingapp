import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { Category } from './Category';
import { User } from './User';
import { Wallet } from './Wallet';

@Entity()
export class Record {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ default: 0 })
    value: number;
    @Column({ default: '' })
    description?: string;
    @Column('timestamp')
    timestamp: Timestamp;
    @Column()
    walletId: string;
    @Column()
    ownerUsername: string;
    @Column()
    categoryId: string;
    @ManyToOne(() => Wallet)
    @JoinColumn({ name: 'walletId' })
    wallet: Wallet;
    @ManyToOne(() => User)
    @JoinColumn({ name: 'ownerUsername' })
    owner: User;
    @ManyToOne(() => Category)
    @JoinColumn({ name: 'categoryId' })
    category: Category;
}
