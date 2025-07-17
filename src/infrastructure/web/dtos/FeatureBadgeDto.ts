import { IsString } from 'class-validator';

export class FeatureBadgeDto {
  @IsString()
  badgeId!: string;
}
