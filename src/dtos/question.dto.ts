import { IsNotEmpty, IsString, IsArray, ValidateNested, IsOptional, IsBoolean, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerDto {
  @IsInt()
  id!: number;

  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsBoolean()
  isCorrect!: boolean;
}

export class QuestionDto {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsInt()
  @IsNotEmpty()
  topicId!: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers!: AnswerDto[];
}
