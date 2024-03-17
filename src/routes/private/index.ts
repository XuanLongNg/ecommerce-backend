import express from 'express';
import { productRouter } from '@/routes/private/product.route';
import { categoryRouter } from '@/routes/private/category.route';

const privateRouter = express.Router();

privateRouter.use('/product', productRouter);
privateRouter.use('/category', categoryRouter);

export { privateRouter };
