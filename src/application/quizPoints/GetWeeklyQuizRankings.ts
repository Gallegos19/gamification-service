import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';

export class GetWeeklyQuizRankings {
  constructor(private quizPointsRepo: QuizPointsRepository) {}

  async execute() {
    return this.quizPointsRepo.getWeeklyRankings();
  }
}
