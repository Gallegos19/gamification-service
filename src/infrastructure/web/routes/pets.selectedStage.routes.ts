import { Router } from 'express';
import { selectPetStage } from '../controllers/pets.selectedStage.controller';

const router = Router();

// PATCH /api/gamification/pets/owned/:userId/:petId/selected-stage
router.patch('/owned/:userId/:petId/selected-stage', selectPetStage);

export default router;
