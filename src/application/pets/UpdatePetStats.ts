import { injectable, inject } from 'tsyringe';
import { IUserPetsRepository } from '../../domain/repositories/IUserPetsRepository';
import { AppError } from '../../shared/errors/AppError';

type UpdatePetStatsRequest = {
  petId: string;
  userId: string;
  happinessLevel?: number;
  healthLevel?: number;
};

@injectable()
export class UpdatePetStatsUseCase {
  constructor(
    @inject('UserPetsRepository')
    private userPetsRepository: IUserPetsRepository
  ) {}

  async execute({ petId, userId, happinessLevel, healthLevel }: UpdatePetStatsRequest) {
    // Validate that at least one stat is being updated
    if (happinessLevel === undefined && healthLevel === undefined) {
      throw new AppError('At least one stat (happinessLevel or healthLevel) must be provided', 400);
    }

    // Get the pet
    const pet = await this.userPetsRepository.findByUserIdAndPetId(userId, petId);
    if (!pet) {
      throw new AppError('Pet not found', 404);
    }

    // Update stats with boundary checks
    const updates: Partial<typeof pet> = {
      updated_at: new Date(),
      last_interaction_at: new Date()
    };

    if (happinessLevel !== undefined) {
      updates.happiness_level = Math.max(10, Math.min(100, pet.happiness_level + happinessLevel));
    }

    if (healthLevel !== undefined) {
      updates.health_level = Math.max(10, Math.min(100, pet.health_level + healthLevel));
    }

    // Save updates
    const updatedPet = await this.userPetsRepository.update(petId, updates);
    
    return updatedPet;
  }
}
