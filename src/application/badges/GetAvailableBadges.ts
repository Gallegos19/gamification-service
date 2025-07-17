import { BadgeRepository } from '../../domain/repositories/BadgeRepository';

export class GetAvailableBadges {
  constructor(private readonly badgeRepository: BadgeRepository) {}

  async execute(userId: string) {
    return await this.badgeRepository.getAvailableBadges(userId);
  }
}