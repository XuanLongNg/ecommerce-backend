import express from 'express';
import { productRouter } from '@/routes/public/product.route';
import { categoryRouter } from '@/routes/public/category.route';

const publicRouter = express.Router();

publicRouter.use('/product', productRouter);
publicRouter.use('/category', categoryRouter);

export { publicRouter };
