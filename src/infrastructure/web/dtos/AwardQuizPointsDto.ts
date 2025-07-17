import { IsInt, Min, IsOptional, IsString, IsNumber } from "class-validator";

export class AwardQuizPointsDto {
  @IsInt()
  @Min(1)
  points!: number;

  @IsOptional()
  @IsString()
  quizId?: string;

  @IsOptional()
  @IsNumber()
  quiz_score_percentage?: number;

  @IsOptional()
  @IsString()
  bonus_reason?: string;

  @IsOptional()
  @IsNumber()
  multiplier?: number;
}
