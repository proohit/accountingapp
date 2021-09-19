import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category';
import { User } from './User';
import { Wallet } from './Wallet';

@Entity()
export class RecurrentRecord {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ default: 0, type: 'float' })
    value: number;
    @Column({ default: '' })
    description?: string;
    @Column()
    periodicity: string;
    @Column()
    startDate: Date;
    @Column({ nullable: true })
    endDate?: Date;
    @Column()
    walletId: string;
    @Column()
    ownerUsername: string;
    @Column()
    categoryId: string;
    @ManyToOne(() => Wallet, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'walletId' })
    wallet: Wallet;
    @ManyToOne(() => User)
    @JoinColumn({ name: 'ownerUsername' })
    owner: User;
    @ManyToOne(() => Category, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'categoryId' })
    category: Category;
}
