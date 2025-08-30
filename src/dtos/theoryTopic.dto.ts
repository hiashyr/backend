import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class TheoryTopicDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsString()
  @IsOptional()
  createdat?: string;

  @IsString()
  @IsOptional()
  updatedat?: string;
}
