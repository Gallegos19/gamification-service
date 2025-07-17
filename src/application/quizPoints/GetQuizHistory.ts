import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';

export class GetQuizHistory {
  constructor(private quizPointsRepo: QuizPointsRepository) {}

  async execute(userId: string) {
    return this.quizPointsRepo.getHistoryByUserId(userId);
  }
}
