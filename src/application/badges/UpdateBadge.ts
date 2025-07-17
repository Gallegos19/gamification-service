import { BadgeRepository } from '../../domain/repositories/BadgeRepository';
import { Badge } from '../../domain/entities/Badge';

export class UpdateBadge {
  constructor(private badgeRepo: BadgeRepository) {}

  async execute(badgeId: string, badge: Partial<Badge>): Promise<Badge> {
    return this.badgeRepo.update(badgeId, badge);
  }
}
