import { PartialType } from '@nestjs/mapped-types';
import { CreateConsensusVoteDto } from './create-consensus_vote.dto';

export class UpdateConsensusVoteDto extends PartialType(CreateConsensusVoteDto) {}
