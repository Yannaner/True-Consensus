import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateConsensusVoteDto {
  @IsNotEmpty()
  @IsNumber()
  votingId: number;

  @IsOptional()
  @IsString()
  calculatedConsensus?: string;
}