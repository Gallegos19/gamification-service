import { PetRepository } from '../../domain/repositories/PetRepository';

export class GetPetStore {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(userId?: string) {
    return await this.petRepository.getPetStore(userId);
  }
}