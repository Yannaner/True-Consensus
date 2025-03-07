import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVotingListDto } from './dto/create-voting_list.dto';
import { UpdateVotingListDto } from './dto/update-voting_list.dto';
import { VotingList } from './entities/voting_list.entity';

@Injectable()
export class VotingListService {
  constructor(
    @InjectRepository(VotingList)
    private votingListRepository: Repository<VotingList>,
  ) {}

  async create(createVotingListDto: CreateVotingListDto): Promise<VotingList> {
    const votingList = this.votingListRepository.create({
      question: createVotingListDto.question,
      voting_amt: createVotingListDto.voting_amt || 0,
    });
    
    return await this.votingListRepository.save(votingList);
  }

  async findAll(): Promise<VotingList[]> {
    return await this.votingListRepository.find();
  }

  async findOne(voting_id: number): Promise<VotingList> {
    const votingList = await this.votingListRepository.findOne({
      where: { voting_id },
    });
    
    if (!votingList) {
      throw new NotFoundException(`Voting list with ID ${voting_id} not found`);
    }
    
    return votingList;
  }

  async update(id: number, updateVotingListDto: UpdateVotingListDto): Promise<VotingList> {
    const votingList = await this.findOne(id);
    
    // Update properties
    if (updateVotingListDto.question !== undefined) {
      votingList.question = updateVotingListDto.question;
    }
    
    if (updateVotingListDto.voting_amt !== undefined) {
      votingList.voting_amt = updateVotingListDto.voting_amt;
    }
    
    return await this.votingListRepository.save(votingList);
  }

  async remove(id: number): Promise<void> {
    const result = await this.votingListRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Voting list with ID ${id} not found`);
    }
  }
}
