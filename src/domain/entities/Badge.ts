export class Badge {
  constructor(
    public readonly id: string, // id de user_badges
    public readonly user_id: string,
    public readonly badge_id: string,
    public readonly unlocked_at: Date,
    public readonly is_featured: boolean,
    public readonly challenge_points_when_unlocked: number | null,
    public readonly badge: {
      name: string;
      description: string | null;
      icon_url: string | null;
      category: string | null;
      rarity: string;
      badge_tier: string;
      unlock_criteria: any;
    }
  ) {}
}
