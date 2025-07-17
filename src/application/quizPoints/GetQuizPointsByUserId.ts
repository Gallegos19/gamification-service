import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';
import { QuizPoints } from '../../domain/entities/QuizPoints';

export class GetQuizPointsByUserId {
  private quizPointsRepo: QuizPointsRepository;

  constructor(quizPointsRepo: QuizPointsRepository) {
    this.quizPointsRepo = quizPointsRepo;
  }

  async execute(userId: string): Promise<QuizPoints | null> {
    return this.quizPointsRepo.getByUserId(userId);
  }
}
