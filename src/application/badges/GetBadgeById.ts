import { BadgeRepository } from '../../domain/repositories/BadgeRepository';
import { Badge } from '../../domain/entities/Badge';

export class GetBadgeById {
  constructor(private badgeRepo: BadgeRepository) {}

  async execute(badgeId: string): Promise<Badge | null> {
    return this.badgeRepo.getById(badgeId);
  }
}
