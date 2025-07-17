import { PetEvolutionCostRepository } from '../../domain/repositories/PetEvolutionCostRepository';

export interface CreatePetEvolutionCostDTO {
  petId: string;
  stage: number;
  cost: number;
}

export class CreatePetEvolutionCost {
  constructor(private readonly repo: PetEvolutionCostRepository) {}

  async execute(dto: CreatePetEvolutionCostDTO) {
    return this.repo.createCost(dto.petId, dto.stage, dto.cost);
  }
}
