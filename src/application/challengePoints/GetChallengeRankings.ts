import { ChallengePointsRepository } from '../../domain/repositories/ChallengePointsRepository';

export class GetChallengeRankings {
  constructor(private readonly challengePointsRepository: ChallengePointsRepository) {}

  async execute() {
    return await this.challengePointsRepository.getChallengeRankings();
  }
}