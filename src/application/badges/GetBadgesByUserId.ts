import { BadgeRepository } from '../../domain/repositories/BadgeRepository';
import { Badge } from '../../domain/entities/Badge';

export class GetBadgesByUserId {
  constructor(private readonly repo: BadgeRepository) {}

  async execute(userId: string): Promise<Badge[]> {
    return this.repo.getByUserId(userId);
  }
}
