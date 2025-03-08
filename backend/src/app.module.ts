import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VotingListModule } from './voting_list/voting_list.module';
import { VotingElementsModule } from './voting_elements/voting_elements.module';
import { CurrentVotesModule } from './current_votes/current_votes.module';
import { ConsensusVoteModule } from './consensus_vote/consensus_vote.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AlgorithmModule } from './algorithm/algorithm.module';

@Module({
  imports: [
    ConfigModule.forRoot({      isGlobal: true, // Make environment variables available globally
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5443,
      username: 'myuser',
      password: 'mypassword',
      database: 'trueconsensus',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    UsersModule,
    VotingListModule,
    VotingElementsModule,
    CurrentVotesModule,
    ConsensusVoteModule,
    AuthModule,
    AlgorithmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}