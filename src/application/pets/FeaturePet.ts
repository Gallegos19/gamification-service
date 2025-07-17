export interface FeaturePetDTO {
  userId: string;
  petId: string;
}

export class FeaturePet {
  constructor(private readonly repo: import('../../domain/repositories/PetRepository').PetRepository) {}

  async execute(dto: FeaturePetDTO): Promise<void> {
    await this.repo.featurePet(dto.userId, dto.petId);
  }
}
