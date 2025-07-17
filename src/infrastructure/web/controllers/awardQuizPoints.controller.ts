import { Request, Response } from 'express';
import { container } from '../../config/container';

export async function awardQuizPoints(req: Request, res: Response) {
  try {
    const result = await container.awardQuizPointsUseCase.execute(req.body);
    if (result.success) {
      res.status(201).json({ transaction_id: result.transaction_id });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
