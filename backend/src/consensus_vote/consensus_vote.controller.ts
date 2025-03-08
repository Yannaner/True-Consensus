import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsensusVoteService } from './consensus_vote.service';
import { CreateConsensusVoteDto } from './dto/create-consensus_vote.dto';
import { UpdateConsensusVoteDto } from './dto/update-consensus_vote.dto';

@Controller('consensus-vote')
export class ConsensusVoteController {
  constructor(private readonly consensusVoteService: ConsensusVoteService) {}

  @Post()
  create(@Body() createConsensusVoteDto: CreateConsensusVoteDto) {
    return this.consensusVoteService.create(createConsensusVoteDto);
  }

  @Get()
  findAll() {
    return this.consensusVoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consensusVoteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsensusVoteDto: UpdateConsensusVoteDto) {
    return this.consensusVoteService.update(+id, updateConsensusVoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consensusVoteService.remove(+id);
  }
}
