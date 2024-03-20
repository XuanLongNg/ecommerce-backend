import express from 'express';
import { productRouter } from '@/routes/private/product.route';
import { categoryRouter } from '@/routes/private/category.route';
import { productCategoryRouter } from '@/routes/private/product-category.route';

const privateRouter = express.Router();

privateRouter.use('/product', productRouter);
privateRouter.use('/category', categoryRouter);
privateRouter.use('/product-category', productCategoryRouter);

export { privateRouter };
