import { PetRepository } from '../../domain/repositories/PetRepository';

export interface SelectPetStageDTO {
  userId: string;
  petId: string;
  stage: number;
}

export class SelectPetStage {
  constructor(private readonly repo: PetRepository) {}

  async execute(dto: SelectPetStageDTO): Promise<void> {
    await this.repo.selectPetStage(dto.userId, dto.petId, dto.stage);
  }
}
