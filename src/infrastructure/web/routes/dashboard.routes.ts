import { Router } from 'express';
import { getDashboardByUserId } from '../controllers/dashboard.controller';

const router = Router();

// GET /api/gamification/dashboard/:userId
router.get('/:userId', getDashboardByUserId);

export default router;
