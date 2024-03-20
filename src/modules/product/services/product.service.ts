import { database } from '@/app';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { ProductEntity } from '@/entities/product.entity';
import { IsNull } from 'typeorm';
import { PaginationDto } from '@/common/dto/pagination.dto';
import {
    CreateProductDto,
    UpdateProductDto,
} from '@modules/product/dto/product.dto';
import { NotFoundException } from '@/common/exceptions/not-found.exception';

class ProductService {
    constructor() {}

    async count(options?: FindManyOptions<ProductEntity>) {
        options = {
            ...options,
            where: {
                ...options?.where,
                deletedBy: IsNull(),
            },
        };
        return database.productRepository.count(options);
    }

    async getAll(query: PaginationDto) {
        const page = query.page ?? 1,
            pageSize = query.pageSize ?? 20;
        const skip = (page - 1) * pageSize;
        const total = await this.count();
        const data = await database.productRepository.find({
            skip,
            take: pageSize,
            where: {
                deletedBy: IsNull(),
            },
            select: ['id', 'description', 'price', 'name'],
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
        const data = await database.productRepository.findOne({
            where: {
                id,
                deletedBy: IsNull(),
            },
            select: ['id', 'description', 'price', 'name'],
        });

        if (!data) {
            throw new NotFoundException(
                `Product with id: ${id} does not exist!`
            );
        }

        return {
            data,
        };
    }

    async create(userId: string, request: CreateProductDto) {
        const data = await database.productRepository.save({
            name: request.name,
            description: request.description,
            price: request.price,
            createdBy: userId,
        });
        const { id, price, name, description } = data;
        return {
            data: {
                id,
                price,
                name,
                description,
            },
        };
    }

    async update(productId: string, userId: string, request: UpdateProductDto) {
        const { data: product } = await this.retrieve(productId);

        await database.productRepository.update(
            {
                id: productId,
            },
            {
                name: request?.name ?? product.name,
                description: request?.description ?? product.description,
                price: request?.price ?? product.price,
                updatedBy: userId,
                updatedAt: new Date().getTime().toString(),
            }
        );

        const { data } = await this.retrieve(productId);

        return {
            data,
        };
    }

    async delete(productId: string, userId: string) {
        const timeUpdate = new Date().getTime().toString();
        const isExist = await database.productRepository.existsBy({
            id: productId,
            deletedBy: IsNull(),
        });

        if (!isExist) {
            throw new NotFoundException(
                `Product with id: ${productId} does not exist!`
            );
        }
        await database.productRepository.update(
            {
                id: productId,
            },
            {
                updatedBy: userId,
                updatedAt: timeUpdate,
                deletedBy: userId,
                deletedAt: timeUpdate,
            }
        );

        const data = await database.productRepository.findOneBy({
            id: productId,
        });

        return {
            data,
        };
    }
}

const productService = new ProductService();
export { ProductService, productService };
