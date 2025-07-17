import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';

export class GetAgeGroupQuizRankings {
  constructor(private quizPointsRepo: QuizPointsRepository) {}

  async execute(ageGroup: string) {
    return this.quizPointsRepo.getAgeGroupRankings(ageGroup);
  }
}
