import { ChallengePointsRepository } from '../../../domain/repositories/ChallengePointsRepository';
import { ChallengePoints } from '../../../domain/entities/ChallengePoints';
import prisma from '../prismaClient';

export class ChallengePointsPrismaRepository implements ChallengePointsRepository {
  async getByUserId(userId: string): Promise<ChallengePoints | null> {
    const data = await prisma.user_challenge_points.findUnique({
      where: { user_id: userId },
    });
    if (!data) return null;
    return new ChallengePoints(
      data.user_id,
      data.total_challenge_points,
      data.lifetime_challenge_points,
      data.challenges_completed,
      data.challenges_submitted,
      data.created_at,
      data.updated_at,
      data.last_challenge_point_earned_at
    );
  }

  async awardPoints(
    userId: string, 
    points: number, 
    challengeId?: string,
    submissionId?: string,
    validationScore?: number,
    environmentalCategory?: string,
    bonusReason?: string,
    multiplier?: number
  ): Promise<void> {
    // Sumar puntos de reto, crear registro si no existe
    const existing = await prisma.user_challenge_points.findUnique({ where: { user_id: userId } });
    if (existing) {
      await prisma.user_challenge_points.update({
        where: { user_id: userId },
        data: { 
          total_challenge_points: { increment: points },
          lifetime_challenge_points: { increment: points },
          last_challenge_point_earned_at: new Date(),
          updated_at: new Date()
        },
      });
    } else {
      await prisma.user_challenge_points.create({
        data: {
          user_id: userId,
          total_challenge_points: points,
          lifetime_challenge_points: points,
          challenges_completed: 0,
          challenges_submitted: 0,
          created_at: new Date(),
          updated_at: new Date(),
          last_challenge_point_earned_at: new Date(),
        },
      });
    }

    // Crear registro en historial
    await prisma.challenge_points_history.create({
      data: {
        user_id: userId,
        points_change: points,
        transaction_type: 'earned',
        challenge_id: challengeId,
        submission_id: submissionId,
        validation_score: validationScore,
        environmental_category: environmentalCategory,
        bonus_reason: bonusReason,
        multiplier: multiplier || 1.0,
        description: challengeId ? `Points earned from challenge ${challengeId}` : 'Challenge points awarded',
        created_at: new Date()
      }
    });
  }

  async getChallengeHistory(userId: string): Promise<any[]> {
    const history = await prisma.challenge_points_history.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      take: 50 // Limitar a últimos 50 registros
    });

    return history.map(record => ({
      id: record.id,
      user_id: record.user_id,
      points_change: record.points_change,
      transaction_type: record.transaction_type,
      challenge_id: record.challenge_id,
      submission_id: record.submission_id,
      validation_score: record.validation_score,
      description: record.description,
      multiplier: record.multiplier,
      bonus_reason: record.bonus_reason,
      environmental_category: record.environmental_category,
      created_at: record.created_at
    }));
  }

  async getChallengeRankings(): Promise<any[]> {
    const rankings = await prisma.challenge_points_rankings.findMany({
      orderBy: { total_challenge_score: 'desc' },
      take: 100 // Top 100
    });

    return rankings.map((ranking, index) => ({
      rank: index + 1,
      user_id: ranking.user_id,
      total_challenge_score: ranking.total_challenge_score,
      weekly_challenge_score: ranking.weekly_challenge_score,
      monthly_challenge_score: ranking.monthly_challenge_score,
      environmental_impact_score: ranking.environmental_impact_score,
      challenge_completion_rate: ranking.challenge_completion_rate,
      total_challenges_completed: ranking.total_challenges_completed,
      avg_validation_score: ranking.avg_validation_score,
      last_rank_update: ranking.last_rank_update
    }));
  }

  async getEnvironmentalImpactRankings(): Promise<any[]> {
    const rankings = await prisma.challenge_points_rankings.findMany({
      orderBy: { environmental_impact_score: 'desc' },
      take: 100 // Top 100
    });

    return rankings.map((ranking, index) => ({
      rank: index + 1,
      user_id: ranking.user_id,
      environmental_impact_score: ranking.environmental_impact_score,
      total_challenge_score: ranking.total_challenge_score,
      total_challenges_completed: ranking.total_challenges_completed,
      challenge_completion_rate: ranking.challenge_completion_rate,
      avg_validation_score: ranking.avg_validation_score,
      last_rank_update: ranking.last_rank_update
    }));
  }
}
