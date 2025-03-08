import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

  private standardizeText(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '');
  }

  async create(
    createVotingElementDto: CreateVotingElementDto,
  ): Promise<VotingElement> {
    // Get existing elements with the same voting_id
    const existingElements = await this.findByVotingId(
      createVotingElementDto.voting_id,
    );

    // Standardize the new element text
    const standardizedNewItem = this.standardizeText(
      createVotingElementDto.item,
    );

    // Check for duplicates after standardization
    const isDuplicate = existingElements.some(
      (element) => this.standardizeText(element.item) === standardizedNewItem,
    );

    if (isDuplicate) {
      throw new BadRequestException(
        `A similar voting element already exists in this voting list`,
      );
    }

    const votingElement = this.votingElementRepository.create(
      createVotingElementDto,
    );
    return await this.votingElementRepository.save(votingElement);
  }

  async createMany(
    createVotingElementDtos: CreateVotingElementDto[],
  ): Promise<VotingElement[]> {
    // Group DTOs by voting_id for more efficient processing
    const dtosByVotingId = createVotingElementDtos.reduce(
      (acc, dto) => {
        if (!acc[dto.voting_id]) {
          acc[dto.voting_id] = [];
        }
        acc[dto.voting_id].push(dto);
        return acc;
      },
      {} as Record<number, CreateVotingElementDto[]>,
    );

    const results: VotingElement[] = [];

    // Process each voting_id group
    for (const votingId of Object.keys(dtosByVotingId)) {
      const numericVotingId = Number(votingId);
      const dtos = dtosByVotingId[numericVotingId];

      // Get existing elements for this voting_id
      const existingElements = await this.findByVotingId(numericVotingId);
      const existingStandardized = existingElements.map((el) =>
        this.standardizeText(el.item),
      );

      // Check for duplicates within the new batch
      const newItemsStandardized = new Set<string>();

      // Filter out duplicates
      const uniqueDtos = dtos.filter((dto) => {
        const standardized = this.standardizeText(dto.item);

        // Check if it's a duplicate within existing elements or the current batch
        if (
          existingStandardized.includes(standardized) ||
          newItemsStandardized.has(standardized)
        ) {
          return false;
        }

        newItemsStandardized.add(standardized);
        return true;
      });

      if (uniqueDtos.length === 0) continue;

      const votingElements = this.votingElementRepository.create(uniqueDtos);
      const saved = await this.votingElementRepository.save(votingElements);
      results.push(...saved);
    }

    if (results.length < createVotingElementDtos.length) {
      throw new BadRequestException(
        `Some voting elements were not created due to duplicates`,
      );
    }

    return results;
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
      throw new NotFoundException(
        `Voting element with voting_id ${voting_id} and item "${item}" not found`,
      );
    }

    return votingElement;
  }

  async update(
    voting_id: number,
    item: string,
    updateVotingElementDto: UpdateVotingElementDto,
  ): Promise<VotingElement> {
    const votingElement = await this.findOne(voting_id, item);

    // Update with new data
    Object.assign(votingElement, updateVotingElementDto);

    return await this.votingElementRepository.save(votingElement);
  }

  async updateById(
    id: number,
    updateVotingElementDto: UpdateVotingElementDto,
  ): Promise<VotingElement> {
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
