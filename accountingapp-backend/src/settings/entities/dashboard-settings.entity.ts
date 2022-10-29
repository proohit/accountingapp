import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

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
