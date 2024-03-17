import { Request, Response } from 'express';
import { productService } from '@modules/product/services/product.service';
import { BaseException } from '@/common/exceptions/base.exception';

class ProductController {
    async getAll(req: Request, res: Response) {
        try {
            const query = req.query;
            const data = await productService.getAll(query);
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

    async retrieve(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await productService.retrieve(id);
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
            const createProduct = req.body;
            const userId: string = req.headers['x-user-id'] as string;
            const data = await productService.create(userId, createProduct);
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

    async update(req: Request, res: Response) {
        try {
            const updateProduct = req.body;
            const userId: string = req.headers['x-user-id'] as string;
            const { id: productId } = req.params;
            const data = await productService.update(
                productId,
                userId,
                updateProduct
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
            const { id: productId } = req.params;
            const data = await productService.delete(productId, userId);
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

const productController = new ProductController();

export { productController, ProductController };
