import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column('float')
  balance: number;
  @Column('float')
  currentBalance: number;

  @Column()
  ownerUsername: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerUsername' })
  owner: User;
}
