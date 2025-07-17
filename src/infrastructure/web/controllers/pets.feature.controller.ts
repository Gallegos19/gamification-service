import { Request, Response } from 'express';
import { FeaturePetDto } from '../dtos/FeaturePetDto';
import { validateOrReject } from 'class-validator';
import { container } from '../../config/container';
import { FeaturePet } from '../../../application/pets/FeaturePet';

export async function featurePetController(req: Request, res: Response) {
  const dto = new FeaturePetDto();
  dto.petId = req.body.petId;

  try {
    await validateOrReject(dto);
    const useCase = container.FeaturePet;
    await useCase.execute({ userId: req.params.userId, petId: dto.petId });
    res.status(200).json({ message: 'Mascota destacada correctamente' });
  } catch (err: any) {
    if (Array.isArray(err)) {
      return res.status(400).json({ message: 'Datos inválidos', errors: err });
    }
    if (err.message === 'Pet not found for this user') {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'Error al destacar mascota', error: err.message });
  }
}
