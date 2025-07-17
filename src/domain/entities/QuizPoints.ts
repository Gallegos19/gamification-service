export class QuizPoints {
  constructor(
    public readonly user_id: string,
    public readonly total_quiz_points: number,
    public readonly available_quiz_points: number,
    public readonly spent_quiz_points: number,
    public readonly quiz_level: number,
    public readonly quiz_level_progress: number,
    public readonly current_quiz_streak: number,
    public readonly longest_quiz_streak: number,
    public readonly quizzes_completed: number,
    public readonly quizzes_passed: number,
  ) {}
}
