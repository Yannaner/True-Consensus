import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCurrentVoteDto } from './dto/create-current_vote.dto';
import { UpdateCurrentVoteDto } from './dto/update-current_vote.dto';
import { CurrentVote } from './entities/current_vote.entity';

@Injectable()
export class CurrentVotesService {
  constructor(
    @InjectRepository(CurrentVote)
    private currentVoteRepository: Repository<CurrentVote>,
  ) {}

  async create(createCurrentVoteDto: CreateCurrentVoteDto): Promise<CurrentVote> {
    // Check if the user already voted on this voting list
    const existingVote = await this.currentVoteRepository.findOne({
      where: {
        userId: createCurrentVoteDto.user_id,
        votingId: createCurrentVoteDto.voting_id
      }
    });

    if (existingVote) {
      // Update the existing vote instead of throwing an exception
      this.currentVoteRepository.merge(existingVote, createCurrentVoteDto);
      return this.currentVoteRepository.save(existingVote);
    }
    
    // Create a new vote if one doesn't exist
    const newVote = this.currentVoteRepository.create(createCurrentVoteDto);
    return this.currentVoteRepository.save(newVote);
  }

  async findAll(): Promise<CurrentVote[]> {
    return this.currentVoteRepository.find({
      relations: ['user', 'votingList']
    });
  }

  async findOne(id: number): Promise<CurrentVote> {
    const vote = await this.currentVoteRepository.findOne({
      where: { voteId: id },
      relations: ['user', 'votingList']
    });
    
    if (!vote) {
      throw new NotFoundException(`Current vote with ID ${id} not found`);
    }
    
    return vote;
  }

  async findByVotingId(votingId: number): Promise<CurrentVote[]> {
    return this.currentVoteRepository.find({
      where: { votingId },
      relations: ['user']
    });
  }

  async findByUserId(userId: number): Promise<CurrentVote[]> {
    return this.currentVoteRepository.find({
      where: { userId },
      relations: ['votingList']
    });
  }

  async update(id: number, updateCurrentVoteDto: UpdateCurrentVoteDto): Promise<CurrentVote> {
    const vote = await this.findOne(id);
    
    // Update vote with new data
    this.currentVoteRepository.merge(vote, updateCurrentVoteDto);
    return this.currentVoteRepository.save(vote);
  }

  async remove(id: number): Promise<void> {
    const result = await this.currentVoteRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Current vote with ID ${id} not found`);
    }
  }
}