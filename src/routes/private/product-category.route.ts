import express from 'express';
import {
    RequestBodyValidator,
    RequestQueryValidator,
} from '@/common/validators/request.validator';
import {
    CreateProductCategoryDto,
    DeleteProductCategoryDto,
} from '@modules/product/dto/product-category.dto';
import { productCategoryController } from '@modules/product/controllers/product-category.controller';

const productCategoryRouter = express.Router();

productCategoryRouter.post(
    '',
    RequestBodyValidator(CreateProductCategoryDto),
    productCategoryController.create
);

productCategoryRouter.delete(
    '/delete',
    RequestQueryValidator(DeleteProductCategoryDto),
    productCategoryController.delete
);

export { productCategoryRouter };
