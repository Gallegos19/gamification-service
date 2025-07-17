import { Request, Response } from 'express';
import { container } from '../../config/container';

export async function getPetsByUserId(req: Request, res: Response) {
  try {
    const pets = await container.getPetsByUserIdUseCase.execute(req.params.userId);
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getAvailablePets(req: Request, res: Response) {
  try {
    const availablePets = await container.getAvailablePetsUseCase.execute();
    res.json(availablePets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getPetStore(req: Request, res: Response) {
  try {
    const userId = req.query.userId as string;
    const store = await container.getPetStoreUseCase.execute(userId);
    res.json(store);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getPetDetails(req: Request, res: Response) {
  try {
    const { petId } = req.params;
    const userId = req.query.userId as string;
    const petDetails = await container.getPetDetailsUseCase.execute(petId, userId);
    
    if (!petDetails) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    res.json(petDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
