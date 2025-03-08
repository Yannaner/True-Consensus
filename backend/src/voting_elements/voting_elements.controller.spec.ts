import { Test, TestingModule } from '@nestjs/testing';
import { VotingElementsController } from './voting_elements.controller';
import { VotingElementsService } from './voting_elements.service';

describe('VotingElementsController', () => {
  let controller: VotingElementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotingElementsController],
      providers: [VotingElementsService],
    }).compile();

    controller = module.get<VotingElementsController>(VotingElementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
