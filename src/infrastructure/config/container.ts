import { QuizPointsPrismaRepository } from '../db/repositories/QuizPointsPrismaRepository';
import { GetQuizPointsByUserId } from '../../application/quizPoints/GetQuizPointsByUserId';
import { GetQuizHistory } from '../../application/quizPoints/GetQuizHistory';
import { GetQuizRankings } from '../../application/quizPoints/GetQuizRankings';
import { GetWeeklyQuizRankings } from '../../application/quizPoints/GetWeeklyQuizRankings';
import { GetAgeGroupQuizRankings } from '../../application/quizPoints/GetAgeGroupQuizRankings';
import { CreateQuizPoints } from '../../application/quizPoints/CreateQuizPoints';
import { UpdateQuizPoints } from '../../application/quizPoints/UpdateQuizPoints';
import { DeleteQuizPoints } from '../../application/quizPoints/DeleteQuizPoints';

import { AwardQuizPointsPrismaRepository } from '../db/repositories/AwardQuizPointsPrismaRepository';
import { AwardQuizPoints } from '../../application/quizPoints/AwardQuizPoints';

const quizPointsRepo = new QuizPointsPrismaRepository();
const getQuizPointsByUserIdUseCase = new GetQuizPointsByUserId(quizPointsRepo as QuizPointsRepository);
const getQuizHistoryUseCase = new GetQuizHistory(quizPointsRepo as QuizPointsRepository);
const getQuizRankingsUseCase = new GetQuizRankings(quizPointsRepo as QuizPointsRepository);
const getWeeklyQuizRankingsUseCase = new GetWeeklyQuizRankings(quizPointsRepo as QuizPointsRepository);
const getAgeGroupQuizRankingsUseCase = new GetAgeGroupQuizRankings(quizPointsRepo as QuizPointsRepository);
const createQuizPointsUseCase = new CreateQuizPoints(quizPointsRepo as QuizPointsRepository);
const updateQuizPointsUseCase = new UpdateQuizPoints(quizPointsRepo as QuizPointsRepository);
const deleteQuizPointsUseCase = new DeleteQuizPoints(quizPointsRepo as QuizPointsRepository);

const awardQuizPointsRepo = new AwardQuizPointsPrismaRepository();
const awardQuizPointsUseCase = new AwardQuizPoints(awardQuizPointsRepo);

import { PetPrismaRepository } from '../db/repositories/PetPrismaRepository';
import { GetPetsByUserId } from '../../application/pets/GetPetsByUserId';

const petRepo = new PetPrismaRepository();
const getPetsByUserIdUseCase = new GetPetsByUserId(petRepo);

import { ChallengePointsPrismaRepository } from '../db/repositories/ChallengePointsPrismaRepository';
import { GetChallengePointsByUserId } from '../../application/challengePoints/GetChallengePointsByUserId';

const challengePointsRepo = new ChallengePointsPrismaRepository();
const getChallengePointsByUserIdUseCase = new GetChallengePointsByUserId(challengePointsRepo);

import { BadgePrismaRepository } from '../db/repositories/BadgePrismaRepository';
import { GetBadgesByUserId } from '../../application/badges/GetBadgesByUserId';
import { CreateBadge } from '../../application/badges/CreateBadge';
import { GetAllBadges } from '../../application/badges/GetAllBadges';
import { GetBadgeById } from '../../application/badges/GetBadgeById';
import { UpdateBadge } from '../../application/badges/UpdateBadge';
import { DeleteBadge } from '../../application/badges/DeleteBadge';

const badgeRepo = new BadgePrismaRepository();
const getBadgesByUserIdUseCase = new GetBadgesByUserId(badgeRepo);
const createBadgeUseCase = new CreateBadge(badgeRepo);
const getAllBadgesUseCase = new GetAllBadges(badgeRepo);
const getBadgeByIdUseCase = new GetBadgeById(badgeRepo);
const updateBadgeUseCase = new UpdateBadge(badgeRepo);
const deleteBadgeUseCase = new DeleteBadge(badgeRepo);

import { DashboardPrismaRepository } from '../db/repositories/DashboardPrismaRepository';
import { GetDashboardByUserId } from '../../application/dashboard/GetDashboardByUserId';

const dashboardRepo = new DashboardPrismaRepository();
const getDashboardByUserIdUseCase = new GetDashboardByUserId(dashboardRepo);

import { AwardChallengePoints } from '../../application/challengePoints/AwardChallengePoints';
import { GetChallengeHistory } from '../../application/challengePoints/GetChallengeHistory';
import { GetChallengeRankings } from '../../application/challengePoints/GetChallengeRankings';
import { GetEnvironmentalImpactRankings } from '../../application/challengePoints/GetEnvironmentalImpactRankings';

const awardChallengePointsUseCase = new AwardChallengePoints(challengePointsRepo);
const getChallengeHistoryUseCase = new GetChallengeHistory(challengePointsRepo);
const getChallengeRankingsUseCase = new GetChallengeRankings(challengePointsRepo);
const getEnvironmentalImpactRankingsUseCase = new GetEnvironmentalImpactRankings(challengePointsRepo);

import { AdoptPet } from '../../application/pets/AdoptPet';
import { FeaturePet } from '../../application/pets/FeaturePet';
import { CreatePet } from '../../application/pets/CreatePet';
import { GetPetById } from '../../application/pets/GetPetById';
import { UpdatePet } from '../../application/pets/UpdatePet';
import { DeletePet } from '../../application/pets/DeletePet';
import { GetFeaturedPet } from '../../application/pets/GetFeaturedPet';
import { UpdatePetNickname } from '../../application/pets/UpdatePetNickname';
import { GetAvailablePets } from '../../application/pets/GetAvailablePets';
import { GetPetStore } from '../../application/pets/GetPetStore';
import { GetPetDetails } from '../../application/pets/GetPetDetails';
import { UnlockBadge } from '../../application/badges/UnlockBadge';
import { GetAvailableBadges } from '../../application/badges/GetAvailableBadges';
import { GetBadgeTiersProgress } from '../../application/badges/GetBadgeTiersProgress';
import { GetBadgeTiersConfig } from '../../application/badges/GetBadgeTiersConfig';

import { RankingsPrismaRepository } from '../db/repositories/RankingsPrismaRepository';
import { GetCombinedRankings } from '../../application/rankings/GetCombinedRankings';
import { GetUserStats } from '../../application/rankings/GetUserStats';
import { QuizPointsRepository } from '../../domain/repositories/QuizPointsRepository';
import { CreateQuizPointsHistory } from '../../application/quizPoints/CreateQuizPointsHistory';
import { UpdateQuizPointsHistory } from '../../application/quizPoints/UpdateQuizPointsHistory';
import { DeleteQuizPointsHistory } from '../../application/quizPoints/DeleteQuizPointsHistory';
import { CreateQuizPointsRanking } from '../../application/quizPoints/CreateQuizPointsRanking';
import { UpdateQuizPointsRanking } from '../../application/quizPoints/UpdateQuizPointsRanking';
import { DeleteQuizPointsRanking } from '../../application/quizPoints/DeleteQuizPointsRanking';
import { ReleasePet } from '../../application/pets/ReleasePet';
import { EvolvePet } from '../../application/pets/EvolvePet';
import { SelectPetStage } from '../../application/pets/SelectPetStage';
import { PetEvolutionCostPrismaRepository } from '../db/repositories/PetEvolutionCostPrismaRepository';
import { CreatePetEvolutionCost } from '../../application/pets/CreatePetEvolutionCost';
import { ListPetEvolutionCosts } from '../../application/pets/ListPetEvolutionCosts';
import { UpdatePetEvolutionCost } from '../../application/pets/UpdatePetEvolutionCost';
import { DeletePetEvolutionCost } from '../../application/pets/DeletePetEvolutionCost';

const adoptPetUseCase = new AdoptPet(petRepo);
const updatePetNicknameUseCase = new UpdatePetNickname(petRepo);
const unlockBadgeUseCase = new UnlockBadge(badgeRepo);
const getAvailableBadgesUseCase = new GetAvailableBadges(badgeRepo);
const getBadgeTiersProgressUseCase = new GetBadgeTiersProgress(badgeRepo);
const getBadgeTiersConfigUseCase = new GetBadgeTiersConfig(badgeRepo);
const getFeaturedPetUseCase = new GetFeaturedPet(petRepo);
const releasePetUseCase = new ReleasePet(petRepo);
const evolvePetUseCase = new EvolvePet(petRepo);
const selectPetStageUseCase = new SelectPetStage(petRepo);
const getAvailablePetsUseCase = new GetAvailablePets(petRepo);
const getPetStoreUseCase = new GetPetStore(petRepo);
const getPetDetailsUseCase = new GetPetDetails(petRepo);

const petEvolutionCostRepo = new PetEvolutionCostPrismaRepository();
const createPetEvolutionCostUseCase = new CreatePetEvolutionCost(petEvolutionCostRepo);
const listPetEvolutionCostsUseCase = new ListPetEvolutionCosts(petEvolutionCostRepo);
const updatePetEvolutionCostUseCase = new UpdatePetEvolutionCost(petEvolutionCostRepo);
const deletePetEvolutionCostUseCase = new DeletePetEvolutionCost(petEvolutionCostRepo);

const rankingsRepo = new RankingsPrismaRepository();
const getCombinedRankingsUseCase = new GetCombinedRankings(rankingsRepo);
const getUserStatsUseCase = new GetUserStats(rankingsRepo);

export const container = {
  createPetUseCase: new CreatePet(petRepo),
  getPetByIdUseCase: new GetPetById(petRepo),
  updatePetUseCase: new UpdatePet(petRepo),
  deletePetUseCase: new DeletePet(petRepo),
  createQuizPointsRankingUseCase: new CreateQuizPointsRanking(quizPointsRepo as QuizPointsRepository),
  updateQuizPointsRankingUseCase: new UpdateQuizPointsRanking(quizPointsRepo as QuizPointsRepository),
  deleteQuizPointsRankingUseCase: new DeleteQuizPointsRanking(quizPointsRepo as QuizPointsRepository),
  createQuizPointsHistoryUseCase: new CreateQuizPointsHistory(quizPointsRepo as QuizPointsRepository),
  updateQuizPointsHistoryUseCase: new UpdateQuizPointsHistory(quizPointsRepo as QuizPointsRepository),
  deleteQuizPointsHistoryUseCase: new DeleteQuizPointsHistory(quizPointsRepo as QuizPointsRepository),
  createQuizPointsUseCase,
  updateQuizPointsUseCase,
  deleteQuizPointsUseCase,
  getQuizHistoryUseCase,
  getQuizRankingsUseCase,
  getWeeklyQuizRankingsUseCase,
  getAgeGroupQuizRankingsUseCase,
  FeatureBadge: new (require('../../application/badges/FeatureBadge').FeatureBadge)(badgeRepo),
  FeaturePet: new FeaturePet(petRepo),
  quizPointsRepo,
  getQuizPointsByUserIdUseCase,
  awardQuizPointsRepo,
  awardQuizPointsUseCase,
  petRepo,
  getPetsByUserIdUseCase,
  getAvailablePetsUseCase,
  getPetStoreUseCase,
  getPetDetailsUseCase,
  adoptPetUseCase,
  updatePetNicknameUseCase,
  unlockBadgeUseCase,
  getFeaturedPetUseCase,
  releasePetUseCase,

  challengePointsRepo,
  getChallengePointsByUserIdUseCase,
  awardChallengePointsUseCase,
  getChallengeHistoryUseCase,
  getChallengeRankingsUseCase,
  getEnvironmentalImpactRankingsUseCase,
  badgeRepo,
  createBadgeUseCase,
  getAllBadgesUseCase,
  getBadgeByIdUseCase,
  updateBadgeUseCase,
  deleteBadgeUseCase,
  evolvePetUseCase,
  selectPetStageUseCase,
  petEvolutionCostRepo,
  createPetEvolutionCostUseCase,
  listPetEvolutionCostsUseCase,
  updatePetEvolutionCostUseCase,
  deletePetEvolutionCostUseCase,
  getBadgesByUserIdUseCase,
  getAvailableBadgesUseCase,
  getBadgeTiersProgressUseCase,
  getBadgeTiersConfigUseCase,
  dashboardRepo,
  getDashboardByUserIdUseCase,
  rankingsRepo,
  getCombinedRankingsUseCase,
  getUserStatsUseCase,
};
