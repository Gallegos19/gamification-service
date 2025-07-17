import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';

export class DeleteQuizPoints {
  constructor(private quizPointsRepo: QuizPointsRepository) {}

  async execute(userId: string) {
    return this.quizPointsRepo.deleteQuizPoints(userId);
  }
}
