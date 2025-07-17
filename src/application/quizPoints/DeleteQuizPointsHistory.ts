import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';

export class DeleteQuizPointsHistory {
  constructor(private quizPointsRepo: QuizPointsRepository) {}

  async execute(historyId: string) {
    return this.quizPointsRepo.deleteQuizPointsHistory(historyId);
  }
}
