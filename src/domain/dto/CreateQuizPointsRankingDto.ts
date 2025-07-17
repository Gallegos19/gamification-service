export interface CreateQuizPointsRankingDto {
  user_id: string;
  total_points: number;
  rank: number;
  week?: number;
  age_group?: string;
}
