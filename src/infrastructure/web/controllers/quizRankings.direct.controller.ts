import { Request, Response } from 'express';
import prisma from '../../db/prismaClient';

export async function getQuizRankingsDirectly(req: Request, res: Response) {
    try {
        console.log('Obteniendo rankings de quiz directamente desde la base de datos');
        
        // Verificar si hay datos en la tabla
        const count = await prisma.quiz_points_rankings.count();
        console.log(`Número de registros en quiz_points_rankings: ${count}`);
        
        // Si no hay datos, crear algunos datos de prueba
        if (count === 0) {
            console.log('Creando datos de prueba en quiz_points_rankings');
            
            // Crear algunos datos de prueba
            await prisma.quiz_points_rankings.createMany({
                data: [
                    {
                        id: '11111111-1111-1111-1111-111111111111',
                        user_id: '22222222-2222-2222-2222-222222222222',
                        total_quiz_score: 1000,
                        global_quiz_rank: 1,
                        weekly_quiz_rank: 1,
                        age_group_quiz_rank: 1,
                        weekly_quiz_score: 200,
                        monthly_quiz_score: 500,
                        quiz_accuracy_percentage: 90,
                        total_quizzes_completed: 20
                    },
                    {
                        id: '33333333-3333-3333-3333-333333333333',
                        user_id: '44444444-4444-4444-4444-444444444444',
                        total_quiz_score: 800,
                        global_quiz_rank: 2,
                        weekly_quiz_rank: 2,
                        age_group_quiz_rank: 2,
                        weekly_quiz_score: 150,
                        monthly_quiz_score: 400,
                        quiz_accuracy_percentage: 85,
                        total_quizzes_completed: 15
                    }
                ]
            });
            
            console.log('Datos de prueba creados exitosamente');
        }
        
        // Obtener los rankings
        const rankings = await prisma.quiz_points_rankings.findMany({
            orderBy: { global_quiz_rank: 'asc' }
        });
        
        console.log(`Se encontraron ${rankings.length} rankings`);
        
        res.json(rankings);
    } catch (error) {
        console.error('Error al obtener rankings de quiz directamente:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}