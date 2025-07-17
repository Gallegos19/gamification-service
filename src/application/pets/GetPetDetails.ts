import { PetRepository } from '../../domain/repositories/PetRepository';

export class GetPetDetails {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(petId: string, userId?: string) {
    return await this.petRepository.getPetDetails(petId, userId);
  }
}