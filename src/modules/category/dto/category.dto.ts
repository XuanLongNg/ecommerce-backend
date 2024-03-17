import {
    IsNumber,
    IsNumberString,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

class RetrieveCategoryDto {
    @IsNumberString()
    id: number;
}

class CreateCategoryDto {
    @IsString()
    name: string;
}

class UpdateCategoryDto {
    @IsString()
    @IsOptional()
    name?: string;
}

export { RetrieveCategoryDto, CreateCategoryDto, UpdateCategoryDto };
