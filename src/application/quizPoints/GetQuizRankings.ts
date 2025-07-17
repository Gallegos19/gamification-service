import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';

export class GetQuizRankings {
  constructor(private quizPointsRepo: QuizPointsRepository) {}

  async execute() {
    return this.quizPointsRepo.getRankings();
  }
}
