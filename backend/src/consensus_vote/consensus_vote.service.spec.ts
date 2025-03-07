import { Test, TestingModule } from '@nestjs/testing';
import { ConsensusVoteService } from './consensus_vote.service';

describe('ConsensusVoteService', () => {
  let service: ConsensusVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsensusVoteService],
    }).compile();

    service = module.get<ConsensusVoteService>(ConsensusVoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
