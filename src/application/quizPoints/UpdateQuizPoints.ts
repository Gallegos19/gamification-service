import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';
import { UpdateQuizPointsDto } from '../../domain/dto/UpdateQuizPointsDto';

export class UpdateQuizPoints {
  constructor(private quizPointsRepo: QuizPointsRepository) {}

  async execute(userId: string, data: UpdateQuizPointsDto) {
    return this.quizPointsRepo.updateQuizPoints(userId, data);
  }
}
