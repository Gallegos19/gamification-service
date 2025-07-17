import { Request, Response } from 'express';
import { container } from '../../config/container';

export async function evolvePet(req: Request, res: Response) {
  const { userId, petId } = req.params;
  try {
    await container.evolvePetUseCase.execute({ userId, petId });
    res.status(204).send();
  } catch (error: any) {
    if (typeof error.message === 'string') {
      if (error.message.includes('no posee')) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes('máxima')) {
        return res.status(409).json({ message: error.message });
      }
      if (error.message.includes('insuficientes')) {
        return res.status(400).json({ message: error.message });
      }
    }
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
