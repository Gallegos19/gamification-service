import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dtoClass, req.body);
    const errors: ValidationError[] = await validate(dtoObj);
    if (errors.length > 0) {
      return res.status(400).json({
        errors: errors.map(e => ({
          property: e.property,
          constraints: e.constraints,
        })),
      });
    }
    req.body = dtoObj;
    next();
  };
}
