import { Request, Response } from 'express';
import { container } from '../../config/container';

export async function createPet(req: Request, res: Response) {
  try {
    console.log('Datos recibidos en el controlador para crear mascota:', req.body);
    
    // Validar que el cuerpo de la solicitud no esté vacío
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Se requieren datos para crear la mascota' });
    }
    
    // Validar campos obligatorios
    if (!req.body.name || !req.body.species_type) {
      return res.status(400).json({ error: 'Los campos name y species_type son obligatorios' });
    }
    
    const pet = await container.createPetUseCase.execute(req.body);
    console.log('Mascota creada exitosamente:', pet);
    res.status(201).json(pet);
  } catch (error: any) {
    console.error('Error al crear mascota:', error);
    
    // Manejar diferentes tipos de errores
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Conflicto con datos existentes' });
    } else if (error.message) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
}

export async function getPetById(req: Request, res: Response) {
  try {
    const pet = await container.getPetByIdUseCase.execute(req.params.petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updatePet(req: Request, res: Response) {
  try {
    // Validar que el ID de la mascota sea válido
    const { petId } = req.params;
    if (!petId) {
      return res.status(400).json({ error: 'Se requiere un ID de mascota válido' });
    }

    // Validar que el cuerpo de la solicitud no esté vacío
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Se requieren datos para actualizar la mascota' });
    }

    console.log(`Actualizando mascota con ID: ${petId}`, req.body);
    
    const pet = await container.updatePetUseCase.execute(petId, req.body);
    
    console.log(`Mascota actualizada exitosamente: ${pet.id}`);
    res.json(pet);
  } catch (error: any) {
    console.error('Error al actualizar mascota:', error);
    
    // Manejar diferentes tipos de errores
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    } else if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Conflicto con datos existentes' });
    } else if (error.message) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
}

export async function deletePet(req: Request, res: Response) {
  try {
    await container.deletePetUseCase.execute(req.params.petId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
