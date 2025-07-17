import { Request, Response } from 'express';
import { UnlockBadgeDto } from '../dtos/UnlockBadgeDto';
import { container } from '../../config/container';
import { validate } from 'class-validator';

export async function unlockBadge(req: Request, res: Response) {
  const { userId } = req.params;
  const dto = new UnlockBadgeDto();
  dto.badgeId = req.body.badgeId;

  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Invalid request', errors });
  }

  try {
    await container.unlockBadgeUseCase.execute({ userId, badgeId: dto.badgeId });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
