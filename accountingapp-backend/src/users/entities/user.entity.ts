import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  username: string;
  @Column()
  private_key?: string;
  @Column()
  password: string;
  @Column()
  email: string;
}
