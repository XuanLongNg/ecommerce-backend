import { Request, Response } from 'express';
import { BaseException } from '@/common/exceptions/base.exception';
import { categoryService } from '@modules/category/services/category.service';

class CategoryController {
    async getAll(req: Request, res: Response) {
        try {
            const query = req.query;
            const data = await categoryService.getAll(query);
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
            const data = await categoryService.retrieve(id);
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
            const createCategory = req.body;
            const userId: string = req.headers['x-user-id'] as string;
            const data = await categoryService.create(userId, createCategory);
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
            const updateCategory = req.body;
            const userId: string = req.headers['x-user-id'] as string;
            const { id: categoryId } = req.params;
            const data = await categoryService.update(
                categoryId,
                userId,
                updateCategory
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
            const data = await categoryService.delete(productId, userId);
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

const categoryController = new CategoryController();

export { categoryController, CategoryController };
