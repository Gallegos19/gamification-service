import { Request, Response } from 'express';
import { container } from '../../config/container';

export async function getBadgesByUserId(req: Request, res: Response) {
  try {
    const badges = await container.getBadgesByUserIdUseCase.execute(req.params.userId);
    if (!badges || badges.length === 0) {
      return res.status(404).json({ message: 'No badges found for user' });
    }
    res.json(badges);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getAvailableBadges(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const availableBadges = await container.getAvailableBadgesUseCase.execute(userId);
    res.json(availableBadges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getBadgeTiersProgress(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const tiersProgress = await container.getBadgeTiersProgressUseCase.execute(userId);
    res.json(tiersProgress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getBadgeTiersConfig(req: Request, res: Response) {
  try {
    const tiersConfig = await container.getBadgeTiersConfigUseCase.execute();
    res.json(tiersConfig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
