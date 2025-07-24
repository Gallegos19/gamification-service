import { user_pets as UserPets } from '@prisma/client';

export interface IUserPetsRepository {
  findByUserIdAndPetId(userId: string, petId: string): Promise<UserPets | null>;
  update(petId: string, data: Partial<UserPets>): Promise<UserPets>;
  findAllActive(): Promise<UserPets[]>;
}
