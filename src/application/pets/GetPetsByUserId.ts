import { PetRepository } from '../../domain/repositories/PetRepository';
import { Pet } from '../../domain/entities/Pet';

export class GetPetsByUserId {
  constructor(private readonly petRepo: PetRepository) {}

  async execute(userId: string): Promise<Pet[]> {
    return this.petRepo.getByUserId(userId);
  }
}
