import {
  AwardQuizPointsRepository,
  AwardQuizPointsInput,
} from "../../../domain/repositories/AwardQuizPointsRepository";
import { AwardQuizPointsTransaction } from "../../../domain/entities/AwardQuizPointsTransaction";
import prisma from "../prismaClient";
import { v4 as uuidv4 } from "uuid";

export class AwardQuizPointsPrismaRepository
  implements AwardQuizPointsRepository
{
  async award(
    input: AwardQuizPointsInput
  ): Promise<AwardQuizPointsTransaction> {
    try {
      const transactionId = uuidv4();

      // Verificar si el usuario ya tiene un registro de puntos de quiz
      const existingPoints = await prisma.user_quiz_points.findUnique({
        where: { user_id: input.user_id },
      });

      // Actualizar o crear puntos de quiz
      if (existingPoints) {
        console.log(
          `Actualizando registro de puntos de quiz para el usuario ${input.user_id}`
        );
        await prisma.user_quiz_points.update({
          where: { user_id: input.user_id },
          data: {
            total_quiz_points: { increment: input.points_earned },
            available_quiz_points: { increment: input.points_earned },
            quizzes_completed: { increment: 1 },
            quizzes_passed:
              input.quiz_score_percentage >= 60 ? { increment: 1 } : undefined,
            last_quiz_point_earned_at: new Date(),
            updated_at: new Date(),
          },
        });
      } else {
        console.log(
          `Creando nuevo registro de puntos de quiz para el usuario ${input.user_id}`
        );
        await prisma.user_quiz_points.create({
          data: {
            id: uuidv4(),
            user_id: input.user_id,
            total_quiz_points: input.points_earned,
            available_quiz_points: input.points_earned,
            spent_quiz_points: 0,
            quizzes_completed: 1,
            quizzes_passed: input.quiz_score_percentage >= 60 ? 1 : 0,
            current_quiz_streak: 1,
            longest_quiz_streak: 1,
            quiz_level: 1,
            quiz_level_progress: 0,
            last_quiz_point_earned_at: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
      }

      // Crear el registro de historial sin quiz_id
      await prisma.quiz_points_history.create({
        data: {
          id: transactionId,
          user_id: input.user_id,
          points_change: input.points_earned,
          transaction_type: "award",
          quiz_score_percentage: input.quiz_score_percentage,
          description: input.quiz_id
            ? `Quiz completado: ${input.quiz_id}`
            : "Quiz completado",
          bonus_reason: input.bonus_reason,
          multiplier: input.multiplier ?? 1.0,
          created_at: new Date(),
        },
      });

      return new AwardQuizPointsTransaction(true, transactionId);
    } catch (error) {
      console.error("Error al otorgar puntos de quiz:", error);
      return new AwardQuizPointsTransaction(
        false,
        undefined,
        (error as Error).message
      );
    }
  }
}
