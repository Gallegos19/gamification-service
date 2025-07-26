import { PetRepository } from "../../../domain/repositories/PetRepository";
import { Pet } from "../../../domain/entities/Pet";
import prisma from "../prismaClient";
import crypto from "crypto";

export class PetPrismaRepository implements PetRepository {
  async createPet(data: any): Promise<Pet> {
    console.log("Datos recibidos para crear mascota:", data);

    // Preparar los datos para la creación
    const createData: any = {
      name: data.name,
      species_type: data.species_type,
    };

    // Campos opcionales
    if (data.description !== undefined)
      createData.description = data.description;
    if (data.scientific_name !== undefined)
      createData.scientific_name = data.scientific_name;
    if (data.habitat !== undefined) createData.habitat = data.habitat;
    if (data.rarity !== undefined) createData.rarity = data.rarity;
    if (data.is_mexican_native !== undefined)
      createData.is_mexican_native = data.is_mexican_native;

    // Campos de URL
    if (data.avatar_url !== undefined) createData.avatar_url = data.avatar_url;
    if (data.model_3d_url !== undefined)
      createData.model_3d_url = data.model_3d_url;
    if (data.icon_url !== undefined) createData.avatar_url = data.icon_url; // Mapeo de icon_url a avatar_url

    // Campos numéricos
    if (data.quiz_points_cost !== undefined)
      createData.quiz_points_cost = data.quiz_points_cost;
    if (data.base_price !== undefined)
      createData.quiz_points_cost = data.base_price; // Mapeo de base_price a quiz_points_cost

    // Campos JSON
    if (data.unlock_requirements !== undefined)
      createData.unlock_requirements = data.unlock_requirements;
    if (data.evolution_chain !== undefined)
      createData.evolution_chain = data.evolution_chain;
    if (data.base_stats !== undefined) createData.base_stats = data.base_stats;

    // Campos específicos para environmental_preference
    if (data.environmental_preference !== undefined) {
      if (!createData.base_stats) createData.base_stats = {};
      createData.base_stats.environmental_preference =
        data.environmental_preference;
      createData.habitat = data.environmental_preference; // También lo mapeamos a habitat
    }

    // Campos específicos para evolution_stages
    if (data.evolution_stages !== undefined) {
      if (!createData.evolution_chain) createData.evolution_chain = [];
      // Crear un array con el número de etapas especificado
      for (let i = 1; i <= data.evolution_stages; i++) {
        createData.evolution_chain.push({
          stage: i,
          name: `${data.name} - Etapa ${i}`,
          image_url: "",
        });
      }
    }

    // Campos específicos para available_in_store
    if (data.available_in_store !== undefined) {
      // No hay un campo directo en la BD, pero podríamos usar un campo personalizado
      if (!createData.base_stats) createData.base_stats = {};
      createData.base_stats.available_in_store = data.available_in_store;
    }

    console.log("Creando mascota con datos procesados:", createData);

    const created = await prisma.pets.create({
      data: createData,
    });

    return new Pet(
      created.id,
      created.name,
      created.description,
      created.species_type,
      created.created_at,
      created.updated_at
    );
  }

  async getPetById(petId: string): Promise<Pet | null> {
    const pet = await prisma.pets.findUnique({ where: { id: petId } });
    if (!pet) return null;
    return new Pet(
      pet.id,
      pet.name,
      pet.description,
      pet.species_type,
      pet.created_at,
      pet.updated_at
    );
  }

  async updatePet(petId: string, data: any): Promise<Pet> {
    // Mapear campos específicos para la actualización
    const updateData: any = {};

    // Campos básicos
    if (data.name !== undefined) updateData.name = data.name;
    if (data.species_type !== undefined)
      updateData.species_type = data.species_type;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.scientific_name !== undefined)
      updateData.scientific_name = data.scientific_name;
    if (data.habitat !== undefined) updateData.habitat = data.habitat;
    if (data.rarity !== undefined) updateData.rarity = data.rarity;
    if (data.is_mexican_native !== undefined)
      updateData.is_mexican_native = data.is_mexican_native;

    // Campos de URL
    if (data.avatar_url !== undefined) updateData.avatar_url = data.avatar_url;
    if (data.model_3d_url !== undefined)
      updateData.model_3d_url = data.model_3d_url;
    if (data.icon_url !== undefined) updateData.avatar_url = data.icon_url; // Mapeo de icon_url a avatar_url

    // Campos numéricos
    if (data.quiz_points_cost !== undefined)
      updateData.quiz_points_cost = data.quiz_points_cost;
    if (data.base_price !== undefined)
      updateData.quiz_points_cost = data.base_price; // Mapeo de base_price a quiz_points_cost

    // Campos JSON
    if (data.unlock_requirements !== undefined)
      updateData.unlock_requirements = data.unlock_requirements;
    if (data.evolution_chain !== undefined)
      updateData.evolution_chain = data.evolution_chain;
    if (data.base_stats !== undefined) updateData.base_stats = data.base_stats;

    // Actualizar timestamp
    updateData.updated_at = new Date();

    const updated = await prisma.pets.update({
      where: { id: petId },
      data: updateData,
    });

    return new Pet(
      updated.id,
      updated.name,
      updated.description,
      updated.species_type,
      updated.created_at,
      updated.updated_at
    );
  }

  async deletePet(petId: string): Promise<void> {
    await prisma.pets.delete({ where: { id: petId } });
  }

  async getByUserId(userId: string): Promise<Pet[]> {
    const userPets = await prisma.user_pets.findMany({
      where: { user_id: userId },
      include: { pet: true },
    });
    return userPets.map(
      (up: any) =>
        new Pet(
          up.pet.id,
          up.pet.name,
          up.pet.description,
          up.pet.species_type ?? "",
          up.adopted_at,
          up.pet.created_at
        )
    );
  }

  /**
   * Adopta una mascota descontando puntos y registrando historial. Todo en una transacción.
   * Lanza error si el usuario ya tiene la mascota o no tiene puntos suficientes.
   */
  async adoptPetWithPoints(
    userId: string,
    petId: string,
    nickname?: string
  ): Promise<void> {
    await prisma.$transaction(async (tx: any) => {
      // 1. Verificar si ya tiene la mascota
      const existing = await tx.user_pets.findFirst({
        where: { user_id: userId, pet_id: petId },
      });
      if (existing) {
        throw new Error("El usuario ya adoptó esta mascota.");
      }
      // 2. Obtener costo de la mascota
      const pet = await tx.pets.findUnique({ where: { id: petId } });
      if (!pet) throw new Error("Mascota no encontrada.");
      const cost = pet.quiz_points_cost;
      // 3. Obtener puntos disponibles
      const quizPoints = await tx.user_quiz_points.findUnique({
        where: { user_id: userId },
      });
      if (!quizPoints || quizPoints.available_quiz_points < cost) {
        throw new Error("Puntos de mascota insuficientes.");
      }
      // 4. Descontar puntos y sumar gastados
      await tx.user_quiz_points.update({
        where: { user_id: userId },
        data: {
          available_quiz_points: { decrement: cost },
          spent_quiz_points: { increment: cost },
        },
      });
      // 5. Crear historial
      await tx.quiz_points_history.create({
        data: {
          id: crypto.randomUUID(),
          user_id: userId,
          points_change: -cost,
          transaction_type: "adopt_pet",
          pet_id: petId,
          description: `Adopción de mascota (${pet.name})`,
          created_at: new Date(),
        },
      });
      // 6. Crear user_pets
      await tx.user_pets.create({
        data: {
          user_id: userId,
          pet_id: petId,
          nickname: nickname || pet.name,
          evolution_stage: 1,
          selected_stage: 1,
          adopted_at: new Date(),
        },
      });
    });
  }

  async featurePet(userId: string, petId: string): Promise<void> {
    // Desmarcar todas las mascotas del usuario
    await prisma.user_pets.updateMany({
      where: { user_id: userId, is_featured: true },
      data: { is_featured: false },
    });

    // Buscar el registro específico
    const userPet = await prisma.user_pets.findFirst({
      where: { user_id: userId, pet_id: petId },
      select: { id: true },
    });

    if (!userPet) {
      throw new Error("Pet not found for this user");
    }

    // Destacar solo esa mascota
    await prisma.user_pets.update({
      where: { id: userPet.id },
      data: { is_featured: true },
    });
  }

  async updatePetNickname(
    userId: string,
    petId: string,
    nickname: string
  ): Promise<void> {
    const userPet = await prisma.user_pets.findFirst({
      where: { user_id: userId, pet_id: petId },
      select: { id: true },
    });
    if (!userPet) {
      throw new Error("Pet not found for this user");
    }
    await prisma.user_pets.update({
      where: { id: userPet.id },
      data: { nickname },
    });
  }

  async releasePet(userId: string, petId: string): Promise<void> {
    const userPet = await prisma.user_pets.findFirst({
      where: { user_id: userId, pet_id: petId },
      select: { id: true },
    });
    if (!userPet) {
      throw new Error("Pet not found for this user");
    }
    await prisma.user_pets.delete({
      where: { id: userPet.id },
    });
  }

  async getFeaturedPet(userId: string): Promise<Pet | null> {
    const userPet = await prisma.user_pets.findFirst({
      where: { user_id: userId, is_featured: true },
      include: { pet: true },
    });
    if (!userPet) return null;
    return new Pet(
      userPet.pet.id,
      userPet.pet.name,
      userPet.pet.description,
      userPet.pet.species_type ?? "",
      userPet.adopted_at,
      userPet.pet.created_at
    );
  }

  /**
   * Evoluciona una mascota del usuario descontando puntos y registrando historial. Todo en una transacción.
   * Lanza error si el usuario no tiene la mascota, ya está en etapa máxima o no tiene puntos suficientes.
   */
  async evolvePetWithPoints(userId: string, petId: string): Promise<void> {
    await prisma.$transaction(async (tx: any) => {
      // 1. Buscar user_pets
      const userPet = await tx.user_pets.findFirst({
        where: { user_id: userId, pet_id: petId },
      });
      if (!userPet) throw new Error("El usuario no posee esta mascota.");
      const currentStage = userPet.evolution_stage;
      // 2. Buscar siguiente etapa (stage + 1)
      const nextStage = currentStage + 1;
      const evoCost = await tx.pet_evolution_costs.findUnique({
        where: { pet_id_stage: { pet_id: petId, stage: nextStage } },
      });
      if (!evoCost)
        throw new Error(
          "La mascota ya está en la etapa máxima o no existe costo de evolución."
        );
      // 3. Validar puntos suficientes
      const quizPoints = await tx.user_quiz_points.findUnique({
        where: { user_id: userId },
      });
      if (!quizPoints || quizPoints.available_quiz_points < evoCost.cost) {
        throw new Error("Puntos de mascota insuficientes para evolucionar.");
      }
      // 4. Descontar puntos y sumar gastados
      await tx.user_quiz_points.update({
        where: { user_id: userId },
        data: {
          available_quiz_points: { decrement: evoCost.cost },
          spent_quiz_points: { increment: evoCost.cost },
        },
      });
      // 5. Crear historial
      await tx.quiz_points_history.create({
        data: {
          id: crypto.randomUUID(),
          user_id: userId,
          points_change: -evoCost.cost,
          transaction_type: "evolve_pet",
          pet_id: petId,
          description: `Evolución de mascota a etapa ${nextStage}`,
          created_at: new Date(),
        },
      });
      // 6. Actualizar etapa y selected_stage
      await tx.user_pets.update({
        where: { id: userPet.id },
        data: {
          evolution_stage: nextStage,
          selected_stage: nextStage,
          updated_at: new Date(),
        },
      });
    });
  }

  /**
   * Permite al usuario seleccionar la etapa visualizada de una mascota adoptada.
   * Valida que la etapa esté desbloqueada (evolution_stage >= stage).
   */
  async selectPetStage(
    userId: string,
    petId: string,
    stage: number
  ): Promise<void> {
    // Buscar la relación user_pets
    const userPet = await prisma.user_pets.findFirst({
      where: { user_id: userId, pet_id: petId },
    });
    if (!userPet) throw new Error("El usuario no posee esta mascota.");
    if (stage < 1 || stage > userPet.evolution_stage) {
      throw new Error(
        "No puedes seleccionar una etapa que no has desbloqueado."
      );
    }
    await prisma.user_pets.update({
      where: { id: userPet.id },
      data: { selected_stage: stage, updated_at: new Date() },
    });
  }

  /**
   * Obtiene todas las mascotas disponibles para adoptar
   */
  async getAvailablePets(): Promise<any[]> {
    const pets = await prisma.pets.findMany({
      where: {
        deleted_at: null,
        is_mexican_native: true,
      },
      select: {
        id: true,
        name: true,
        scientific_name: true,
        description: true,
        species_type: true,
        habitat: true,
        rarity: true,
        avatar_url: true,
        model_3d_url: true,
        quiz_points_cost: true,
        evolution_chain: true,
        base_stats: true,
        unlock_requirements: true,
      },
      orderBy: [{ rarity: "asc" }, { quiz_points_cost: "asc" }],
    });

    return pets.map((pet) => ({
      pet_id: pet.id,
      name: pet.name,
      scientific_name: pet.scientific_name,
      description: pet.description,
      species_type: pet.species_type,
      habitat: pet.habitat,
      rarity: pet.rarity,
      avatar_url: pet.avatar_url,
      model_3d_url: pet.model_3d_url,
      quiz_points_cost: pet.quiz_points_cost,
      evolution_chain: pet.evolution_chain,
      base_stats: pet.base_stats,
      unlock_requirements: pet.unlock_requirements,
      is_mexican_native: true,
    }));
  }

  /**
   * Obtiene la tienda de mascotas con información de precios y disponibilidad
   */
  async getPetStore(userId?: string): Promise<any> {
    // Obtener todas las mascotas disponibles
    const availablePets = await this.getAvailablePets();

    let userQuizPoints = 0;
    let userOwnedPetIds: string[] = [];

    if (userId) {
      // Obtener puntos disponibles del usuario
      const userPoints = await prisma.user_quiz_points.findUnique({
        where: { user_id: userId },
        select: { available_quiz_points: true },
      });
      userQuizPoints = userPoints?.available_quiz_points || 0;

      // Obtener mascotas que ya posee el usuario
      const ownedPets = await prisma.user_pets.findMany({
        where: { user_id: userId, is_active: true },
        select: { pet_id: true },
      });
      userOwnedPetIds = ownedPets.map((up) => up.pet_id);
    }

    // Procesar mascotas con información adicional
    const processedPets = availablePets.map((pet) => ({
      ...pet,
      user_can_afford: userId ? userQuizPoints >= pet.quiz_points_cost : null,
      user_already_owns: userId ? userOwnedPetIds.includes(pet.pet_id) : null,
      is_on_sale: false, // TODO: Implementar sistema de ofertas
      original_price: pet.quiz_points_cost,
      discount_percentage: 0,
    }));

    // Mascotas destacadas (las más raras o populares)
    const featuredPets = processedPets
      .filter((pet) => pet.rarity === "legendary" || pet.rarity === "epic")
      .slice(0, 3)
      .map((pet) => pet.pet_id);

    return {
      available_pets: processedPets,
      user_quiz_points: userId ? userQuizPoints : null,
      featured_pets: featuredPets,
      store_stats: {
        total_pets: processedPets.length,
        affordable_pets: userId
          ? processedPets.filter((p) => p.user_can_afford).length
          : null,
        owned_pets: userId ? userOwnedPetIds.length : null,
      },
    };
  }

  /**
   * Obtiene detalles específicos de una mascota con información adicional del usuario
   */
  async getPetDetails(petId: string, userId?: string): Promise<any> {
    // Obtener información básica de la mascota
    const pet = await prisma.pets.findUnique({
      where: { id: petId, deleted_at: null },
      include: {
        pet_evolution_costs: {
          orderBy: { stage: "asc" },
        },
      },
    });

    if (!pet) return null;

    let userInfo = null;
    if (userId) {
      // Verificar si el usuario posee esta mascota
      const userPet = await prisma.user_pets.findFirst({
        where: {
          user_id: userId,
          pet_id: petId,
          is_active: true,
        },
      });

      // Obtener puntos disponibles del usuario
      const userPoints = await prisma.user_quiz_points.findUnique({
        where: { user_id: userId },
        select: { available_quiz_points: true },
      });

      userInfo = {
        user_owns: !!userPet,
        user_can_afford:
          (userPoints?.available_quiz_points || 0) >= pet.quiz_points_cost,
        user_available_points: userPoints?.available_quiz_points || 0,
        user_pet_info: userPet
          ? {
              idUserPet: userPet.id,
              nickname: userPet.nickname,
              level: userPet.level,
              evolution_stage: userPet.evolution_stage,
              selected_stage: userPet.selected_stage,
              experience_points: userPet.experience_points,
              happiness_level: userPet.happiness_level,
              health_level: userPet.health_level,
              is_featured: userPet.is_featured,
              adopted_at: userPet.adopted_at,
              last_interaction_at: userPet.last_interaction_at,
            }
          : null,
      };
    }

    return {
      pet_id: pet.id,
      name: pet.name,
      scientific_name: pet.scientific_name,
      description: pet.description,
      species_type: pet.species_type,
      habitat: pet.habitat,
      rarity: pet.rarity,
      is_mexican_native: pet.is_mexican_native,
      avatar_url: pet.avatar_url,
      model_3d_url: pet.model_3d_url,
      quiz_points_cost: pet.quiz_points_cost,
      evolution_chain: pet.evolution_chain,
      base_stats: pet.base_stats,
      unlock_requirements: pet.unlock_requirements,
      evolution_costs: pet.pet_evolution_costs.map((cost) => ({
        stage: cost.stage,
        cost: cost.cost,
        stage_name: this.getStageName(cost.stage),
      })),
      created_at: pet.created_at,
      updated_at: pet.updated_at,
      user_info: userInfo,
    };
  }

  private getStageName(stage: number): string {
    const stageNames = {
      1: "Bebé",
      2: "Joven",
      3: "Adulto",
    };
    return stageNames[stage as keyof typeof stageNames] || `Etapa ${stage}`;
  }
}
