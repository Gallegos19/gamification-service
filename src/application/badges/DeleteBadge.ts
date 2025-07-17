import { BadgeRepository } from '../../domain/repositories/BadgeRepository';

export class DeleteBadge {
  constructor(private badgeRepo: BadgeRepository) {}

  async execute(badgeId: string): Promise<void> {
    return this.badgeRepo.delete(badgeId);
  }
}
