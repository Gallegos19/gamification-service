import { BadgeRepository } from '../../../domain/repositories/BadgeRepository';
import { Badge } from '../../../domain/entities/Badge';
import prisma from '../prismaClient';

export class BadgePrismaRepository implements BadgeRepository {
  // CRUD base
  async getAll(): Promise<Badge[]> {
    const badges = await prisma.badges.findMany();
    return badges.map((b: any) => this.mapBadgeBase(b));
  }

  async getById(badgeId: string): Promise<Badge | null> {
    const b = await prisma.badges.findUnique({ where: { id: badgeId } });
    return b ? this.mapBadgeBase(b) : null;
  }

  async create(badge: Badge): Promise<Badge> {
    const created = await prisma.badges.create({
      data: {
        name: badge.badge.name,
        description: badge.badge.description,
        icon_url: badge.badge.icon_url,
        category: badge.badge.category,
        rarity: badge.badge.rarity,
        badge_tier: badge.badge.badge_tier,
        unlock_criteria: badge.badge.unlock_criteria,
        challenge_points_required: 0, // Ajusta según tu modelo
        points_reward: 0,
        is_secret: false,
        unlock_order: null,
      },
    });
    return this.mapBadgeBase(created);
  }

  async update(badgeId: string, badge: Partial<Badge>): Promise<Badge> {
    const updated = await prisma.badges.update({
      where: { id: badgeId },
      data: {
        name: badge.badge?.name,
        description: badge.badge?.description,
        icon_url: badge.badge?.icon_url,
        category: badge.badge?.category,
        rarity: badge.badge?.rarity,
        badge_tier: badge.badge?.badge_tier,
        unlock_criteria: badge.badge?.unlock_criteria,
      },
    });
    return this.mapBadgeBase(updated);
  }

  async delete(badgeId: string): Promise<void> {
    await prisma.badges.delete({ where: { id: badgeId } });
  }

  private mapBadgeBase(b: any): Badge {
    // Devuelve un Badge base (sin datos de usuario)
    return new Badge(
      b.id,
      '', // user_id
      b.id, // badge_id
      b.created_at,
      false,
      null,
      {
        name: b.name,
        description: b.description,
        icon_url: b.icon_url,
        category: b.category,
        rarity: b.rarity,
        badge_tier: b.badge_tier,
        unlock_criteria: b.unlock_criteria,
      }
    );
  }

  async getByUserId(userId: string): Promise<Badge[]> {
    const userBadges = await prisma.user_badges.findMany({
      where: { user_id: userId },
      include: { badge: true },
    });
    return userBadges.map((ub: any) => new Badge(
      ub.id,
      ub.user_id,
      ub.badge_id,
      ub.unlocked_at,
      ub.is_featured,
      ub.challenge_points_when_unlocked,
      {
        name: ub.badge.name,
        description: ub.badge.description,
        icon_url: ub.badge.icon_url,
        category: ub.badge.category,
        rarity: ub.badge.rarity,
        badge_tier: ub.badge.badge_tier,
        unlock_criteria: ub.badge.unlock_criteria,
      }
    ));
  }

  async unlockBadge(userId: string, badgeId: string): Promise<void> {
    await prisma.user_badges.create({
      data: {
        user_id: userId,
        badge_id: badgeId,
        unlocked_at: new Date(),
      },
    });
  }

  async featureBadge(userId: string, badgeId: string): Promise<void> {
    // Desmarcar todos los badges destacados del usuario
    await prisma.user_badges.updateMany({
      where: { user_id: userId, is_featured: true },
      data: { is_featured: false },
    });

    // Buscar el registro específico
    const userBadge = await prisma.user_badges.findFirst({
      where: { user_id: userId, badge_id: badgeId },
      select: { id: true },
    });

    if (!userBadge) {
      throw new Error('Badge not found for this user');
    }

    // Destacar solo ese badge
    await prisma.user_badges.update({
      where: { id: userBadge.id },
      data: { is_featured: true },
    });
  }

  /**
   * Obtiene badges disponibles para desbloquear por un usuario
   */
  async getAvailableBadges(userId: string): Promise<any[]> {
    // Obtener puntos de challenge del usuario
    const userChallengePoints = await prisma.user_challenge_points.findUnique({
      where: { user_id: userId },
      select: { total_challenge_points: true }
    });

    const currentPoints = userChallengePoints?.total_challenge_points || 0;

    // Obtener badges que ya posee el usuario
    const ownedBadges = await prisma.user_badges.findMany({
      where: { user_id: userId },
      select: { badge_id: true }
    });
    const ownedBadgeIds = ownedBadges.map(ub => ub.badge_id);

    // Obtener badges disponibles (que no posee y puede desbloquear)
    const availableBadges = await prisma.badges.findMany({
      where: {
        id: { notIn: ownedBadgeIds },
        deleted_at: null,
        challenge_points_required: { lte: currentPoints }
      },
      orderBy: [
        { badge_tier: 'asc' },
        { challenge_points_required: 'asc' }
      ]
    });

    return availableBadges.map(badge => ({
      badge_id: badge.id,
      name: badge.name,
      description: badge.description,
      icon_url: badge.icon_url,
      category: badge.category,
      rarity: badge.rarity,
      badge_tier: badge.badge_tier,
      challenge_points_required: badge.challenge_points_required,
      user_current_points: currentPoints,
      points_needed: Math.max(0, badge.challenge_points_required - currentPoints),
      can_unlock: badge.challenge_points_required <= currentPoints,
      unlock_criteria: badge.unlock_criteria
    }));
  }

  /**
   * Obtiene el progreso de tiers de badges del usuario
   */
  async getBadgeTiersProgress(userId: string): Promise<any> {
    // Obtener puntos de challenge del usuario
    const userChallengePoints = await prisma.user_challenge_points.findUnique({
      where: { user_id: userId }
    });

    const currentPoints = userChallengePoints?.total_challenge_points || 0;
    const currentTier = userChallengePoints?.current_badge_tier || 'bronze';

    // Obtener configuración de tiers
    const tiersConfig = await prisma.badge_tiers_config.findMany({
      orderBy: { tier_order: 'asc' }
    });

    // Encontrar tier actual y siguiente
    const currentTierConfig = tiersConfig.find(t => t.tier_name === currentTier);
    const currentTierIndex = tiersConfig.findIndex(t => t.tier_name === currentTier);
    const nextTierConfig = currentTierIndex < tiersConfig.length - 1 ? 
      tiersConfig[currentTierIndex + 1] : null;

    // Calcular progreso
    const pointsToNextTier = nextTierConfig ? 
      Math.max(0, nextTierConfig.challenge_points_required - currentPoints) : 0;
    
    const progressPercentage = nextTierConfig ? 
      Math.min(100, (currentPoints / nextTierConfig.challenge_points_required) * 100) : 100;

    // Obtener badges del usuario por tier
    const userBadges = await prisma.user_badges.findMany({
      where: { user_id: userId },
      include: { badge: true }
    });

    const badgesByTier = tiersConfig.reduce((acc, tier) => {
      acc[tier.tier_name] = userBadges.filter(ub => ub.badge.badge_tier === tier.tier_name);
      return acc;
    }, {} as any);

    return {
      user_id: userId,
      current_tier: currentTier,
      current_tier_info: currentTierConfig ? {
        tier_name: currentTierConfig.tier_name,
        tier_order: currentTierConfig.tier_order,
        challenge_points_required: currentTierConfig.challenge_points_required,
        tier_color_hex: currentTierConfig.tier_color_hex,
        tier_icon_url: currentTierConfig.tier_icon_url,
        tier_description: currentTierConfig.tier_description
      } : null,
      next_tier: nextTierConfig?.tier_name || null,
      next_tier_info: nextTierConfig ? {
        tier_name: nextTierConfig.tier_name,
        tier_order: nextTierConfig.tier_order,
        challenge_points_required: nextTierConfig.challenge_points_required,
        tier_color_hex: nextTierConfig.tier_color_hex,
        tier_icon_url: nextTierConfig.tier_icon_url,
        tier_description: nextTierConfig.tier_description
      } : null,
      current_points: currentPoints,
      points_to_next_tier: pointsToNextTier,
      progress_percentage: Math.round(progressPercentage * 100) / 100,
      badges_by_tier: badgesByTier,
      total_badges_owned: userBadges.length
    };
  }

  /**
   * Obtiene la configuración de tiers de badges
   */
  async getBadgeTiersConfig(): Promise<any[]> {
    const tiersConfig = await prisma.badge_tiers_config.findMany({
      orderBy: { tier_order: 'asc' }
    });

    return tiersConfig.map(tier => ({
      tier_name: tier.tier_name,
      tier_order: tier.tier_order,
      challenge_points_required: tier.challenge_points_required,
      tier_color_hex: tier.tier_color_hex,
      tier_icon_url: tier.tier_icon_url,
      tier_description: tier.tier_description,
      rewards_unlocked: tier.rewards_unlocked,
      created_at: tier.created_at,
      updated_at: tier.updated_at
    }));
  }
}

