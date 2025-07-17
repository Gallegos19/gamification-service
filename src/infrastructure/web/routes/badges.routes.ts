import { Router } from 'express';
import { 
  getBadgesByUserId, 
  getAvailableBadges, 
  getBadgeTiersProgress, 
  getBadgeTiersConfig 
} from '../controllers/badges.controller';
import { unlockBadge } from '../controllers/badges.unlock.controller';
import { featureBadgeController } from '../controllers/badges.feature.controller';
import { createBadge, deleteBadge, getAllBadges, getBadgeById, updateBadge } from '../controllers/badge.controller';

const router = Router();

// CRUD base de badges
// POST /api/gamification/badges
router.post('/', createBadge);
// GET /api/gamification/badges
router.get('/', getAllBadges);
// GET /api/gamification/badges/:badgeId
router.get('/id/:badgeId', getBadgeById);
// PUT /api/gamification/badges/:badgeId
router.put('/id/:badgeId', updateBadge);
// DELETE /api/gamification/badges/:badgeId
router.delete('/id/:badgeId', deleteBadge);

// Rutas de usuario (mantener aparte)
router.get('/:userId', getBadgesByUserId);
router.get('/available/:userId', getAvailableBadges);
router.get('/tiers/progress/:userId', getBadgeTiersProgress);
router.get('/tiers/config', getBadgeTiersConfig);
router.post('/:userId/unlock', unlockBadge);
router.post('/:userId/feature', featureBadgeController);

export default router;
