import { PetRepository } from '../../domain/repositories/PetRepository';

export class GetPetById {
  constructor(private petRepo: PetRepository) {}

  async execute(petId: string) {
    return this.petRepo.getPetById(petId);
  }
}
