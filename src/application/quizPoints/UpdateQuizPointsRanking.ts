import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';
import { UpdateQuizPointsRankingDto } from '../../domain/dto/UpdateQuizPointsRankingDto';
import { QuizPointsRanking } from '../../domain/entities/QuizPointsRanking';

export class UpdateQuizPointsRanking {
  constructor(private quizPointsRepo: QuizPointsRepository) {}

  async execute(userId: string, data: UpdateQuizPointsRankingDto) {
    return this.quizPointsRepo.updateQuizPointsRanking(userId, data as Partial<QuizPointsRanking>);
  }
}
