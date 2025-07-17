import { PetEvolutionCostRepository } from '../../domain/repositories/PetEvolutionCostRepository';

export interface UpdatePetEvolutionCostDTO {
  petId: string;
  stage: number;
  cost: number;
}

export class UpdatePetEvolutionCost {
  constructor(private readonly repo: PetEvolutionCostRepository) {}

  async execute(dto: UpdatePetEvolutionCostDTO) {
    return this.repo.updateCost(dto.petId, dto.stage, dto.cost);
  }
}
