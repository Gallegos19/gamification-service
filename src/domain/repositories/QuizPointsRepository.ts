import { QuizPoints } from '../entities/QuizPoints';
import { QuizPointsHistory } from '../entities/QuizPointsHistory';
import { QuizPointsRanking } from '../entities/QuizPointsRanking';

export interface QuizPointsRepository {
  // user_quiz_points
  createQuizPoints(data: Partial<QuizPoints>): Promise<QuizPoints>;
  updateQuizPoints(userId: string, data: Partial<QuizPoints>): Promise<QuizPoints>;
  deleteQuizPoints(userId: string): Promise<void>;
  getByUserId(userId: string): Promise<QuizPoints | null>;

  // quiz_points_history
  createQuizPointsHistory(data: Partial<QuizPointsHistory>): Promise<QuizPointsHistory>;
  updateQuizPointsHistory(historyId: string, data: Partial<QuizPointsHistory>): Promise<QuizPointsHistory>;
  deleteQuizPointsHistory(historyId: string): Promise<void>;
  getHistoryByUserId(userId: string): Promise<QuizPointsHistory[]>;

  // quiz_points_rankings
  createQuizPointsRanking(data: Partial<QuizPointsRanking>): Promise<QuizPointsRanking>;
  updateQuizPointsRanking(userId: string, data: Partial<QuizPointsRanking>): Promise<QuizPointsRanking>;
  deleteQuizPointsRanking(userId: string): Promise<void>;
  getRankings(): Promise<QuizPointsRanking[]>;
  getWeeklyRankings(): Promise<QuizPointsRanking[]>;
  getAgeGroupRankings(ageGroup: string): Promise<QuizPointsRanking[]>;
}

