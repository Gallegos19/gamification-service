import { ChallengePointsRepository } from '../../domain/repositories/ChallengePointsRepository';
import { ChallengePoints } from '../../domain/entities/ChallengePoints';

export class GetChallengePointsByUserId {
  constructor(private readonly repo: ChallengePointsRepository) {}

  async execute(userId: string): Promise<ChallengePoints | null> {
    return this.repo.getByUserId(userId);
  }
}
