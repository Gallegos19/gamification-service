export interface UpdateQuizPointsDto {
  total_quiz_points?: number;
  available_quiz_points?: number;
  spent_quiz_points?: number;
  quiz_level?: number;
  quiz_level_progress?: number;
  current_quiz_streak?: number;
  longest_quiz_streak?: number;
  quizzes_completed?: number;
  quizzes_passed?: number;
}
