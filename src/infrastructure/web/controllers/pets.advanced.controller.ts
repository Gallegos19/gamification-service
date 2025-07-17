import { Request, Response } from 'express';
import { container } from '../../config/container';
import { UpdatePetNicknameDto } from '../dto/UpdatePetNickname.dto';
import { ReleasePetDto } from '../dto/ReleasePet.dto';
import { GetFeaturedPetDto } from '../dto/GetFeaturedPet.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export async function updatePetNickname(req: Request, res: Response) {
    try {
        const dto = plainToInstance(UpdatePetNicknameDto, {
            userId: req.params.userId,
            petId: req.params.petId,
            nickname: req.body.nickname,
        });
        await validateOrReject(dto);
        await container.updatePetNicknameUseCase.execute(dto);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Caught an unknown error:', error);
        };
    }
}

export async function releasePet(req: Request, res: Response) {
    try {
        const dto = plainToInstance(ReleasePetDto, {
            userId: req.params.userId,
            petId: req.params.petId,
        });
        await validateOrReject(dto);
        await container.releasePetUseCase.execute(dto);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Caught an unknown error:', error);
        }
    }
}

export async function getFeaturedPet(req: Request, res: Response) {
    try {
        const dto = plainToInstance(GetFeaturedPetDto, {
            userId: req.params.userId,
        });
        await validateOrReject(dto);
        const pet = await container.getFeaturedPetUseCase.execute(dto);
        if (!pet) {
            return res.status(404).json({ message: 'No featured pet found for user' });
        }
        res.json(pet);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Caught an unknown error:', error);
        }
    }
}
