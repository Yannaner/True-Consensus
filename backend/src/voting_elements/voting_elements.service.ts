import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVotingElementDto } from './dto/create-voting_element.dto';
import { UpdateVotingElementDto } from './dto/update-voting_element.dto';
import { VotingElement } from './entities/voting_element.entity';

@Injectable()
export class VotingElementsService {
  constructor(
    @InjectRepository(VotingElement)
    private readonly votingElementRepository: Repository<VotingElement>,
  ) {}

  async create(createVotingElementDto: CreateVotingElementDto): Promise<VotingElement> {
    const votingElement = this.votingElementRepository.create(createVotingElementDto);
    return await this.votingElementRepository.save(votingElement);
  }

  async createMany(createVotingElementDtos: CreateVotingElementDto[]): Promise<VotingElement[]> {
    const votingElements = this.votingElementRepository.create(createVotingElementDtos);
    return await this.votingElementRepository.save(votingElements);
  }

  async findAll(): Promise<VotingElement[]> {
    return await this.votingElementRepository.find({
      relations: ['votingList'],
      order: { voting_id: 'ASC', item: 'ASC' },
    });
  }

  async findById(id: number): Promise<VotingElement> {
    const votingElement = await this.votingElementRepository.findOne({
      where: { id },
      relations: ['votingList'],
    });
    
    if (!votingElement) {
      throw new NotFoundException(`Voting element with id ${id} not found`);
    }
    
    return votingElement;
  }

  async findOne(voting_id: number, item: string): Promise<VotingElement> {
    const votingElement = await this.votingElementRepository.findOne({
      where: { voting_id, item },
      relations: ['votingList'],
    });
    
    if (!votingElement) {
      throw new NotFoundException(`Voting element with voting_id ${voting_id} and item "${item}" not found`);
    }
    
    return votingElement;
  }

  async update(voting_id: number, item: string, updateVotingElementDto: UpdateVotingElementDto): Promise<VotingElement> {
    const votingElement = await this.findOne(voting_id, item);
    
    // Update with new data
    Object.assign(votingElement, updateVotingElementDto);
    
    return await this.votingElementRepository.save(votingElement);
  }

  async updateById(id: number, updateVotingElementDto: UpdateVotingElementDto): Promise<VotingElement> {
    const votingElement = await this.findById(id);
    
    // Update with new data
    Object.assign(votingElement, updateVotingElementDto);
    
    return await this.votingElementRepository.save(votingElement);
  }

  async remove(voting_id: number, item: string): Promise<void> {
    const votingElement = await this.findOne(voting_id, item);
    await this.votingElementRepository.remove(votingElement);
  }
  
  async removeById(id: number): Promise<void> {
    const votingElement = await this.findById(id);
    await this.votingElementRepository.remove(votingElement);
  }
  
  async findByVotingId(voting_id: number): Promise<VotingElement[]> {
    return await this.votingElementRepository.find({
      where: { voting_id },
      order: { item: 'ASC' },
    });
  }
  
  async countByVotingId(voting_id: number): Promise<number> {
    return await this.votingElementRepository.count({
      where: { voting_id },
    });
  }
}
