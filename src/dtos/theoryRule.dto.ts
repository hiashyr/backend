import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class TheoryRuleDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value.toString(), 10))
  pointId!: number;

  @IsString()
  @IsOptional()
  createdat?: string;

  @IsString()
  @IsOptional()
  updatedat?: string;
}
