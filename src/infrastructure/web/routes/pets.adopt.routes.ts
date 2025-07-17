import { Router } from 'express';
import { adoptPet } from '../controllers/pets.adopt.controller';

const router = Router();

// POST /api/gamification/pets/:userId/adopt
router.post('/:userId/adopt', adoptPet);

export default router;
