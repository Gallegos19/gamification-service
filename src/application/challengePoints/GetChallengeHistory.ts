import { ChallengePointsRepository } from '../../domain/repositories/ChallengePointsRepository';

export class GetChallengeHistory {
  constructor(private readonly challengePointsRepository: ChallengePointsRepository) {}

  async execute(userId: string) {
    return await this.challengePointsRepository.getChallengeHistory(userId);
  }
}