export interface FeatureBadgeDTO {
  userId: string;
  badgeId: string;
}

export class FeatureBadge {
  constructor(private readonly repo: import('../../domain/repositories/BadgeRepository').BadgeRepository) {}

  async execute(dto: FeatureBadgeDTO): Promise<void> {
    await this.repo.featureBadge(dto.userId, dto.badgeId);
  }
}
