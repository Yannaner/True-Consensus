import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCurrentVoteDto {
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  @IsInt()
  voting_id: number;

  @IsOptional()
  @IsString()
  ranking?: string;
}