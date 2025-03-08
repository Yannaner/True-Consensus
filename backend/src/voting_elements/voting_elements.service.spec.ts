import { Test, TestingModule } from '@nestjs/testing';
import { VotingElementsService } from './voting_elements.service';

describe('VotingElementsService', () => {
  let service: VotingElementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotingElementsService],
    }).compile();

    service = module.get<VotingElementsService>(VotingElementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
