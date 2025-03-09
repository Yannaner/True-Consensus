import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { VotingList } from '../../voting_list/entities/voting_list.entity';

@Entity('current_votes')
export class CurrentVote {
  @PrimaryGeneratedColumn({ name: 'vote_id' })
  voteId: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'voting_id' })
  votingId: number;

  @Column({ type: 'text', nullable: true })
  ranking: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => VotingList)
  @JoinColumn({ name: 'voting_id' })
  votingList: VotingList;
}