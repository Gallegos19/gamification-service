import { PetRepository } from '../../domain/repositories/PetRepository';
import { CreatePetDto } from '../../domain/dto/CreatePetDto';

export class CreatePet {
  constructor(private petRepo: PetRepository) {}

  async execute(data: CreatePetDto) {
    return this.petRepo.createPet(data);
  }
}
