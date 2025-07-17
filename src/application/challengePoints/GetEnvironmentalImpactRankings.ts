import { ChallengePointsRepository } from '../../domain/repositories/ChallengePointsRepository';

export class GetEnvironmentalImpactRankings {
  constructor(private readonly challengePointsRepository: ChallengePointsRepository) {}

  async execute() {
    return await this.challengePointsRepository.getEnvironmentalImpactRankings();
  }
}