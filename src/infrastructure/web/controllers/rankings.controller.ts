import { Request, Response } from 'express';
import { container } from '../../config/container';

export async function getCombinedRankings(req: Request, res: Response) {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    const combinedRankings = await container.getCombinedRankingsUseCase.execute(limit, offset);
    res.json(combinedRankings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getUserStats(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const userStats = await container.getUserStatsUseCase.execute(userId);
    
    if (!userStats) {
      return res.status(404).json({ message: 'User stats not found' });
    }
    
    res.json(userStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}