import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

class PaginationDto {
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber({}, { message: 'Page must be a number' })
    @IsOptional()
    @Min(1)
    page?: number = 1;

    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber({}, { message: 'Page size must be a number' })
    @IsOptional()
    @Min(1)
    @Max(100)
    pageSize?: number = 20;
}

export { PaginationDto };
