import { Request, Response } from 'express';
import { AdoptPetDto } from '../dtos/AdoptPetDto';
import { validate } from 'class-validator';
import { container } from '../../config/container';

export async function adoptPet(req: Request, res: Response) {
  const { userId } = req.params;
  const dto = new AdoptPetDto();
  dto.petId = req.body.petId;
  dto.nickname = req.body.nickname;

  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Invalid request', errors });
  }

  try {
    await container.adoptPetUseCase.execute({ userId, petId: dto.petId, nickname: dto.nickname });
    res.status(204).send();
  } catch (error: any) {
    if (typeof error.message === 'string') {
      if (error.message.includes('ya adoptó')) {
        return res.status(409).json({ message: error.message });
      }
      if (error.message.includes('insuficientes')) {
        return res.status(400).json({ message: error.message });
      }
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({ message: error.message });
      }
    }
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function purchasePet(req: Request, res: Response) {
  // DTO para purchase incluye userId en el body
  const dto = new AdoptPetDto();
  dto.petId = req.body.petId;
  dto.nickname = req.body.nickname;
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required in request body' });
  }

  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Invalid request', errors });
  }

  try {
    await container.adoptPetUseCase.execute({ userId, petId: dto.petId, nickname: dto.nickname });
    
    // Respuesta más detallada para purchase
    res.status(201).json({
      message: 'Pet purchased successfully',
      transaction_id: `txn_${Date.now()}_${userId}`,
      pet_id: dto.petId,
      nickname: dto.nickname || 'Sin nombre',
      purchased_at: new Date().toISOString()
    });
  } catch (error: any) {
    if (typeof error.message === 'string') {
      if (error.message.includes('ya adoptó')) {
        return res.status(409).json({ message: 'User already owns this pet' });
      }
      if (error.message.includes('insuficientes')) {
        return res.status(400).json({ message: 'Insufficient quiz points' });
      }
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({ message: 'Pet not found' });
      }
    }
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
