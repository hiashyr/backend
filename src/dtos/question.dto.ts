import { IsNotEmpty, IsString, IsArray, ValidateNested, IsOptional, IsBoolean, IsInt, IsIn } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class AnswerDto {
  @IsInt()
  @IsOptional()
  id?: number;

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
  @Transform(({ value }) => parseInt(value.toString(), 10))
  topicId!: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true' || value === true)
  isHard!: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers!: AnswerDto[];
}
