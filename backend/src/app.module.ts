import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VotingListModule } from './voting_list/voting_list.module';
import { VotingElementsModule } from './voting_elements/voting_elements.module';
import { CurrentVotesModule } from './current_votes/current_votes.module';
import { ConsensusVoteModule } from './consensus_vote/consensus_vote.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'trueconsensus',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    UsersModule,
    VotingListModule,
    VotingElementsModule,
    CurrentVotesModule,
    ConsensusVoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}