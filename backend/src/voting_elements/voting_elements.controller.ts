import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VotingElementsService } from './voting_elements.service';
import { CreateVotingElementDto } from './dto/create-voting_element.dto';
import { UpdateVotingElementDto } from './dto/update-voting_element.dto';

@Controller('voting-elements')
export class VotingElementsController {
  constructor(private readonly votingElementsService: VotingElementsService) {}

  @Post()
  create(@Body() createVotingElementDto: CreateVotingElementDto) {
    return this.votingElementsService.create(createVotingElementDto);
  }

  @Get()
  findAll() {
    return this.votingElementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.votingElementsService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVotingElementDto: UpdateVotingElementDto) {
    return this.votingElementsService.updateById(+id, updateVotingElementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.votingElementsService.removeById(+id);
  }
}
