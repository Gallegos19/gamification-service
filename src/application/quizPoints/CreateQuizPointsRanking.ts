import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';
import { CreateQuizPointsRankingDto } from '../../domain/dto/CreateQuizPointsRankingDto';

export class CreateQuizPointsRanking {
  constructor(private quizPointsRepo: QuizPointsRepository) {}

  async execute(data: CreateQuizPointsRankingDto) {
    return this.quizPointsRepo.createQuizPointsRanking(data);
  }
}
