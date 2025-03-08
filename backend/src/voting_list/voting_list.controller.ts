import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VotingListService } from './voting_list.service';
import { CreateVotingListDto } from './dto/create-voting_list.dto';
import { UpdateVotingListDto } from './dto/update-voting_list.dto';

@Controller('voting-list')
export class VotingListController {
  constructor(private readonly votingListService: VotingListService) {}

  @Post()
  create(@Body() createVotingListDto: CreateVotingListDto) {
    return this.votingListService.create(createVotingListDto);
  }

  @Get()
  findAll() {
    return this.votingListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votingListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVotingListDto: UpdateVotingListDto) {
    return this.votingListService.update(+id, updateVotingListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.votingListService.remove(+id);
  }
}
