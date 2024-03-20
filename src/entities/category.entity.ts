import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { ProductCategoryEntity } from '@/entities/product-category.entity';

@Entity({
    name: 'category',
    schema: 'category',
})
class CategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @OneToMany(
        () => ProductCategoryEntity,
        (productCategory) => productCategory.category
    )
    productCategories: ProductCategoryEntity[];
}

export { CategoryEntity };
