import { Request, Response } from 'express';
import { container } from '../../config/container';

export async function listPetEvolutionCosts(req: Request, res: Response) {
  const { petId } = req.params;
  if (typeof petId !== 'string') {
    return res.status(400).json({ message: 'petId es requerido en la ruta.' });
  }
  try {
    const result = await container.listPetEvolutionCostsUseCase.execute(petId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error interno al listar costos.' });
  }
}

export async function deletePetEvolutionCost(req: Request, res: Response) {
  const { petId, stage } = req.params;
  if (typeof petId !== 'string' || isNaN(Number(stage))) {
    return res.status(400).json({ message: 'petId y stage son requeridos.' });
  }
  try {
    await container.deletePetEvolutionCostUseCase.execute({ petId, stage: Number(stage) });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'No existe costo para esa mascota y etapa.' });
    }
    res.status(500).json({ message: 'Error interno al eliminar costo.' });
  }
}

export async function updatePetEvolutionCost(req: Request, res: Response) {
  const { petId, stage } = req.params;
  const { cost } = req.body;
  if (typeof petId !== 'string' || isNaN(Number(stage)) || typeof cost !== 'number') {
    return res.status(400).json({ message: 'petId, stage y cost son requeridos.' });
  }
  try {
    const result = await container.updatePetEvolutionCostUseCase.execute({ petId, stage: Number(stage), cost });
    res.json(result);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'No existe costo para esa mascota y etapa.' });
    }
    res.status(500).json({ message: 'Error interno al actualizar costo.' });
  }
}

export async function createPetEvolutionCost(req: Request, res: Response) {
  const { petId, stage, cost } = req.body;
  if (typeof petId !== 'string' || typeof stage !== 'number' || typeof cost !== 'number') {
    return res.status(400).json({ message: 'petId debe ser string, stage y cost deben ser números.' });
  }
  try {
    const result = await container.createPetEvolutionCostUseCase.execute({ petId, stage, cost });
    res.status(201).json(result);
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Prisma unique constraint failed
      return res.status(409).json({ message: 'Ya existe un costo para esa mascota y etapa.' });
    }
    res.status(500).json({ message: 'Error interno al crear el costo de evolución.' });
  }
}
