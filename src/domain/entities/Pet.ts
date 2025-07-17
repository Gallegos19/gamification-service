export class Pet {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly species_type: string | null,
    public readonly created_at: Date,
    public readonly updated_at: Date
  ) {}
}

