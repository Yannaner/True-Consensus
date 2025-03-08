import { Test, TestingModule } from '@nestjs/testing';
import { ConsensusVoteController } from './consensus_vote.controller';
import { ConsensusVoteService } from './consensus_vote.service';

describe('ConsensusVoteController', () => {
  let controller: ConsensusVoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsensusVoteController],
      providers: [ConsensusVoteService],
    }).compile();

    controller = module.get<ConsensusVoteController>(ConsensusVoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
