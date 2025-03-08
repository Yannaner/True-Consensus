import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn()
  user_id: string;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ length: 10, nullable: true })
  gender: string;

  @Column({ length: 255, nullable: true })
  email: string;
}
