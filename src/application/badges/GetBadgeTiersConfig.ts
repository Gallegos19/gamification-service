import { BadgeRepository } from '../../domain/repositories/BadgeRepository';

export class GetBadgeTiersConfig {
  constructor(private readonly badgeRepository: BadgeRepository) {}

  async execute() {
    return await this.badgeRepository.getBadgeTiersConfig();
  }
}