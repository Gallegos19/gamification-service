import { PetEvolutionCostRepository } from '../../domain/repositories/PetEvolutionCostRepository';

export interface DeletePetEvolutionCostDTO {
  petId: string;
  stage: number;
}

export class DeletePetEvolutionCost {
  constructor(private readonly repo: PetEvolutionCostRepository) {}

  async execute(dto: DeletePetEvolutionCostDTO) {
    return this.repo.deleteCost(dto.petId, dto.stage);
  }
}
