import { BadgeRepository } from '../../domain/repositories/BadgeRepository';
import { Badge } from '../../domain/entities/Badge';

export class GetAllBadges {
  constructor(private badgeRepo: BadgeRepository) {}

  async execute(): Promise<Badge[]> {
    return this.badgeRepo.getAll();
  }
}
