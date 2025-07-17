import { AwardQuizPointsTransaction } from '../entities/AwardQuizPointsTransaction';

export interface AwardQuizPointsInput {
  user_id: string;
  quiz_id: string;
  points_earned: number;
  quiz_score_percentage: number;
  bonus_reason?: string;
  multiplier?: number;
}

export interface AwardQuizPointsRepository {
  award(input: AwardQuizPointsInput): Promise<AwardQuizPointsTransaction>;
}
