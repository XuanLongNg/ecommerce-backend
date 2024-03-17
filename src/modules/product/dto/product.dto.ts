import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

class RetrieveProductDto {
    @IsString()
    @IsUUID()
    id: string;
}

class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    @IsOptional()
    description?: string;
}

class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;
}

export { RetrieveProductDto, CreateProductDto, UpdateProductDto };
