import { RankingsRepository } from '../../domain/repositories/RankingsRepository';

export class GetCombinedRankings {
  constructor(private readonly rankingsRepository: RankingsRepository) {}

  async execute(limit: number = 50, offset: number = 0) {
    return await this.rankingsRepository.getCombinedRankings(limit, offset);
  }
}