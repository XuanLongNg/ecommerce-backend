import { database } from '@/app';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { IsNull } from 'typeorm';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { NotFoundException } from '@/common/exceptions/not-found.exception';
import { ProductCategoryEntity } from '@/entities/product-category.entity';
import { CreateProductCategoryDto } from '@modules/product/dto/product-category.dto';

class ProductCategoryService {
    constructor() {}

    async count(options?: FindManyOptions<ProductCategoryEntity>) {
        options = {
            ...options,
            where: {
                ...options?.where,
                deletedBy: IsNull(),
            },
        };
        return database.productCategoryRepository.count(options);
    }

    async getAll(query: PaginationDto) {
        const page = query.page ?? 1,
            pageSize = query.pageSize ?? 20;
        const skip = (page - 1) * pageSize;
        const total = await this.count();
        const data = await database.productCategoryRepository.find({
            skip,
            take: pageSize,
            where: {
                deletedBy: IsNull(),
            },
            select: ['productId', 'categoryId'],
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

    async getByProductId(id: string) {
        const data = await database.productCategoryRepository.find({
            where: {
                productId: id,
                deletedBy: IsNull(),
            },
            select: ['productId', 'categoryId'],
        });

        if (!data) {
            throw new NotFoundException(
                `Product category with product id: ${id} does not exist!`
            );
        }

        return {
            data,
        };
    }

    async create(userId: string, request: CreateProductCategoryDto) {
        const product = await database.productRepository.findOneBy({
            id: request.productId,
        });

        if (!product) {
            throw new NotFoundException(
                `Product with id: ${request.productId} does not exist!`
            );
        }

        const category = await database.categoryRepository.findOneBy({
            id: request.categoryId,
        });

        if (!category) {
            throw new NotFoundException(
                `Category with id: ${request.categoryId} does not exist!`
            );
        }

        const data = (await database.productCategoryRepository.save({
            product: product,
            category: category,
            createdBy: userId,
            updatedBy: userId,
            deletedBy: null,
            deletedAt: null,
        })) as ProductCategoryEntity;
        return {
            data: {
                product: data.product,
                category: data.category,
            },
        };
    }

    async delete(productId: string, categoryId: number, userId: string) {
        const timeUpdate = new Date().getTime().toString();
        const isExist = await database.productCategoryRepository.existsBy({
            productId,
            categoryId,
            deletedBy: IsNull(),
        });

        if (!isExist) {
            throw new NotFoundException(
                `Product category with product id: ${productId} and category id: ${categoryId} does not exist!`
            );
        }

        await database.productCategoryRepository.update(
            {
                productId,
                categoryId,
            },
            {
                updatedBy: userId,
                updatedAt: timeUpdate,
                deletedBy: userId,
                deletedAt: timeUpdate,
            }
        );

        const data = await database.productCategoryRepository.findOneBy({
            productId,
            categoryId,
        });

        return {
            data,
        };
    }
}

const productCategoryService = new ProductCategoryService();
export { ProductCategoryService, productCategoryService };
