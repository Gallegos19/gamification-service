import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';

export class DeleteQuizPointsRanking {
  constructor(private quizPointsRepo: QuizPointsRepository) {}

  async execute(userId: string) {
    return this.quizPointsRepo.deleteQuizPointsRanking(userId);
  }
}
