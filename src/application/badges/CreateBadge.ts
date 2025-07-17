import { BadgeRepository } from '../../domain/repositories/BadgeRepository';
import { Badge } from '../../domain/entities/Badge';

export class CreateBadge {
  constructor(private badgeRepo: BadgeRepository) {}

  async execute(badge: Badge): Promise<Badge> {
    return this.badgeRepo.create(badge);
  }
}
