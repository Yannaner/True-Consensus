import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConsensusVoteDto } from './dto/create-consensus_vote.dto';
import { UpdateConsensusVoteDto } from './dto/update-consensus_vote.dto';
import { ConsensusVote } from './entities/consensus_vote.entity';
import { VotingElementsService } from 'src/voting_elements/voting_elements.service';
import { AlgorithmService } from 'src/algorithm/algorithm.service';

@Injectable()
export class ConsensusVoteService {
  constructor(
    @InjectRepository(ConsensusVote)
    private consensusVoteRepository: Repository<ConsensusVote>,
    private readonly votingElementsService: VotingElementsService,
    private readonly algoService: AlgorithmService
    
  ) {}

  async create(createConsensusVoteDto: CreateConsensusVoteDto): Promise<ConsensusVote> {
    // Get the consensus calculation from algoService
    const calculatedConsensus = await this.algoService.calculateConsensus(+createConsensusVoteDto.votingId);
    
    // Check if a consensus vote already exists for this votingId
    const existingVote = await this.consensusVoteRepository.findOne({
      where: { votingId: +createConsensusVoteDto.votingId }
    });
  
    if (existingVote) {
      // Update existing consensus vote
      existingVote.calculatedConsensus = calculatedConsensus;
      return this.consensusVoteRepository.save(existingVote);
    } else {
      // Create a new entity with the calculated consensus value
      const newConsensusVote = this.consensusVoteRepository.create({
        ...createConsensusVoteDto,
        calculatedConsensus: calculatedConsensus
      });
      
      // Save to database
      return this.consensusVoteRepository.save(newConsensusVote);
    }
  }

  async findAll(): Promise<ConsensusVote[]> {
    return await this.consensusVoteRepository.find({
      relations: ['voting'],
    });
  }

  async findOne(votingId: number): Promise<any> {
    await this.create({ votingId: votingId });

    const consensusVote = await this.consensusVoteRepository.findOne({
      where: { votingId },
      relations: ['voting'],
    });

    if (!consensusVote) {
      throw new NotFoundException(`Consensus vote with voting ID ${votingId} not found`);
    }

    // Enhance consensus vote with item names
    return await this.enhanceWithItemNames(consensusVote);
  }

  async enhanceWithItemNames(consensusVote: ConsensusVote): Promise<any> {
    // Create a new object instead of modifying the original
    const result: any = { 
      ...consensusVote,
      formattedConsensus: "No consensus data available" 
    };
    
    // Check if calculatedConsensus exists and is not empty
    if (result.calculatedConsensus) {
      // Get the IDs from the calculatedConsensus
      const ids = result.calculatedConsensus.split(',');
      
      // Get all voting elements for this voting ID
      const votingElements = await this.votingElementsService.findByVotingId(result.votingId);
      
      // Create a map of ID to element for quick lookup
      const elementsById = new Map();
      votingElements.forEach(element => {
        elementsById.set(element.id.toString(), element);
      });
      
      // Replace IDs with formatted item names
      const formattedConsensus = ids.map((id, index) => {
        const element = elementsById.get(id.trim());
        return element ? `${element.item}` : `Unknown item (ID: ${id})`;
      }).join(', ');
      
      // Add the formatted consensus to the result
      result.formattedConsensus = formattedConsensus;
    }
    
    return result;
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
