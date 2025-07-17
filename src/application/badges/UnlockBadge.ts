import { BadgeRepository } from '../../domain/repositories/BadgeRepository';

export interface UnlockBadgeDTO {
  userId: string;
  badgeId: string;
}

export class UnlockBadge {
  constructor(private readonly repo: BadgeRepository) {}

  async execute(dto: UnlockBadgeDTO): Promise<void> {
    await this.repo.unlockBadge(dto.userId, dto.badgeId);
  }
}

