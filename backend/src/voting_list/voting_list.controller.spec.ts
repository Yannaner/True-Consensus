import { Test, TestingModule } from '@nestjs/testing';
import { VotingListController } from './voting_list.controller';
import { VotingListService } from './voting_list.service';

describe('VotingListController', () => {
  let controller: VotingListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotingListController],
      providers: [VotingListService],
    }).compile();

    controller = module.get<VotingListController>(VotingListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
