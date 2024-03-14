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
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CategoryEntity, (category) => category.productCategories, {
        nullable: false,
    })
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

    @ManyToOne(() => ProductEntity, (product) => product.productCategories, {
        nullable: false,
    })
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;
}

export { ProductCategoryEntity };
