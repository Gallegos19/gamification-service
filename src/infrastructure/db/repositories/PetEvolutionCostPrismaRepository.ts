import { PetEvolutionCostRepository, PetEvolutionCost } from '../../../domain/repositories/PetEvolutionCostRepository';
import prisma from '../prismaClient';

export class PetEvolutionCostPrismaRepository implements PetEvolutionCostRepository {
  async createCost(petId: string, stage: number, cost: number): Promise<PetEvolutionCost> {
    const created = await prisma.pet_evolution_costs.create({
      data: { pet_id: petId, stage, cost },
    });
    return { petId: created.pet_id, stage: created.stage, cost: created.cost };
  }

  async getCost(petId: string, stage: number): Promise<PetEvolutionCost | null> {
    const found = await prisma.pet_evolution_costs.findUnique({
      where: { pet_id_stage: { pet_id: petId, stage } },
    });
    if (!found) return null;
    return { petId: found.pet_id, stage: found.stage, cost: found.cost };
  }

  async listCostsByPet(petId: string): Promise<PetEvolutionCost[]> {
    const list = await prisma.pet_evolution_costs.findMany({ where: { pet_id: petId } });
    return list.map((c: any) => ({ petId: c.pet_id, stage: c.stage, cost: c.cost }));
  }

  async updateCost(petId: string, stage: number, cost: number): Promise<PetEvolutionCost> {
    const updated = await prisma.pet_evolution_costs.update({
      where: { pet_id_stage: { pet_id: petId, stage } },
      data: { cost },
    });
    return { petId: updated.pet_id, stage: updated.stage, cost: updated.cost };
  }

  async deleteCost(petId: string, stage: number): Promise<void> {
    await prisma.pet_evolution_costs.delete({
      where: { pet_id_stage: { pet_id: petId, stage } },
    });
  }
}
