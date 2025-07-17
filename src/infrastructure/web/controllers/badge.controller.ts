import { Request, Response } from 'express';
import { container } from '../../config/container';
import { Badge } from '../../../domain/entities/Badge';

export async function createBadge(req: Request, res: Response) {
  const { name, description, icon_url, category, rarity, badge_tier, unlock_criteria } = req.body;
  if (!name || !rarity || !badge_tier) {
    return res.status(400).json({ message: 'name, rarity y badge_tier son obligatorios.' });
  }
  try {
    const badge = new Badge(
      '', '', '', new Date(), false, null,
      { name, description, icon_url, category, rarity, badge_tier, unlock_criteria }
    );
    const result = await container.createBadgeUseCase.execute(badge);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear badge.' });
  }
}

export async function getAllBadges(req: Request, res: Response) {
  try {
    const result = await container.getAllBadgesUseCase.execute();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener badges.' });
  }
}

export async function getBadgeById(req: Request, res: Response) {
  const { badgeId } = req.params;
  try {
    const result = await container.getBadgeByIdUseCase.execute(badgeId);
    if (!result) return res.status(404).json({ message: 'Badge no encontrado.' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener badge.' });
  }
}

export async function updateBadge(req: Request, res: Response) {
  const { badgeId } = req.params;
  const data = req.body;
  try {
    const result = await container.updateBadgeUseCase.execute(badgeId, data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar badge.' });
  }
}

export async function deleteBadge(req: Request, res: Response) {
  const { badgeId } = req.params;
  try {
    await container.deleteBadgeUseCase.execute(badgeId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar badge.' });
  }
}
