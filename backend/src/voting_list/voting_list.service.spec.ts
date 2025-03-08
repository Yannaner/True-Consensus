import { Test, TestingModule } from '@nestjs/testing';
import { VotingListService } from './voting_list.service';

describe('VotingListService', () => {
  let service: VotingListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotingListService],
    }).compile();

    service = module.get<VotingListService>(VotingListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
