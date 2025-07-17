import { Router } from 'express';
import { awardChallengePoints } from '../controllers/challengePoints.award.controller';

const router = Router();

// POST /api/gamification/challenge-points/:userId/award
router.post('/:userId/award', awardChallengePoints);

export default router;
