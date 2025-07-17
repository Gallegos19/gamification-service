import { Router } from "express";
import {
  getChallengePointsByUserId,
  getChallengeHistory,
  getChallengeRankings,
  getEnvironmentalImpactRankings,
} from "../controllers/challengePoints.controller";
import { awardChallengePoints } from "../controllers/challengePoints.award.controller";

const router = Router();

// Rutas específicas primero
// GET /api/gamification/challenge-points/rankings
router.get("/rankings", getChallengeRankings);

// GET /api/gamification/challenge-points/rankings/environmental-impact
router.get("/rankings/environmental-impact", getEnvironmentalImpactRankings);

// GET /api/gamification/challenge-points/history/:userId
router.get("/history/:userId", getChallengeHistory);

// Rutas con parámetros al final
// POST /api/gamification/challenge-points/:userId/award
router.post("/:userId/award", awardChallengePoints);

// GET /api/gamification/challenge-points/:userId
router.get("/:userId", getChallengePointsByUserId);

export default router;
