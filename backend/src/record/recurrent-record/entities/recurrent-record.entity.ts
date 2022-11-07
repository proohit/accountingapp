import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../../category/entities/category.entity';
import { User } from '../../../users/entities/user.entity';
import { Wallet } from '../../../wallet/entities/wallet.entity';

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
  @Column({ type: 'datetime' })
  startDate: string;
  @Column({ type: 'datetime', nullable: true })
  endDate?: string;
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
