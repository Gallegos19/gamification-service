import { Router } from 'express';
import { getPetsByUserId, getAvailablePets, getPetStore, getPetDetails } from '../controllers/pets.controller';
import { adoptPet, purchasePet } from '../controllers/pets.adopt.controller';
import { evolvePet } from '../controllers/pets.evolve.controller';
import { featurePetController } from '../controllers/pets.feature.controller';
import { updatePetNickname, releasePet, getFeaturedPet } from '../controllers/pets.advanced.controller';
import { createPet, getPetById, updatePet, deletePet } from '../controllers/pets.crud.controller';
import { selectPetStage } from '../controllers/pets.selectedStage.controller';
import { createPetEvolutionCost, deletePetEvolutionCost, listPetEvolutionCosts, updatePetEvolutionCost } from '../controllers/petEvolutionCost.controller';

const router = Router();

// GET /api/gamification/pets/available - Mascotas disponibles para adoptar
router.get('/available', getAvailablePets);

// GET /api/gamification/pets/store - Tienda de mascotas con precios
router.get('/store', getPetStore);

// GET /api/gamification/pets/:petId/details - Detalles específicos de una mascota
router.get('/:petId/details', getPetDetails);

// GET /api/gamification/pets/:userId - Mascotas del usuario (owned)
router.get('/owned/:userId', getPetsByUserId);

// GET /api/gamification/pets/:userId - Alias para compatibilidad
router.get('/:userId', getPetsByUserId);

// POST /api/gamification/pets/:userId/adopt
router.post('/:userId/adopt', adoptPet);

// POST /api/gamification/pets/purchase - Comprar mascota (endpoint alternativo)
router.post('/purchase', purchasePet);

// POST /api/gamification/pets/:userId/feature
router.post('/:userId/feature', featurePetController);

// POST /api/gamification/pets/owned/:userId/:petId/evolve
router.post('/owned/:userId/:petId/evolve', evolvePet);

// PATCH /api/gamification/pets/owned/:userId/:petId/selected-stage
router.patch('/owned/:userId/:petId/selected-stage', selectPetStage);

// PATCH /api/gamification/pets/owned/:userId/:petId
router.patch('/owned/:userId/:petId', updatePetNickname);

// DELETE /api/gamification/pets/owned/:userId/:petId
router.delete('/owned/:userId/:petId', releasePet);

// GET /api/gamification/pets/featured/:userId
router.get('/featured/:userId', getFeaturedPet);

// CRUD especie base de mascota
router.post('/', createPet);
router.get('/id/:petId', getPetById);
router.put('/id/:petId', updatePet);
router.delete('/id/:petId', deletePet);

// POST /api/gamification/pet-evolution-costs
router.post('/pet-evolution-costs', createPetEvolutionCost);
// GET /api/gamification/pet-evolution-costs/:petId
router.get('/pet-evolution-costs/:petId', listPetEvolutionCosts);
// PUT /api/gamification/pet-evolution-costs/:petId/:stage
router.put('/pet-evolution-costs/:petId/:stage', updatePetEvolutionCost);
// DELETE /api/gamification/pet-evolution-costs/:petId/:stage
router.delete('/pet-evolution-costs/:petId/:stage', deletePetEvolutionCost);

export default router;
