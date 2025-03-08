import { Test, TestingModule } from '@nestjs/testing';
import { CurrentVotesService } from './current_votes.service';

describe('CurrentVotesService', () => {
  let service: CurrentVotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrentVotesService],
    }).compile();

    service = module.get<CurrentVotesService>(CurrentVotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
