import { authService, AuthService } from '@modules/auth/services/auth.service';
import { Request, Response } from 'express';
import { BaseException } from '@/common/exceptions/base.exception';

class AuthController {
    public async signUp(req: Request, res: Response) {
        console.log(req.body);
        try {
            const signUpDto = req.body;
            const { data } = await authService.signUp(signUpDto);
            return res.status(201).json({
                data,
            });
        } catch (error) {
            if (error instanceof BaseException) {
                console.log(error);
                return res.status(error.code).json(error);
            } else {
                console.log(error);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
        }
    }
}

const authController = new AuthController();

export { authController, AuthController };
