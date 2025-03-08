import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConsensusVoteDto } from './dto/create-consensus_vote.dto';
import { UpdateConsensusVoteDto } from './dto/update-consensus_vote.dto';
import { ConsensusVote } from './entities/consensus_vote.entity';

@Injectable()
export class ConsensusVoteService {
  constructor(
    @InjectRepository(ConsensusVote)
    private consensusVoteRepository: Repository<ConsensusVote>,
  ) {}

  async create(createConsensusVoteDto: CreateConsensusVoteDto): Promise<ConsensusVote> {
    const consensusVote = this.consensusVoteRepository.create(createConsensusVoteDto);
    return await this.consensusVoteRepository.save(consensusVote);
  }

  async findAll(): Promise<ConsensusVote[]> {
    return await this.consensusVoteRepository.find({
      relations: ['voting'],
    });
  }

  async findOne(votingId: number): Promise<ConsensusVote> {
    const consensusVote = await this.consensusVoteRepository.findOne({
      where: { votingId },
      relations: ['voting'],
    });

    if (!consensusVote) {
      throw new NotFoundException(`Consensus vote with voting ID ${votingId} not found`);
    }

    return consensusVote;
  }

  async update(votingId: number, updateConsensusVoteDto: UpdateConsensusVoteDto): Promise<ConsensusVote> {
    const consensusVote = await this.findOne(votingId);
    
    // Update the entity with new values
    Object.assign(consensusVote, updateConsensusVoteDto);
    
    // Save the updated entity
    return await this.consensusVoteRepository.save(consensusVote);
  }

  async remove(votingId: number): Promise<void> {
    const result = await this.consensusVoteRepository.delete(votingId);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Consensus vote with voting ID ${votingId} not found`);
    }
  }
}
