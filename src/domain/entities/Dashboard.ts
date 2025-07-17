export class Dashboard {
  constructor(
    public readonly user_id: string,
    public readonly total_quiz_points: number,
    public readonly total_challenge_points: number,
    public readonly badges_count: number,
    public readonly pets_count: number,
    public readonly quiz_level: number,
    public readonly challenge_rank: number | null,
    public readonly badge_names: string[],
    public readonly pet_names: string[],
  ) {}
}
