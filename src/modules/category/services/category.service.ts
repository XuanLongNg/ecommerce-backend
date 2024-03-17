import { database } from '@/app';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { IsNull } from 'typeorm';
import { PaginationDto } from '@/common/dto/pagination.dto';
import {
    CreateCategoryDto,
    UpdateCategoryDto,
} from '@modules/category/dto/category.dto';
import { NotFoundException } from '@/common/exceptions/not-found.exception';
import { CategoryEntity } from '@/entities/category.entity';

class CategoryService {
    constructor() {}

    async count(options?: FindManyOptions<CategoryEntity>) {
        options = {
            ...options,
            where: {
                ...options?.where,
                deletedBy: IsNull(),
            },
        };
        return database.categoryRepository.count(options);
    }

    async getAll(query: PaginationDto) {
        const page = query.page ?? 1,
            pageSize = query.pageSize ?? 20;
        const skip = (page - 1) * pageSize;
        const total = await this.count();
        const data = await database.categoryRepository.find({
            skip,
            take: pageSize,
            where: {
                deletedBy: IsNull(),
            },
            select: ['id', 'name'],
        });
        return {
            data,
            meta: {
                pagination: {
                    total,
                    totalPage: Math.ceil(total / pageSize),
                    currentPage: page,
                    pageSize,
                },
            },
        };
    }

    async retrieve(id: string) {
        const data = await database.categoryRepository.findOne({
            where: {
                id,
                deletedBy: IsNull(),
            },
            select: ['id', 'name'],
        });

        if (!data) {
            throw new NotFoundException(
                `Category with id: ${id} does not exist!`
            );
        }

        return {
            data,
        };
    }

    async create(userId: string, request: CreateCategoryDto) {
        const data = await database.categoryRepository.save({
            name: request.name,
            createdBy: userId,
        });
        const { id, name } = data;
        return {
            data: {
                id,
                name,
            },
        };
    }

    async update(
        categoryId: string,
        userId: string,
        request: UpdateCategoryDto
    ) {
        const { data: category } = await this.retrieve(categoryId);

        await database.categoryRepository.update(
            {
                id: categoryId,
            },
            {
                name: request?.name ?? category.name,
                updatedBy: userId,
                updatedAt: new Date().getTime().toString(),
            }
        );

        const { data } = await this.retrieve(categoryId);

        return {
            data,
        };
    }

    async delete(categoryId: string, userId: string) {
        const timeUpdate = new Date().getTime().toString();
        const isExist = database.categoryRepository.existsBy({
            id: categoryId,
            deletedBy: IsNull(),
        });

        if (!isExist) {
            throw new NotFoundException(
                `Category with id: ${categoryId} does not exist!`
            );
        }
        await database.categoryRepository.update(
            {
                id: categoryId,
            },
            {
                updatedBy: userId,
                updatedAt: timeUpdate,
                deletedBy: userId,
                deletedAt: timeUpdate,
            }
        );

        const data = await database.categoryRepository.findOneBy({
            id: categoryId,
        });

        return {
            data,
        };
    }
}

const categoryService = new CategoryService();
export { CategoryService, categoryService };
