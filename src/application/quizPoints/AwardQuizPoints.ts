import { AwardQuizPointsRepository, AwardQuizPointsInput } from '../../domain/repositories/AwardQuizPointsRepository';
import { AwardQuizPointsTransaction } from '../../domain/entities/AwardQuizPointsTransaction';

export class AwardQuizPoints {
  private awardQuizPointsRepo: AwardQuizPointsRepository;

  constructor(awardQuizPointsRepo: AwardQuizPointsRepository) {
    this.awardQuizPointsRepo = awardQuizPointsRepo;
  }

  async execute(input: AwardQuizPointsInput): Promise<AwardQuizPointsTransaction> {
    return this.awardQuizPointsRepo.award(input);
  }
}
