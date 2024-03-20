import { Request, Response } from 'express';
import { BaseException } from '@/common/exceptions/base.exception';
import { productCategoryService } from '@modules/product/services/product-category.service';

class ProductCategoryController {
    async getAll(req: Request, res: Response) {
        try {
            const query = req.query;
            const data = await productCategoryService.getAll(query);
            return res.status(200).send(data);
        } catch (error) {
            if (error instanceof BaseException) {
                console.log(error);
                return res.status(error.code).json(error);
            } else {
                console.log(error);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
        }
    }

    async getByProductId(req: Request, res: Response) {
        try {
            const productId = req.params['productId'] as string;
            const data = await productCategoryService.getByProductId(productId);
            return res.status(200).send(data);
        } catch (error) {
            if (error instanceof BaseException) {
                console.log(error);
                return res.status(error.code).json(error);
            } else {
                console.log(error);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
        }
    }

    async create(req: Request, res: Response) {
        try {
            const createProductCategory = req.body;
            const userId: string = req.headers['x-user-id'] as string;
            const data = await productCategoryService.create(
                userId,
                createProductCategory
            );
            return res.status(200).send(data);
        } catch (error) {
            if (error instanceof BaseException) {
                console.log(error);
                return res.status(error.code).json(error);
            } else {
                console.log(error);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const userId: string = req.headers['x-user-id'] as string;
            const productId = req.query['productId'] as string;
            const categoryId = req.query['categoryId'] as string;
            const data = await productCategoryService.delete(
                productId,
                parseInt(categoryId),
                userId
            );
            return res.status(200).send(data);
        } catch (error) {
            if (error instanceof BaseException) {
                console.log(error);
                return res.status(error.code).json(error);
            } else {
                console.log(error);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
        }
    }
}

const productCategoryController = new ProductCategoryController();

export { productCategoryController, ProductCategoryController };
