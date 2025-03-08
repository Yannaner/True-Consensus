import { PartialType } from '@nestjs/mapped-types';
import { CreateCurrentVoteDto } from './create-current_vote.dto';

export class UpdateCurrentVoteDto extends PartialType(CreateCurrentVoteDto) {}
