import { QuizPoints } from "../../../domain/entities/QuizPoints";
import { QuizPointsRepository } from "../../../domain/repositories/QuizPointsRepository";
import { QuizPointsHistory } from "../../../domain/entities/QuizPointsHistory";
import { QuizPointsRanking } from "../../../domain/entities/QuizPointsRanking";
import prisma from "../prismaClient";

export class QuizPointsPrismaRepository implements QuizPointsRepository {
  async createQuizPoints(data: Partial<QuizPoints>): Promise<QuizPoints> {
    const created = await prisma.user_quiz_points.create({
      data: {
        user_id: data.user_id!,
        total_quiz_points: data.total_quiz_points ?? 0,
        available_quiz_points: data.available_quiz_points ?? 0,
        spent_quiz_points: data.spent_quiz_points ?? 0,
        quiz_level: data.quiz_level ?? 1,
        quiz_level_progress: data.quiz_level_progress ?? 0,
        current_quiz_streak: data.current_quiz_streak ?? 0,
        longest_quiz_streak: data.longest_quiz_streak ?? 0,
        quizzes_completed: data.quizzes_completed ?? 0,
        quizzes_passed: data.quizzes_passed ?? 0,
      },
    });
    return new QuizPoints(
      created.user_id,
      created.total_quiz_points,
      created.available_quiz_points,
      created.spent_quiz_points,
      created.quiz_level,
      Number(created.quiz_level_progress),
      created.current_quiz_streak,
      created.longest_quiz_streak,
      created.quizzes_completed,
      created.quizzes_passed
    );
  }

  async updateQuizPoints(
    userId: string,
    data: Partial<QuizPoints>
  ): Promise<QuizPoints> {
    const updated = await prisma.user_quiz_points.update({
      where: { user_id: userId },
      data: {
        ...data,
      },
    });
    return new QuizPoints(
      updated.user_id,
      updated.total_quiz_points,
      updated.available_quiz_points,
      updated.spent_quiz_points,
      updated.quiz_level,
      Number(updated.quiz_level_progress),
      updated.current_quiz_streak,
      updated.longest_quiz_streak,
      updated.quizzes_completed,
      updated.quizzes_passed
    );
  }

  async deleteQuizPoints(userId: string): Promise<void> {
    await prisma.user_quiz_points.delete({
      where: { user_id: userId },
    });
  }

  async createQuizPointsHistory(
    data: Partial<QuizPointsHistory>
  ): Promise<QuizPointsHistory> {
    const created = await prisma.quiz_points_history.create({
      data: {
        user_id: data.user_id!,
        points_change: data.points_change ?? 0,
        transaction_type: data.transaction_type ?? "manual",
        description: data.description ?? "",
        quiz_id: data.quiz_id ?? null,
        quiz_score_percentage: data.quiz_score_percentage ?? null,
        bonus_reason: data.bonus_reason ?? null,
        multiplier: data.multiplier ?? 1.0,
      },
    });
    return new QuizPointsHistory(
      created.id,
      created.user_id,
      created.points_change,
      created.transaction_type,
      created.created_at
    );
  }

  async updateQuizPointsHistory(
    historyId: string,
    data: Partial<QuizPointsHistory>
  ): Promise<QuizPointsHistory> {
    const updated = await prisma.quiz_points_history.update({
      where: { id: historyId },
      data: {
        points_change: data.points_change,
        transaction_type: data.transaction_type,
        description: data.description,
      },
    });
    return new QuizPointsHistory(
      updated.id,
      updated.user_id,
      updated.points_change,
      updated.transaction_type,
      updated.created_at
    );
  }

  async deleteQuizPointsHistory(historyId: string): Promise<void> {
    await prisma.quiz_points_history.delete({
      where: { id: historyId },
    });
  }

  async createQuizPointsRanking(
    data: Partial<QuizPointsRanking>
  ): Promise<QuizPointsRanking> {
    const created = await prisma.quiz_points_rankings.create({
      data: {
        user_id: data.user_id!,
        total_quiz_score: data.total_quiz_score ?? 0,
        global_quiz_rank: data.global_quiz_rank ?? null,
        weekly_quiz_rank: data.weekly_quiz_rank ?? null,
        age_group_quiz_rank: data.age_group_quiz_rank ?? null,
        weekly_quiz_score: data.weekly_quiz_score ?? 0,
        monthly_quiz_score: data.monthly_quiz_score ?? 0,
        quiz_accuracy_percentage: data.quiz_accuracy_percentage ?? 0,
        total_quizzes_completed: data.total_quizzes_completed ?? 0,
      },
    });
    return new QuizPointsRanking(
      created.user_id,
      created.total_quiz_score,
      created.global_quiz_rank,
      created.weekly_quiz_rank,
      created.age_group_quiz_rank
    );
  }

  async updateQuizPointsRanking(
    userId: string,
    data: Partial<QuizPointsRanking>
  ): Promise<QuizPointsRanking> {
    const updated = await prisma.quiz_points_rankings.update({
      where: { user_id: userId },
      data: {
        total_quiz_score: data.total_quiz_score,
        global_quiz_rank: data.global_quiz_rank,
        weekly_quiz_rank: data.weekly_quiz_rank,
        age_group_quiz_rank: data.age_group_quiz_rank,
        weekly_quiz_score: data.weekly_quiz_score,
        monthly_quiz_score: data.monthly_quiz_score,
        quiz_accuracy_percentage: data.quiz_accuracy_percentage,
        total_quizzes_completed: data.total_quizzes_completed,
      },
    });
    return new QuizPointsRanking(
      updated.user_id,
      updated.total_quiz_score,
      updated.global_quiz_rank,
      updated.weekly_quiz_rank,
      updated.age_group_quiz_rank
    );
  }

  async deleteQuizPointsRanking(userId: string): Promise<void> {
    await prisma.quiz_points_rankings.delete({
      where: { user_id: userId },
    });
  }

  async getByUserId(userId: string): Promise<QuizPoints | null> {
    // Validar que userId sea un UUID válido antes de hacer la consulta
    if (!userId || typeof userId !== "string") {
      console.log("userId es null, undefined o no es string:", userId);
      return null;
    }

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(userId)) {
      console.log("UUID inválido en repositorio:", userId);
      return null;
    }

    try {
      const data = await prisma.user_quiz_points.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          total_quiz_points: true,
          available_quiz_points: true,
          spent_quiz_points: true,
          quiz_level: true,
          quiz_level_progress: true,
          current_quiz_streak: true,
          longest_quiz_streak: true,
          quizzes_completed: true,
          quizzes_passed: true,
        },
      });
      if (!data) return null;
      return new QuizPoints(
        data.user_id,
        data.total_quiz_points,
        data.available_quiz_points,
        data.spent_quiz_points,
        data.quiz_level,
        Number(data.quiz_level_progress),
        data.current_quiz_streak,
        data.longest_quiz_streak,
        data.quizzes_completed,
        data.quizzes_passed
      );
    } catch (error) {
      console.error("Error en getByUserId:", error);
      return null;
    }
  }

  async getHistoryByUserId(userId: string): Promise<QuizPointsHistory[]> {
    const history = await prisma.quiz_points_history.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    });
    return history.map(
      (h: any) =>
        new QuizPointsHistory(
          h.id,
          h.user_id,
          h.points_change,
          h.transaction_type,
          h.created_at
        )
    );
  }

  async getRankings(): Promise<QuizPointsRanking[]> {
    try {
      console.log("Obteniendo rankings de quiz");
      const rankings = await prisma.quiz_points_rankings.findMany({
        orderBy: { global_quiz_rank: "asc" },
      });

      console.log(`Se encontraron ${rankings.length} rankings`);

      return rankings.map(
        (r: any) =>
          new QuizPointsRanking(
            r.user_id,
            r.total_quiz_score,
            r.global_quiz_rank,
            r.weekly_quiz_rank,
            r.age_group_quiz_rank
          )
      );
    } catch (error) {
      console.error("Error al obtener rankings:", error);
      // Devolver un array vacío en caso de error
      return [];
    }
  }

  async getWeeklyRankings(): Promise<QuizPointsRanking[]> {
    try {
      console.log("Obteniendo rankings semanales de quiz");
      const rankings = await prisma.quiz_points_rankings.findMany({
        where: { weekly_quiz_rank: { not: null } },
        orderBy: { weekly_quiz_rank: "asc" },
      });

      console.log(`Se encontraron ${rankings.length} rankings semanales`);

      return rankings.map(
        (r: any) =>
          new QuizPointsRanking(
            r.user_id,
            r.total_quiz_score,
            r.global_quiz_rank,
            r.weekly_quiz_rank,
            r.age_group_quiz_rank
          )
      );
    } catch (error) {
      console.error("Error al obtener rankings semanales:", error);
      return [];
    }
  }

  async getAgeGroupRankings(ageGroup: string): Promise<QuizPointsRanking[]> {
    try {
      console.log(`Obteniendo rankings por grupo de edad: ${ageGroup}`);
      const rankings = await prisma.quiz_points_rankings.findMany({
        where: {
          age_group_quiz_rank: { not: null },
        },
        orderBy: { age_group_quiz_rank: "asc" },
      });

      console.log(
        `Se encontraron ${rankings.length} rankings por grupo de edad`
      );

      return rankings.map(
        (r: any) =>
          new QuizPointsRanking(
            r.user_id,
            r.total_quiz_score,
            r.global_quiz_rank,
            r.weekly_quiz_rank,
            r.age_group_quiz_rank
          )
      );
    } catch (error) {
      console.error("Error al obtener rankings por grupo de edad:", error);
      return [];
    }
  }
}
