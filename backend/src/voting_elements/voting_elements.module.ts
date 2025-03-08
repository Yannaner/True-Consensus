import { Module } from '@nestjs/common';
import { VotingElementsService } from './voting_elements.service';
import { VotingElementsController } from './voting_elements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotingElement } from './entities/voting_element.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VotingElement])],
  controllers: [VotingElementsController],
  providers: [VotingElementsService],
  exports: [VotingElementsService],
})
export class VotingElementsModule {}
