import { Module } from '@nestjs/common';
import { ConsensusVoteService } from './consensus_vote.service';
import { ConsensusVoteController } from './consensus_vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsensusVote } from './entities/consensus_vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsensusVote])],
  controllers: [ConsensusVoteController],
  providers: [ConsensusVoteService],
})
export class ConsensusVoteModule {}
