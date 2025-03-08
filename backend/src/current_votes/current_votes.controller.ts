import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurrentVotesService } from './current_votes.service';
import { CreateCurrentVoteDto } from './dto/create-current_vote.dto';
import { UpdateCurrentVoteDto } from './dto/update-current_vote.dto';

@Controller('current-votes')
export class CurrentVotesController {
  constructor(private readonly currentVotesService: CurrentVotesService) {}

  @Post()
  create(@Body() createCurrentVoteDto: CreateCurrentVoteDto) {
    return this.currentVotesService.create(createCurrentVoteDto);
  }

  @Get()
  findAll() {
    return this.currentVotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currentVotesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurrentVoteDto: UpdateCurrentVoteDto) {
    return this.currentVotesService.update(+id, updateCurrentVoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currentVotesService.remove(+id);
  }
}
