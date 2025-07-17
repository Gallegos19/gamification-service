export interface CreateQuizPointsHistoryDto {
  user_id: string;
  points_change: number;
  transaction_type: string;
  description?: string;
  quiz_id?: string;
  quiz_score_percentage?: number;
  bonus_reason?: string;
  multiplier?: number;
  created_at?: Date;
}
