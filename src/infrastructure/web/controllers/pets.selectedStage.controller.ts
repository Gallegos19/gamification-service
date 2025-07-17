import { Request, Response } from 'express';
import { container } from '../../config/container';

export async function selectPetStage(req: Request, res: Response) {
  const { userId, petId } = req.params;
  const { stage } = req.body;
  if (typeof stage !== 'number' || stage < 1) {
    return res.status(400).json({ message: 'El campo stage debe ser un número entero mayor o igual a 1.' });
  }
  try {
    await container.selectPetStageUseCase.execute({ userId, petId, stage });
    res.status(204).send();
  } catch (error: any) {
    if (typeof error.message === 'string') {
      if (error.message.includes('no posee')) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes('no has desbloqueado')) {
        return res.status(409).json({ message: error.message });
      }
    }
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
