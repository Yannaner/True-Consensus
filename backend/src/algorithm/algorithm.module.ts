import { Module } from '@nestjs/common';
import { AlgorithmService } from './algorithm.service';
import { AlgorithmController } from './algorithm.controller';
import { CurrentVotesModule } from 'src/current_votes/current_votes.module';

@Module({
  imports: [CurrentVotesModule],
  controllers: [AlgorithmController],
  providers: [AlgorithmService],
  exports: [AlgorithmService]
})
export class AlgorithmModule {}
