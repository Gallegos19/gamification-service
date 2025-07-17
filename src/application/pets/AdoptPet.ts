import { PetRepository } from '../../domain/repositories/PetRepository';

export interface AdoptPetDTO {
  userId: string;
  petId: string;
  nickname?: string;
}

export class AdoptPet {
  constructor(private readonly repo: PetRepository) {}

  async execute(dto: AdoptPetDTO): Promise<void> {
    await this.repo.adoptPetWithPoints(dto.userId, dto.petId, dto.nickname);
  }
}
