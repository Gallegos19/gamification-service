export class ChallengePoints {
  constructor(
    public readonly user_id: string,
    public readonly total_challenge_points: number,
    public readonly lifetime_challenge_points: number,
    public readonly challenges_completed: number,
    public readonly challenges_submitted: number,
    public readonly created_at: Date,
    public readonly updated_at: Date,
    public readonly last_challenge_point_earned_at: Date | null
  ) {}
}
