import { Pet } from '../entities/Pet';

export interface PetRepository {
  // CRUD especie base de mascota
  createPet(data: { name: string; species_type: string }): Promise<Pet>;
  getPetById(petId: string): Promise<Pet | null>;
  updatePet(petId: string, data: { name?: string; species_type?: string }): Promise<Pet>;
  deletePet(petId: string): Promise<void>;

  // Relación usuario-mascota
  getByUserId(userId: string): Promise<Pet[]>;
  adoptPetWithPoints(userId: string, petId: string, nickname?: string): Promise<void>;
  featurePet(userId: string, petId: string): Promise<void>;
  updatePetNickname(userId: string, petId: string, nickname: string): Promise<void>;
  releasePet(userId: string, petId: string): Promise<void>;
  getFeaturedPet(userId: string): Promise<Pet | null>;

  evolvePetWithPoints(userId: string, petId: string): Promise<void>;
  selectPetStage(userId: string, petId: string, stage: number): Promise<void>;

  // Store methods
  getAvailablePets(): Promise<any[]>;
  getPetStore(userId?: string): Promise<any>;
  getPetDetails(petId: string, userId?: string): Promise<any>;
}
