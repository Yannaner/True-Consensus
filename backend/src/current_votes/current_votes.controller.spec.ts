import { Test, TestingModule } from '@nestjs/testing';
import { CurrentVotesController } from './current_votes.controller';
import { CurrentVotesService } from './current_votes.service';

describe('CurrentVotesController', () => {
  let controller: CurrentVotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrentVotesController],
      providers: [CurrentVotesService],
    }).compile();

    controller = module.get<CurrentVotesController>(CurrentVotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
