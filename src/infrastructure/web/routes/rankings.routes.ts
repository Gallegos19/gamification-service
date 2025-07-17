import { Router } from 'express';
import { getCombinedRankings, getUserStats } from '../controllers/rankings.controller';

const router = Router();

// GET /api/gamification/rankings/combined
router.get('/combined', getCombinedRankings);

// GET /api/gamification/rankings/user-stats/:userId
router.get('/user-stats/:userId', getUserStats);

export default router;