import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne, CreateDateColumn } from 'typeorm';
import { VotingList } from '../../voting_list/entities/voting_list.entity';

@Entity('consensus_vote')
export class ConsensusVote {
  @PrimaryColumn()
  votingId: number;

  @CreateDateColumn({ name: 'last_updated_time', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdatedTime: Date;

  @Column({ name: 'calculated_consensus', type: 'text', nullable: true })
  calculatedConsensus: string;

  @OneToOne(() => VotingList)
  @JoinColumn({ name: 'voting_id' })
  voting: VotingList;
}