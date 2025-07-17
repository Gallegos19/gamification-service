import { PetRepository } from '../../domain/repositories/PetRepository';
import { UpdatePetDto } from '../../domain/dto/UpdatePetDto';

export class UpdatePet {
  constructor(private petRepo: PetRepository) {}

  async execute(petId: string, data: UpdatePetDto) {
    return this.petRepo.updatePet(petId, data);
  }
}
