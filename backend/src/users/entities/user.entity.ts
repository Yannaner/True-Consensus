import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  //change from generate to assignment
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
