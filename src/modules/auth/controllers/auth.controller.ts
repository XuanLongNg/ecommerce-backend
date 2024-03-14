import { authService } from '@modules/auth/services/auth.service';
import { Request, Response } from 'express';
import { BaseException } from '@/common/exceptions/base.exception';

class AuthController {
    async signUp(req: Request, res: Response) {
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

    async login(req: Request, res: Response) {
        try {
            const loginDto = req.body;
            const data = await authService.login(loginDto);
            return res.status(200).json(data);
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

    async changePassword(req: Request, res: Response) {
        try {
            const changePasswordDto = req.body;
            await authService.changePassword(changePasswordDto);
            return res.status(200).json({
                message: 'Password updated successful',
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

    async resetPassword(req: Request, res: Response) {
        try {
            const resetPasswordDto = req.body;
            await authService.resetPassword(resetPasswordDto);
            return res.status(200).json({
                message: 'Password updated successful',
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

    async sendMailReset(req: Request, res: Response) {
        try {
            const sendMailResetDto = req.body;
            await authService.sendMailReset(sendMailResetDto);
            return res.status(200).json({
                message: 'Send mail successful',
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

    async refreshToken(req: Request, res: Response) {
        try {
            const refreshToken = req.body;
            const data = await authService.handleRefreshToken(refreshToken);
            return res.status(200).json(data);
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
