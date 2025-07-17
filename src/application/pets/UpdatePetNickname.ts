import { PetRepository } from '../../domain/repositories/PetRepository';

export interface UpdatePetNicknameDTO {
  userId: string;
  petId: string;
  nickname: string;
}

export class UpdatePetNickname {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(dto: UpdatePetNicknameDTO): Promise<void> {
    const { userId, petId, nickname } = dto;
    // Validación básica (puedes expandir con class-validator si lo deseas)
    if (!nickname || nickname.length < 2) {
      throw new Error('El apodo debe tener al menos 2 caracteres');
    }
    await this.petRepository.updatePetNickname(userId, petId, nickname);
  }
}
