import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CurrentVotesService } from './current_votes.service';
import { CreateCurrentVoteDto } from './dto/create-current_vote.dto';
import { UpdateCurrentVoteDto } from './dto/update-current_vote.dto';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';

@Controller('current-votes')
export class CurrentVotesController {
  constructor(private readonly currentVotesService: CurrentVotesService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  create(@Req() req, @Body() createCurrentVoteDto: CreateCurrentVoteDto) {
    return this.currentVotesService.create(createCurrentVoteDto, req.user.uid);
  }

  @Get()
  findAll() {
    return this.currentVotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
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
