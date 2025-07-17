import { Request, Response } from 'express';
import { FeatureBadgeDto } from '../dtos/FeatureBadgeDto';
import { validateOrReject } from 'class-validator';
import { container } from '../../config/container';
import { FeatureBadge } from '../../../application/badges/FeatureBadge';

export async function featureBadgeController(req: Request, res: Response) {
  const dto = new FeatureBadgeDto();
  dto.badgeId = req.body.badgeId;

  try {
    await validateOrReject(dto);
    const useCase: FeatureBadge = container.FeatureBadge;
    await useCase.execute({ userId: req.params.userId, badgeId: dto.badgeId });
    res.status(200).json({ message: 'Badge destacado correctamente' });
  } catch (err: any) {
    if (Array.isArray(err)) {
      return res.status(400).json({ message: 'Datos inválidos', errors: err });
    }
    if (err.message === 'Badge not found for this user') {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'Error al destacar badge', error: err.message });
  }
}
