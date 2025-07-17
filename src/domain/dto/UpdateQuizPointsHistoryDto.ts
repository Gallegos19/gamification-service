export interface UpdateQuizPointsHistoryDto {
  points_change?: number;
  transaction_type?: string;
  description?: string;
  quiz_id?: string;
  quiz_score_percentage?: number;
  bonus_reason?: string;
  multiplier?: number;
}
