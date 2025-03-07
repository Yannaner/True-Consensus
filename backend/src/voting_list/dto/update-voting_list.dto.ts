import { PartialType } from '@nestjs/mapped-types';
import { CreateVotingListDto } from './create-voting_list.dto';

export class UpdateVotingListDto extends PartialType(CreateVotingListDto) {}
