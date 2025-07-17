import { Badge } from '../entities/Badge';

export interface BadgeRepository {
  // CRUD base
  getAll(): Promise<Badge[]>;
  getById(badgeId: string): Promise<Badge | null>;
  create(badge: Badge): Promise<Badge>;
  update(badgeId: string, badge: Partial<Badge>): Promise<Badge>;
  delete(badgeId: string): Promise<void>;

  // Relación usuario-badge
  getByUserId(userId: string): Promise<Badge[]>;
  unlockBadge(userId: string, badgeId: string): Promise<void>;
  featureBadge(userId: string, badgeId: string): Promise<void>;

  // Advanced features
  getAvailableBadges(userId: string): Promise<any[]>;
  getBadgeTiersProgress(userId: string): Promise<any>;
  getBadgeTiersConfig(): Promise<any[]>;
}
