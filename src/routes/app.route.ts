import express, { NextFunction, Request, Response } from 'express';
import { authRoute } from '@/routes/auth/auth.route';

const appRoute = express.Router();

appRoute.use('/auth', authRoute);

export { appRoute };
