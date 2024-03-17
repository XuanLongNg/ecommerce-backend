import { Request, Response, NextFunction } from 'express';
import { database } from '@/app';
import { UnauthorizedException } from '@/common/exceptions/unauthorized.exception';
import { jwtService } from '@/common/services/jwt.service';
import { appConfig } from '@/common/configs/app.config';
import { JwtPayload } from 'jsonwebtoken';

const AuthInterceptor = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const bearerKey = req.headers['authorization'];

    if (!bearerKey) {
        throw new UnauthorizedException('This service need authentication!');
    }

    const key = bearerKey.split(' ')[1];

    try {
        const payload: JwtPayload = jwtService.verify(
            key,
            appConfig.jwtPublicKey
        ) as JwtPayload;
        req.headers['x-user-id'] = payload['data']['id'];
        next();
    } catch (error) {
        return res.status(403).send({
            message: 'Invalid token!',
            error,
        });
    }
};

export { AuthInterceptor };
