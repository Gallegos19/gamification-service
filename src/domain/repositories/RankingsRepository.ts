export interface RankingsRepository {
  getCombinedRankings(limit: number, offset: number): Promise<any[]>;
  getUserStats(userId: string): Promise<any>;
}