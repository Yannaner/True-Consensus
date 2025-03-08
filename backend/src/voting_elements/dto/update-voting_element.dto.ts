import { PartialType } from '@nestjs/mapped-types';
import { CreateVotingElementDto } from './create-voting_element.dto';

export class UpdateVotingElementDto extends PartialType(CreateVotingElementDto) {}
