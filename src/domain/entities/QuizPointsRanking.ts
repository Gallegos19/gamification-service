export class QuizPointsRanking {
  constructor(
    public readonly user_id: string,
    public readonly total_quiz_score: number,
    public readonly global_quiz_rank: number | null = null,
    public readonly weekly_quiz_rank: number | null = null,
    public readonly age_group_quiz_rank: number | null = null,
    public readonly weekly_quiz_score: number = 0,
    public readonly monthly_quiz_score: number = 0,
    public readonly quiz_accuracy_percentage: number = 0,
    public readonly total_quizzes_completed: number = 0
  ) {}
}
