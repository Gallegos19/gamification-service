import { DashboardRepository } from '../../../domain/repositories/DashboardRepository';
import { Dashboard } from '../../../domain/entities/Dashboard';
import prisma from '../prismaClient';

export class DashboardPrismaRepository implements DashboardRepository {
  async getByUserId(userId: string): Promise<Dashboard | null> {
    // Obtener datos agregados del usuario
    const quiz = await prisma.user_quiz_points.findUnique({ where: { user_id: userId } });
    const challenge = await prisma.user_challenge_points.findUnique({ where: { user_id: userId } });
    const badges = await prisma.user_badges.findMany({ where: { user_id: userId }, include: { badge: true } });
    const pets = await prisma.user_pets.findMany({ where: { user_id: userId }, include: { pet: true } });

    if (!quiz && !challenge && badges.length === 0 && pets.length === 0) return null;

    // Ranking (ejemplo: posición por puntos de retos)
    let challenge_rank: number | null = null;
    if (challenge) {
      const all = await prisma.user_challenge_points.findMany({
        orderBy: { total_challenge_points: 'desc' },
        select: { user_id: true },
      });
      challenge_rank = all.findIndex((u: any) => u.user_id === userId) + 1;
    }

    return new Dashboard(
      userId,
      quiz?.total_quiz_points ?? 0,
      challenge?.total_challenge_points ?? 0,
      badges.length,
      pets.length,
      quiz?.quiz_level ?? 1,
      challenge_rank,
      badges.map((b: any) => b.badge.name),
      pets.map((p: any) => p.pet.name)
    );
  }
}
