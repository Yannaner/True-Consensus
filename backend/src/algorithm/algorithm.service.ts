import { Injectable, OnModuleInit } from '@nestjs/common';
import { CurrentVotesService } from '../current_votes/current_votes.service';

@Injectable()
export class AlgorithmService  {
  constructor(
    private readonly currentVotesService: CurrentVotesService
  ) {}


//       const votes = await this.currentVotesService.findByVotingId(1); is how to get all votes for specifici voting id


}
