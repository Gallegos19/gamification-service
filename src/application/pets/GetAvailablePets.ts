import { PetRepository } from '../../domain/repositories/PetRepository';

export class GetAvailablePets {
  constructor(private readonly petRepository: PetRepository) {}

  async execute() {
    return await this.petRepository.getAvailablePets();
  }
}