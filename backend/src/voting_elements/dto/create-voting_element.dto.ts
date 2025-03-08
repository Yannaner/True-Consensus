import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVotingElementDto {
  @IsNotEmpty()
  @IsNumber()
  voting_id: number;

  @IsNotEmpty()
  @IsString()
  item: string;
}