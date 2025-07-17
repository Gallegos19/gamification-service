import { PetRepository } from '../../domain/repositories/PetRepository';
import { Pet } from '../../domain/entities/Pet';

export interface GetFeaturedPetDTO {
  userId: string;
}

export class GetFeaturedPet {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(dto: GetFeaturedPetDTO): Promise<Pet | null> {
    return this.petRepository.getFeaturedPet(dto.userId);
  }
}
