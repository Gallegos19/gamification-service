import { Router } from 'express';
import { unlockBadge } from '../controllers/badges.unlock.controller';

const router = Router();

// POST /api/gamification/badges/:userId/unlock
router.post('/:userId/unlock', unlockBadge);

export default router;
