import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCurrentVoteDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsInt()
  voting_id: number;

  @IsOptional()
  @IsString()
  ranking?: string;
}