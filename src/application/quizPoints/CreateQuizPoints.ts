import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';
import { CreateQuizPointsDto } from '../../domain/dto/CreateQuizPointsDto';

export class CreateQuizPoints {
  constructor(private quizPointsRepo: QuizPointsRepository) {}

  async execute(data: CreateQuizPointsDto) {
    return this.quizPointsRepo.createQuizPoints(data);
  }
}
