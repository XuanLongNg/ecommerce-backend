import express from 'express';
import {
    RequestParamsValidator,
    RequestQueryValidator,
} from '@/common/validators/request.validator';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { categoryController } from '@modules/category/controllers/category.controller';
import { RetrieveCategoryDto } from '@modules/category/dto/category.dto';

const categoryRouter = express.Router();

categoryRouter.get(
    '',
    RequestQueryValidator(PaginationDto),
    categoryController.getAll
);

categoryRouter.get(
    '/:id',
    RequestParamsValidator(RetrieveCategoryDto),
    categoryController.retrieve
);

export { categoryRouter };
