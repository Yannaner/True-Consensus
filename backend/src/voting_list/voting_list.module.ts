import { Module } from '@nestjs/common';
import { VotingListService } from './voting_list.service';
import { VotingListController } from './voting_list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotingList } from './entities/voting_list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VotingList])],
  controllers: [VotingListController],
  providers: [VotingListService],
})
export class VotingListModule {}
