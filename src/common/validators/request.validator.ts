import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';

export function RequestValidator(dto: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dtoInstance = Object.assign(new dto(), req.body);
            const errors = await validate(dtoInstance);
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
