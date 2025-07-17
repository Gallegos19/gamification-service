import { BadgeRepository } from '../../domain/repositories/BadgeRepository';

export class GetBadgeTiersProgress {
  constructor(private readonly badgeRepository: BadgeRepository) {}

  async execute(userId: string) {
    return await this.badgeRepository.getBadgeTiersProgress(userId);
  }
}