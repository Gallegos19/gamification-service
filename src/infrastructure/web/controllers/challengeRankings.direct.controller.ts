import { Request, Response } from 'express';
import prisma from '../../db/prismaClient';
import { v4 as uuidv4 } from 'uuid';

export async function createChallengeRankingDirectly(req: Request, res: Response) {
    try {
        console.log('Creando ranking de desafío directamente:', req.body);
        
        // Validar campos obligatorios
        if (!req.body.user_id) {
            return res.status(400).json({ message: 'user_id es obligatorio' });
        }
        
        // Crear el registro con valores predeterminados para campos opcionales
        const ranking = await prisma.challenge_points_rankings.create({
            data: {
                id: uuidv4(),
                user_id: req.body.user_id,
                global_challenge_rank: req.body.global_challenge_rank || null,
                weekly_challenge_rank: req.body.weekly_challenge_rank || null,
                monthly_challenge_rank: req.body.monthly_challenge_rank || null,
                age_group_challenge_rank: req.body.age_group_challenge_rank || null,
                environmental_impact_rank: req.body.environmental_impact_rank || null,
                total_challenge_score: req.body.total_challenge_score || 0,
                weekly_challenge_score: req.body.weekly_challenge_score || 0,
                monthly_challenge_score: req.body.monthly_challenge_score || 0,
                environmental_impact_score: req.body.environmental_impact_score || 0,
                challenge_completion_rate: req.body.challenge_completion_rate || 0,
                total_challenges_completed: req.body.total_challenges_completed || 0,
                avg_validation_score: req.body.avg_validation_score || 0,
                last_rank_update: new Date(),
                created_at: new Date(),
                updated_at: new Date()
            }
        });
        
        console.log('Ranking de desafío creado exitosamente:', ranking);
        res.status(201).json(ranking);
    } catch (error: any) {
        console.error('Error al crear ranking de desafío:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            details: process.env.NODE_ENV === 'development' ? String(error) : undefined
        });
    }
}

export async function createQuizRankingDirectly(req: Request, res: Response) {
    try {
        console.log('Creando ranking de quiz directamente:', req.body);
        
        // Validar campos obligatorios
        if (!req.body.user_id) {
            return res.status(400).json({ message: 'user_id es obligatorio' });
        }
        
        // Crear el registro con valores predeterminados para campos opcionales
        const ranking = await prisma.quiz_points_rankings.create({
            data: {
                id: uuidv4(),
                user_id: req.body.user_id,
                global_quiz_rank: req.body.global_quiz_rank || null,
                weekly_quiz_rank: req.body.weekly_quiz_rank || null,
                monthly_quiz_rank: req.body.monthly_quiz_rank || null,
                age_group_quiz_rank: req.body.age_group_quiz_rank || null,
                total_quiz_score: req.body.total_quiz_score || 0,
                weekly_quiz_score: req.body.weekly_quiz_score || 0,
                monthly_quiz_score: req.body.monthly_quiz_score || 0,
                quiz_accuracy_percentage: req.body.quiz_accuracy_percentage || 0,
                total_quizzes_completed: req.body.total_quizzes_completed || 0,
                last_rank_update: new Date(),
                created_at: new Date(),
                updated_at: new Date()
            }
        });
        
        console.log('Ranking de quiz creado exitosamente:', ranking);
        res.status(201).json(ranking);
    } catch (error: any) {
        console.error('Error al crear ranking de quiz:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            details: process.env.NODE_ENV === 'development' ? String(error) : undefined
        });
    }
}