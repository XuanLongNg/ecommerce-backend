import express from 'express';
import { productRouter } from '@/routes/public/product.route';
import { categoryRouter } from '@/routes/public/category.route';
import { productCategoryRouter } from '@/routes/public/product-category.route';

const publicRouter = express.Router();

publicRouter.use('/product', productRouter);
publicRouter.use('/category', categoryRouter);
publicRouter.use('/product-category', productCategoryRouter);

export { publicRouter };
