import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class VotingList {
  @PrimaryGeneratedColumn()
  voting_id: number;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'int', nullable: true })
  voting_amt: number;
}
