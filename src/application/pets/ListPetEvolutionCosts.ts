import { PetEvolutionCostRepository } from '../../domain/repositories/PetEvolutionCostRepository';

export class ListPetEvolutionCosts {
  constructor(private readonly repo: PetEvolutionCostRepository) {}

  async execute(petId: string) {
    return this.repo.listCostsByPet(petId);
  }
}
