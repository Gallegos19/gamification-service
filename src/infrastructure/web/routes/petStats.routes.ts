import { Router } from 'express';
import { container } from '../../config/container';
import { PetStatsController } from '../controllers/petStats.controller';

const router = Router();

// Create controller instance
const petStatsController = new PetStatsController();

// Map routes to controller methods
router.post('/:petId/increase', (req, res) => petStatsController.handleIncreasePetStats(req, res));
router.post('/:petId/decrease', (req, res) => petStatsController.handleDecreasePetStats(req, res));

export default router;
