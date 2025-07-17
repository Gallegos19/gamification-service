import { RankingsRepository } from '../../../domain/repositories/RankingsRepository';
import prisma from '../prismaClient';

export class RankingsPrismaRepository implements RankingsRepository {
  /**
   * Obtiene rankings combinados de quiz y challenge points
   */
  async getCombinedRankings(limit: number = 50, offset: number = 0): Promise<any[]> {
    // Obtener rankings de quiz points
    const quizRankings = await prisma.quiz_points_rankings.findMany({
      orderBy: { total_quiz_score: 'desc' },
      take: limit,
      skip: offset,
      select: {
        user_id: true,
        global_quiz_rank: true,
        total_quiz_score: true,
        quiz_accuracy_percentage: true,
        total_quizzes_completed: true
      }
    });

    // Obtener rankings de challenge points
    const challengeRankings = await prisma.challenge_points_rankings.findMany({
      orderBy: { total_challenge_score: 'desc' },
      take: limit,
      skip: offset,
      select: {
        user_id: true,
        global_challenge_rank: true,
        total_challenge_score: true,
        environmental_impact_score: true,
        total_challenges_completed: true,
        challenge_completion_rate: true
      }
    });

    // Combinar datos por usuario
    const userMap = new Map();

    // Procesar quiz rankings
    quizRankings.forEach((quiz, index) => {
      userMap.set(quiz.user_id, {
        user_id: quiz.user_id,
        combined_rank: index + 1 + offset,
        quiz_data: {
          quiz_rank: quiz.global_quiz_rank,
          quiz_score: quiz.total_quiz_score,
          quiz_accuracy: quiz.quiz_accuracy_percentage,
          quizzes_completed: quiz.total_quizzes_completed
        },
        challenge_data: null,
        total_score: quiz.total_quiz_score
      });
    });

    // Agregar challenge data
    challengeRankings.forEach(challenge => {
      const existing = userMap.get(challenge.user_id);
      if (existing) {
        existing.challenge_data = {
          challenge_rank: challenge.global_challenge_rank,
          challenge_score: challenge.total_challenge_score,
          environmental_impact: challenge.environmental_impact_score,
          challenges_completed: challenge.total_challenges_completed,
          completion_rate: challenge.challenge_completion_rate
        };
        existing.total_score += challenge.total_challenge_score;
      } else {
        userMap.set(challenge.user_id, {
          user_id: challenge.user_id,
          combined_rank: null, // Se calculará después
          quiz_data: null,
          challenge_data: {
            challenge_rank: challenge.global_challenge_rank,
            challenge_score: challenge.total_challenge_score,
            environmental_impact: challenge.environmental_impact_score,
            challenges_completed: challenge.total_challenges_completed,
            completion_rate: challenge.challenge_completion_rate
          },
          total_score: challenge.total_challenge_score
        });
      }
    });

    // Convertir a array y ordenar por score total
    const combinedRankings = Array.from(userMap.values())
      .sort((a, b) => b.total_score - a.total_score)
      .map((user, index) => ({
        ...user,
        combined_rank: index + 1 + offset
      }));

    return combinedRankings;
  }

  /**
   * Obtiene estadísticas completas de un usuario
   */
  async getUserStats(userId: string): Promise<any> {
    // Obtener datos de quiz points
    const quizPoints = await prisma.user_quiz_points.findUnique({
      where: { user_id: userId }
    });

    const quizRanking = await prisma.quiz_points_rankings.findUnique({
      where: { user_id: userId }
    });

    // Obtener datos de challenge points
    const challengePoints = await prisma.user_challenge_points.findUnique({
      where: { user_id: userId }
    });

    const challengeRanking = await prisma.challenge_points_rankings.findUnique({
      where: { user_id: userId }
    });

    // Obtener mascotas del usuario
    const userPets = await prisma.user_pets.findMany({
      where: { user_id: userId, is_active: true },
      include: {
        pet: {
          select: {
            name: true,
            species_type: true,
            rarity: true
          }
        }
      }
    });

    // Obtener badges del usuario
    const userBadges = await prisma.user_badges.findMany({
      where: { user_id: userId },
      include: {
        badge: {
          select: {
            name: true,
            badge_tier: true,
            rarity: true,
            category: true
          }
        }
      }
    });

    // Obtener historial reciente (últimas 10 actividades)
    const recentQuizHistory = await prisma.quiz_points_history.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      take: 5
    });

    const recentChallengeHistory = await prisma.challenge_points_history.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      take: 5
    });

    // Calcular estadísticas adicionales
    const totalScore = (quizPoints?.total_quiz_points || 0) + (challengePoints?.total_challenge_points || 0);
    const globalRank = this.calculateGlobalRank(quizRanking?.global_quiz_rank, challengeRanking?.global_challenge_rank);

    return {
      user_id: userId,
      overview: {
        total_combined_score: totalScore,
        global_combined_rank: globalRank,
        total_pets_owned: userPets.length,
        total_badges_owned: userBadges.length,
        account_level: this.calculateAccountLevel(totalScore),
        join_date: quizPoints?.created_at || challengePoints?.created_at
      },
      quiz_system: {
        total_quiz_points: quizPoints?.total_quiz_points || 0,
        available_quiz_points: quizPoints?.available_quiz_points || 0,
        spent_quiz_points: quizPoints?.spent_quiz_points || 0,
        quiz_level: quizPoints?.quiz_level || 1,
        quiz_level_progress: quizPoints?.quiz_level_progress || 0,
        current_quiz_streak: quizPoints?.current_quiz_streak || 0,
        longest_quiz_streak: quizPoints?.longest_quiz_streak || 0,
        quizzes_completed: quizPoints?.quizzes_completed || 0,
        quizzes_passed: quizPoints?.quizzes_passed || 0,
        global_quiz_rank: quizRanking?.global_quiz_rank,
        weekly_quiz_rank: quizRanking?.weekly_quiz_rank,
        quiz_accuracy_percentage: quizRanking?.quiz_accuracy_percentage || 0
      },
      challenge_system: {
        total_challenge_points: challengePoints?.total_challenge_points || 0,
        lifetime_challenge_points: challengePoints?.lifetime_challenge_points || 0,
        challenges_completed: challengePoints?.challenges_completed || 0,
        challenges_submitted: challengePoints?.challenges_submitted || 0,
        current_challenge_streak: challengePoints?.current_challenge_streak || 0,
        longest_challenge_streak: challengePoints?.longest_challenge_streak || 0,
        current_badge_tier: challengePoints?.current_badge_tier || 'bronze',
        next_badge_tier: challengePoints?.next_badge_tier,
        points_to_next_tier: challengePoints?.points_to_next_tier || 0,
        environmental_impact_score: challengePoints?.environmental_impact_score || 0,
        global_challenge_rank: challengeRanking?.global_challenge_rank,
        environmental_impact_rank: challengeRanking?.environmental_impact_rank,
        challenge_completion_rate: challengeRanking?.challenge_completion_rate || 0
      },
      pets_collection: {
        total_pets: userPets.length,
        pets_by_rarity: this.groupPetsByRarity(userPets),
        featured_pet: userPets.find(pet => pet.is_featured),
        pets_summary: userPets.map(pet => ({
          nickname: pet.nickname,
          species: pet.pet.name,
          species_type: pet.pet.species_type,
          rarity: pet.pet.rarity,
          evolution_stage: pet.evolution_stage,
          level: pet.level,
          is_featured: pet.is_featured
        }))
      },
      badges_collection: {
        total_badges: userBadges.length,
        badges_by_tier: this.groupBadgesByTier(userBadges),
        badges_by_category: this.groupBadgesByCategory(userBadges),
        featured_badge: userBadges.find(badge => badge.is_featured),
        recent_badges: userBadges
          .sort((a, b) => new Date(b.unlocked_at).getTime() - new Date(a.unlocked_at).getTime())
          .slice(0, 5)
          .map(badge => ({
            name: badge.badge.name,
            tier: badge.badge.badge_tier,
            category: badge.badge.category,
            unlocked_at: badge.unlocked_at
          }))
      },
      recent_activity: {
        quiz_activities: recentQuizHistory.map(activity => ({
          type: 'quiz_points',
          points_change: activity.points_change,
          transaction_type: activity.transaction_type,
          description: activity.description,
          created_at: activity.created_at
        })),
        challenge_activities: recentChallengeHistory.map(activity => ({
          type: 'challenge_points',
          points_change: activity.points_change,
          transaction_type: activity.transaction_type,
          environmental_category: activity.environmental_category,
          description: activity.description,
          created_at: activity.created_at
        }))
      }
    };
  }

  private calculateGlobalRank(quizRank?: number | null, challengeRank?: number | null): number | null {
    if (!quizRank && !challengeRank) return null;
    if (!quizRank) return Number(challengeRank);
    if (!challengeRank) return quizRank;
    return Math.min(quizRank, challengeRank);
  }

  private calculateAccountLevel(totalScore: number): number {
    // Lógica simple para calcular nivel de cuenta basado en score total
    if (totalScore < 100) return 1;
    if (totalScore < 500) return 2;
    if (totalScore < 1000) return 3;
    if (totalScore < 2500) return 4;
    if (totalScore < 5000) return 5;
    return Math.min(10, Math.floor(totalScore / 1000) + 5);
  }

  private groupPetsByRarity(pets: any[]): any {
    return pets.reduce((acc, pet) => {
      const rarity = pet.pet.rarity;
      acc[rarity] = (acc[rarity] || 0) + 1;
      return acc;
    }, {});
  }

  private groupBadgesByTier(badges: any[]): any {
    return badges.reduce((acc, badge) => {
      const tier = badge.badge.badge_tier;
      acc[tier] = (acc[tier] || 0) + 1;
      return acc;
    }, {});
  }

  private groupBadgesByCategory(badges: any[]): any {
    return badges.reduce((acc, badge) => {
      const category = badge.badge.category || 'general';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
  }
}