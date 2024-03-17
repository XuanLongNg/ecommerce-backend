import express from 'express';
import { productRouter } from '@/routes/public/product.route';

const publicRouter = express.Router();

publicRouter.use('/product', productRouter);

export { publicRouter };
