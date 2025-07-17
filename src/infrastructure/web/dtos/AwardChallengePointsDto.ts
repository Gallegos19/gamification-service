import { IsInt, Min, IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

export class AwardChallengePointsDto {
  @IsInt()
  @Min(1)
  points!: number;

  @IsOptional()
  @IsString()
  challengeId?: string;

  @IsOptional()
  @IsString()
  submissionId?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  validationScore?: number;

  @IsOptional()
  @IsString()
  @IsIn(['energy', 'waste', 'water', 'biodiversity'])
  environmentalCategory?: string;

  @IsOptional()
  @IsString()
  bonusReason?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  multiplier?: number;
}
