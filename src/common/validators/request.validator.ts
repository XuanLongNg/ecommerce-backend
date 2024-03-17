import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass, plainToInstance } from 'class-transformer';

export function RequestBodyValidator(dto: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = plainToClass(dto, req.body);
            const errors = await validate(req.body);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}

export function RequestParamsValidator(dto: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.params = plainToClass(dto, req.params);
            const errors = await validate(req.params);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}

export function RequestQueryValidator(dto: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.query = plainToClass(dto, req.query);
            const errors = await validate(req.query);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}
