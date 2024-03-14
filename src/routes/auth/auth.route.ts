import express from 'express';
import { authController } from '@modules/auth/controllers/auth.controller';
import { RequestValidator } from '@/common/validators/request.validator';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';
import { LoginDto } from '@modules/auth/dto/login.dto';
import { ChangePasswordDto } from '@modules/auth/dto/change-password.dto';
import { ResetPasswordDto } from '@modules/auth/dto/reset-password.dto';
import { SendMailResetDto } from '@modules/auth/dto/send-mail-reset.dto';
import { RefreshTokenDto } from '@modules/auth/dto/refresh-token.dto';

const authRoute = express.Router();

authRoute.post('/sign-up', RequestValidator(SignUpDto), authController.signUp);

authRoute.post('/login', RequestValidator(LoginDto), authController.login);

authRoute.post(
    '/change-password',
    RequestValidator(ChangePasswordDto),
    authController.changePassword
);

authRoute.post(
    '/reset-password',
    RequestValidator(ResetPasswordDto),
    authController.resetPassword
);

authRoute.post(
    '/send-mail-reset',
    RequestValidator(SendMailResetDto),
    authController.sendMailReset
);

authRoute.post(
    '/refresh-token',
    RequestValidator(RefreshTokenDto),
    authController.refreshToken
);

export { authRoute };
