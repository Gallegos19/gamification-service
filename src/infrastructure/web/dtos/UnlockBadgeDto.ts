import { IsString } from 'class-validator';

export class UnlockBadgeDto {
  @IsString()
  badgeId!: string;
}
