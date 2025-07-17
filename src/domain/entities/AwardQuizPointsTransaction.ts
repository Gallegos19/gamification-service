export class AwardQuizPointsTransaction {
  constructor(
    public readonly success: boolean,
    public readonly transaction_id?: string,
    public readonly error?: string
  ) {}
}
