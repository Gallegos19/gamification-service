export interface PetEvolutionCost {
  petId: string;
  stage: number;
  cost: number;
}

export interface PetEvolutionCostRepository {
  createCost(petId: string, stage: number, cost: number): Promise<PetEvolutionCost>;
  getCost(petId: string, stage: number): Promise<PetEvolutionCost | null>;
  listCostsByPet(petId: string): Promise<PetEvolutionCost[]>;
  updateCost(petId: string, stage: number, cost: number): Promise<PetEvolutionCost>;
  deleteCost(petId: string, stage: number): Promise<void>;
}
