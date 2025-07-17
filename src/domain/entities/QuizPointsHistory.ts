export class QuizPointsHistory {
  constructor(
    public id: string,
    public user_id: string,
    public points_change: number,
    public transaction_type: string,
    public created_at: Date,
    public description?: string,
    public quiz_id?: string,
    public quiz_score_percentage?: number,
    public bonus_reason?: string,
    public multiplier?: number
  ) {}
}
