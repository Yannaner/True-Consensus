import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVotingListDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsOptional()
  @IsNumber()
  voting_amt?: number;
}
