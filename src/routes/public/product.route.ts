import express from 'express';
import {
    RequestParamsValidator,
    RequestQueryValidator,
} from '@/common/validators/request.validator';
import { productController } from '@modules/product/controllers/product.controller';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { RetrieveProductDto } from '@modules/product/dto/product.dto';

const productRouter = express.Router();

productRouter.get(
    '',
    RequestQueryValidator(PaginationDto),
    productController.getAll
);

productRouter.get(
    '/:id',
    RequestParamsValidator(RetrieveProductDto),
    productController.retrieve
);

export { productRouter };
