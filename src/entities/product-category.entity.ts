import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { CategoryEntity } from '@/entities/category.entity';
import { ProductEntity } from '@/entities/product.entity';

@Entity({
    name: 'productCategory',
    schema: 'productCategory',
})
class ProductCategoryEntity extends BaseEntity {
    @PrimaryColumn({ name: 'category_id' })
    categoryId: number;

    @ManyToOne(() => CategoryEntity, (category) => category.productCategories, {
        nullable: false,
    })
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

    @PrimaryColumn({ name: 'product_id' })
    productId: string;

    @ManyToOne(() => ProductEntity, (product) => product.productCategories, {
        nullable: false,
    })
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;
}

export { ProductCategoryEntity };
