import { IsNumber, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

class GetProductCategoryByProductIdDto {
    @IsString()
    @IsUUID()
    id: string;
}

class CreateProductCategoryDto {
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber({}, { message: 'id must be a number' })
    categoryId: number;

    @IsString()
    @IsUUID()
    productId: string;
}

class DeleteProductCategoryDto extends CreateProductCategoryDto {}

export {
    GetProductCategoryByProductIdDto,
    CreateProductCategoryDto,
    DeleteProductCategoryDto,
};
