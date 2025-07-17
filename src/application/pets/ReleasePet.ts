import { PetRepository } from '../../domain/repositories/PetRepository';

export interface ReleasePetDTO {
  userId: string;
  petId: string;
}

export class ReleasePet {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(dto: ReleasePetDTO): Promise<void> {
    const { userId, petId } = dto;
    await this.petRepository.releasePet(userId, petId);
  }
}
