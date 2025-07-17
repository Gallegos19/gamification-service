import { PetRepository } from '../../domain/repositories/PetRepository';

export interface EvolvePetDTO {
  userId: string;
  petId: string;
}

export class EvolvePet {
  constructor(private readonly repo: PetRepository) {}

  async execute(dto: EvolvePetDTO): Promise<void> {
    await this.repo.evolvePetWithPoints(dto.userId, dto.petId);
  }
}
