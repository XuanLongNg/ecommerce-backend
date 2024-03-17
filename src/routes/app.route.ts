import express, { NextFunction, Request, Response } from 'express';
import { authRoute } from '@/routes/auth/auth.route';
import { publicRouter } from '@/routes/public';
import { privateRouter } from '@/routes/private';
import { AuthInterceptor } from '@/common/interceptors/auth.interceptor';

const appRoute = express.Router();

appRoute.use('/auth', authRoute);
appRoute.use('', publicRouter);
appRoute.use('', AuthInterceptor, privateRouter);
export { appRoute };
