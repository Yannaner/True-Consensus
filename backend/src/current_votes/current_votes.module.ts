import { Module } from '@nestjs/common';
import { CurrentVotesService } from './current_votes.service';
import { CurrentVotesController } from './current_votes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentVote } from './entities/current_vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CurrentVote])],
  controllers: [CurrentVotesController],
  providers: [CurrentVotesService],
})
export class CurrentVotesModule {}
