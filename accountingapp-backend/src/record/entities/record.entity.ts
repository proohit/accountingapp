import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import { Wallet } from '../../wallet/entities/wallet.entity';

@Entity()
export default class Record {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ default: 0, type: 'float' })
  value: number;
  @Column({ default: '', type: 'text' })
  description?: string;
  @Column({ type: 'timestamp', name: 'timestamp' })
  timestamp: string;
  @Column()
  walletId: string;
  @Column()
  ownerUsername: string;
  @Column()
  categoryId: string;
  @Column({ default: null })
  externalReference?: string;
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
