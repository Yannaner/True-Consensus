import { Module } from '@nestjs/common';
import { ConsensusVoteService } from './consensus_vote.service';
import { ConsensusVoteController } from './consensus_vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsensusVote } from './entities/consensus_vote.entity';
import { VotingElementsModule } from 'src/voting_elements/voting_elements.module';
import { AlgorithmModule } from 'src/algorithm/algorithm.module';

@Module({
  imports: [TypeOrmModule.forFeature([ConsensusVote]),
  AlgorithmModule,
  VotingElementsModule
],
  controllers: [ConsensusVoteController],
  providers: [ConsensusVoteService],
})
export class ConsensusVoteModule {}
