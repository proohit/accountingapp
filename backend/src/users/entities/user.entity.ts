import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  username: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column({ default: false })
  confirmed: boolean;
  @Column({ type: 'longtext', nullable: true })
  resetToken: string;
  @Column({ type: 'longtext', nullable: true })
  confirmToken: string;
}
