import { PrismaClient, Prisma } from '@prisma/client';
// import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { IUserPetsRepository } from '../../../domain/repositories/IUserPetsRepository';
import { user_pets as UserPets } from '@prisma/client';

@Injectable()
export class UserPetsPrismaRepository implements IUserPetsRepository {
  constructor(private prisma: PrismaClient) {}

  async findByUserIdAndPetId(userId: string, petId: string): Promise<UserPets | null> {
    return this.prisma.user_pets.findFirst({
      where: {
        user_id: userId,
        id: petId,
        deleted_at: null
      }
    });
  }

  async update(petId: string, data: Omit<Partial<UserPets>, 'id' | 'user_id' | 'pet_id' | 'created_at'>): Promise<UserPets> {
    const updateData: any = {
      ...data,
      updated_at: new Date()
    };
    if ('custom_attributes' in updateData && updateData.custom_attributes === null) {
      updateData.custom_attributes = Prisma.JsonNull;
    }
    return this.prisma.user_pets.update({
      where: { id: petId },
      data: updateData,
    });
  }

  async findAllActive(): Promise<UserPets[]> {
    return this.prisma.user_pets.findMany({
      where: {
        is_active: true,
        deleted_at: null
      }
    });
  }
}
