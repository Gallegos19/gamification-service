import { IsString, IsInt, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class AwardQuizPointsDto {
  @IsString()
  user_id!: string;

  @IsString()
  quiz_id!: string;

  @IsInt()
  @Min(1)
  points_earned!: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  quiz_score_percentage!: number;

  @IsOptional()
  @IsString()
  bonus_reason?: string;

  @IsOptional()
  @IsNumber()
  multiplier?: number;
}
