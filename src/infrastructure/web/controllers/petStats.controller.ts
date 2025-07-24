import { Controller, Post, Param, Body, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { container } from '../../config/container';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdatePetStatsDto, PetStatsResponseDto } from '../dto/pet-stats.dto';
import { JwtAuthGuard } from '../middleware/auth.middleware';

@ApiTags('Pet Stats')
@ApiBearerAuth()
@Controller('api/gamification/pet-stats')
@UseGuards(JwtAuthGuard)
export class PetStatsController {
  constructor() {}

  // This method is called by the router
  async handleIncreasePetStats(req: Request, res: Response) {
    return this.increasePetStats(req, res, req.params.petId, req.body);
  }

  // This method is called by the router
  async handleDecreasePetStats(req: Request, res: Response) {
    return this.decreasePetStats(req, res, req.params.petId, req.body);
  }
  @Post(':petId/increase')
  @ApiOperation({ summary: 'Increase pet stats', description: 'Increases the happiness and/or health of a pet' })
  @ApiParam({ name: 'petId', description: 'ID of the pet', type: String })
  @ApiBody({ type: UpdatePetStatsDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Pet stats increased successfully',
    type: PetStatsResponseDto
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  public async increasePetStats(req: Request, res: Response, petId: string, body: UpdatePetStatsDto) {
    try {
      const userId = req.user?.id || req.body.userId;
      const { happiness = 0, health = 0 } = body;

      if (!happiness && !health) {
        return res.status(400).json({ 
          error: 'At least one of happiness or health must be provided' 
        });
      }

      const updates: any = {};
      if (happiness) updates.happinessLevel = happiness;
      if (health) updates.healthLevel = health;

      const pet = await container.updatePetStatsUseCase.execute({
        petId,
        userId,
        ...updates
      });

      res.json(pet);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ 
        error: error.message || 'Internal server error' 
      });
    }
  }

  @Post(':petId/decrease')
  @ApiOperation({ summary: 'Decrease pet stats', description: 'Decreases the happiness and/or health of a pet' })
  @ApiParam({ name: 'petId', description: 'ID of the pet', type: String })
  @ApiBody({ type: UpdatePetStatsDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Pet stats decreased successfully',
    type: PetStatsResponseDto
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  public async decreasePetStats(req: Request, res: Response, petId: string, body: UpdatePetStatsDto) {
    try {
      const userId = req.user?.id || req.body.userId;
      const { happiness = 0, health = 0 } = body;

      if (!happiness && !health) {
        return res.status(400).json({ 
          error: 'At least one of happiness or health must be provided' 
        });
      }

      // Get current stats first
      const pet = await container.userPetsRepository.findByUserIdAndPetId(userId, petId);
      if (!pet) {
        return res.status(404).json({ error: 'Pet not found' });
      }

      const updates: any = {};
      if (happiness) {
        updates.happinessLevel = Math.max(10, pet.happiness_level - happiness);
      }
      if (health) {
        updates.healthLevel = Math.max(10, pet.health_level - health);
      }

      const updatedPet = await container.updatePetStatsUseCase.execute({
        petId,
        userId,
        ...updates
      });

      res.json(updatedPet);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ 
        error: error.message || 'Internal server error' 
      });
    }
  }
}
