import express from 'express';
import { productRouter } from '@/routes/private/product.route';

const privateRouter = express.Router();

privateRouter.use('/product', productRouter);

export { privateRouter };
