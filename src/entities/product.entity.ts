import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { ProductCategoryEntity } from '@/entities/product-category.entity';
import { ProductVariantEntity } from '@/entities/product-variant.entity';

@Entity({
    name: 'product',
    schema: 'product',
})
class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        type: Number,
        nullable: false,
    })
    price: number;

    @Column({
        type: String,
        nullable: true,
    })
    description?: string;

    @OneToMany(
        () => ProductCategoryEntity,
        (productCategory) => productCategory.product
    )
    productCategories: ProductCategoryEntity[];

    @OneToMany(
        () => ProductVariantEntity,
        (productVariant) => productVariant.product
    )
    productVariants: ProductVariantEntity[];
}

export { ProductEntity };
