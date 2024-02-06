import express, { Request, Response } from 'express';
import { authController } from '@modules/auth/controllers/auth.controller';
import { RequestValidator } from '@/common/validators/request.validator';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';

const authRoute = express.Router();

authRoute.post('/sign-up', RequestValidator(SignUpDto), authController.signUp);
authRoute.get('/sign-up', (req: Request, res: Response) => {
    return res.json({
        message: 'Hello',
    });
});

export { authRoute };
