import { injectable, inject } from 'tsyringe';
import { IUserPetsRepository } from '../../domain/repositories/IUserPetsRepository';
import { AppError } from '../../shared/errors/AppError';

@injectable()
export class PetMaintenanceService {
  constructor(
    @inject('UserPetsRepository')
    private userPetsRepository: IUserPetsRepository
  ) {}

  async decreaseAllPetsStats(amount: { happiness: number; health: number }) {
    try {
      // Get all active pets
      const allPets = await this.userPetsRepository.findAllActive();
      
      // Update each pet's stats
      const updatePromises = allPets.map(pet => {
        const updates: any = {
          happiness_level: Math.max(10, pet.happiness_level - amount.happiness),
          health_level: Math.max(10, pet.health_level - amount.health),
          updated_at: new Date()
        };
        
        return this.userPetsRepository.update(pet.id, updates);
      });

      await Promise.all(updatePromises);
      return { success: true, updatedCount: allPets.length };
    } catch (error) {
      console.error('Error in decreaseAllPetsStats:', error);
      throw new AppError('Failed to update all pets stats', 500);
    }
  }
}
