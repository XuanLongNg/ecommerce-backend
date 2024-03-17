import express from 'express';
import {
    RequestBodyValidator,
    RequestParamsValidator,
} from '@/common/validators/request.validator';
import { productController } from '@modules/product/controllers/product.controller';
import {
    CreateProductDto,
    RetrieveProductDto,
    UpdateProductDto,
} from '@modules/product/dto/product.dto';

const productRouter = express.Router();

productRouter.post(
    '',
    RequestBodyValidator(CreateProductDto),
    productController.create
);

productRouter.patch(
    '/:id',
    RequestParamsValidator(RetrieveProductDto),
    RequestBodyValidator(UpdateProductDto),
    productController.update
);

productRouter.delete(
    '/:id',
    RequestParamsValidator(RetrieveProductDto),
    productController.delete
);

export { productRouter };
