import express from 'express';
import {
    RequestBodyValidator,
    RequestParamsValidator,
} from '@/common/validators/request.validator';
import { categoryController } from '@modules/category/controllers/category.controller';
import {
    CreateCategoryDto,
    RetrieveCategoryDto,
    UpdateCategoryDto,
} from '@modules/category/dto/category.dto';

const categoryRouter = express.Router();

categoryRouter.post(
    '',
    RequestBodyValidator(CreateCategoryDto),
    categoryController.create
);

categoryRouter.patch(
    '/:id',
    RequestParamsValidator(RetrieveCategoryDto),
    RequestBodyValidator(UpdateCategoryDto),
    categoryController.update
);

categoryRouter.delete(
    '/:id',
    RequestParamsValidator(RetrieveCategoryDto),
    categoryController.delete
);

export { categoryRouter };
