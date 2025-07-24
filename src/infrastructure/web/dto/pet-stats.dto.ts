import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdatePetStatsDto {
  @ApiProperty({
    description: 'Amount to increase/decrease happiness (1-100)',
    minimum: 1,
    maximum: 100,
    required: false,
    example: 10
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  happiness?: number;

  @ApiProperty({
    description: 'Amount to increase/decrease health (1-100)',
    minimum: 1,
    maximum: 100,
    required: false,
    example: 5
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  health?: number;
}

export class PetStatsResponseDto {
  @ApiProperty({ description: 'Pet ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  id!: string;

  @ApiProperty({ description: 'Pet nickname', example: 'Fluffy' })
  nickname!: string;

  @ApiProperty({ description: 'Current happiness level (10-100)', example: 85 })
  @Min(10)
  @Max(100)
  happiness_level!: number;

  @ApiProperty({ description: 'Current health level (10-100)', example: 90 })
  @Min(10)
  @Max(100)
  health_level!: number;

  @ApiProperty({ description: 'Last interaction timestamp', example: '2023-07-23T19:00:00.000Z' })
  last_interaction_at!: Date;
}
