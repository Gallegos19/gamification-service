import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';
import { UpdateQuizPointsHistoryDto } from '../../domain/dto/UpdateQuizPointsHistoryDto';
import { QuizPointsHistory } from '../../domain/entities/QuizPointsHistory';

export class UpdateQuizPointsHistory {
  constructor(private quizPointsRepo: QuizPointsRepository) {}

  async execute(historyId: string, data: UpdateQuizPointsHistoryDto) {
    return this.quizPointsRepo.updateQuizPointsHistory(historyId, data as Partial<QuizPointsHistory>);
  }
}
