import express from 'express';
import {
    RequestParamsValidator,
    RequestQueryValidator,
} from '@/common/validators/request.validator';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { productCategoryController } from '@modules/product/controllers/product-category.controller';
import { GetProductCategoryByProductIdDto } from '@modules/product/dto/product-category.dto';

const productCategoryRouter = express.Router();

productCategoryRouter.get(
    '',
    RequestQueryValidator(PaginationDto),
    productCategoryController.getAll
);

productCategoryRouter.get(
    '/:id',
    RequestParamsValidator(GetProductCategoryByProductIdDto),
    productCategoryController.getByProductId
);

export { productCategoryRouter };
