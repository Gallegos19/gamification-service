import { Request, Response } from 'express';
import { container } from '../../config/container';

export async function getDashboardByUserId(req: Request, res: Response) {
  try {
    const dashboard = await container.getDashboardByUserIdUseCase.execute(req.params.userId);
    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found for user' });
    }
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
