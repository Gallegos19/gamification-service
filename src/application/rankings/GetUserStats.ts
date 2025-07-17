import { RankingsRepository } from '../../domain/repositories/RankingsRepository';

export class GetUserStats {
  constructor(private readonly rankingsRepository: RankingsRepository) {}

  async execute(userId: string) {
    return await this.rankingsRepository.getUserStats(userId);
  }
}