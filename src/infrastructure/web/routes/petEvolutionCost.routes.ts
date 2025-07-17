import { Router } from 'express';
import { 
  createPetEvolutionCost, 
  listPetEvolutionCosts, 
  updatePetEvolutionCost, 
  deletePetEvolutionCost 
} from '../controllers/petEvolutionCost.controller';

const router = Router();

// POST /api/gamification/pet-evolution-costs
router.post('/', createPetEvolutionCost);

// GET /api/gamification/pet-evolution-costs/:petId
router.get('/:petId', listPetEvolutionCosts);

// PUT /api/gamification/pet-evolution-costs/:petId/:stage
router.put('/:petId/:stage', updatePetEvolutionCost);

// DELETE /api/gamification/pet-evolution-costs/:petId/:stage
router.delete('/:petId/:stage', deletePetEvolutionCost);

export default router;