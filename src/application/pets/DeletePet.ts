import { PetRepository } from '../../domain/repositories/PetRepository';

export class DeletePet {
  constructor(private petRepo: PetRepository) {}

  async execute(petId: string) {
    return this.petRepo.deletePet(petId);
  }
}
