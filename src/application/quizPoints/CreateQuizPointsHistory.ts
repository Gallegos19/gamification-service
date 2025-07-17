import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';
import { CreateQuizPointsHistoryDto } from '../../domain/dto/CreateQuizPointsHistoryDto';

export class CreateQuizPointsHistory {
  constructor(private quizPointsRepo: QuizPointsRepository) {}

  async execute(data: CreateQuizPointsHistoryDto) {
    return this.quizPointsRepo.createQuizPointsHistory(data);
  }
}
